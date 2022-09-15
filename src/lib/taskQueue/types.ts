export interface TaskQueue<T> {
  setHandler(fn: ProcessFunction<T>): void;
  removeHandler(): void;
  error(fn: ErrorHandler): void;
  add(task: T): void;
  pause(): void;
  clear(): void;
}

export interface ProcessFunction<T> {
  (arg: JobArg<T>): Promise<void>;
}

export interface ErrorHandler {
  (err: unknown): Promise<ErrorResolve>;
}

export interface JobArg<T> {
  data: T;
}

export type ErrorResolve = { action: "skip" | "stop" };
