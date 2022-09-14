import { Queue } from "./types";

export default class TwoStackQueue<T> implements Queue<T> {
  private instk: T[];
  private outstk: T[];

  constructor() {
    this.instk = [];
    this.outstk = [];
  }

  get length() {
    return this.instk.length + this.outstk.length;
  }

  enqueue(data: T): void {
    this.instk.push(data);
  }

  dequeue(): T | null {
    this.arrange();
    return this.outstk.pop() ?? null;
  }

  front(): T | null {
    this.arrange();

    return this.outstk.length - 1 >= 0
      ? this.outstk[this.outstk.length - 1]
      : null;
  }

  private arrange() {
    if (this.outstk.length === 0) {
      let d: T | undefined;
      while ((d = this.instk.pop()) !== undefined) {
        this.outstk.push(d);
      }
    }
  }

  toString() {
    let res = this.outstk.map(toJson);
    res.reverse();
    res = [...res, ...this.instk.map(toJson)];
    return `[${res.join(",")}]`;
  }
}

function toJson(item: unknown) {
  return JSON.stringify(item);
}
