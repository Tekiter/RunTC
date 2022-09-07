export interface TestcaseRunner {
  run(key: string, options: RunOption): Promise<RunResult>;
  dispose(key: string): void;
}

export interface RunOption {
  filepath: string;
  stdin: string;
  timeout: number;
}

export type RunResult = RunResultExited | RunResultTimeout | RunResultError;
export type RunResultExited = {
  status: "exited";
  exitCode: number;
  stdout: string;
  stderr: string;
};
export type RunResultTimeout = {
  status: "timeout";
  stdout: string;
  stderr: string;
};
export type RunResultError = {
  status: "error";
  stdout: string;
  stderr: string;
};
