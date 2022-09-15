import { Queue, TwoStackQueue } from "../queue";
import { ErrorHandler, ProcessFunction, TaskQueue } from "./types";

type TimeoutToken = ReturnType<typeof setTimeout>;

export class TimeoutTaskQueue<T> implements TaskQueue<T> {
  private queue: Queue<T>;
  private processFn: ProcessFunction<T> | null;
  private errorHandlerFn: ErrorHandler | null;
  private isRunning: boolean;
  private stopLoopToken: TimeoutToken | null;

  constructor() {
    this.queue = new TwoStackQueue();
    this.processFn = null;
    this.errorHandlerFn = null;
    this.isRunning = false;
    this.stopLoopToken = null;
  }

  setHandler(fn: ProcessFunction<T>): void {
    this.processFn = fn;

    this.startProcessor();
  }

  removeHandler(): void {
    this.processFn = null;
  }

  add(task: T): void {
    this.queue.enqueue(task);

    this.startProcessor();
  }

  pause(): void {
    if (this.stopLoopToken !== null) {
      clearTimeout(this.stopLoopToken);
    }
  }

  error(fn: ErrorHandler): void {
    this.errorHandlerFn = fn;
  }

  clear(): void {
    this.pause();
    this.queue.clear();
  }

  private async startProcessor() {
    if (this.isRunning || !this.processFn) {
      return;
    }

    const task = this.queue.dequeue();
    if (task === null) {
      return;
    }

    this.isRunning = true;

    try {
      await this.processFn({
        data: task,
      });
      this.isRunning = false;

      setTimeout(() => this.startProcessor(), 0);
    } catch (err) {
      if (this.errorHandlerFn) {
        const resolve = await this.errorHandlerFn(err);

        if (resolve.action === "skip") {
          setTimeout(() => this.startProcessor, 0);
        }
      } else {
        throw err;
      }
    }
  }
}
