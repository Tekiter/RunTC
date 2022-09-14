export interface Queue<T> {
  enqueue(data: T): void;
  dequeue(): T | null;
  front(): T | null;
  length: number;
}
