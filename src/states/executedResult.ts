import { atomFamily } from "recoil";

export type ExecutedResult =
  | ExecutedResultIdle
  | ExecutedResultRunning
  | ExecutedResultExited
  | ExecutedResultTimeout
  | ExecuteResultError;

type ExecutedResultIdle = { status: "idle" };
type ExecutedResultRunning = { status: "running" };
type ExecutedResultExited = {
  status: "exited";
  stdout: string;
  stderr: string;
  exitCode: number;
};
type ExecutedResultTimeout = {
  status: "timeout";
};
type ExecuteResultError = {
  status: "error";
  message: string;
};

export const executedResultFamily = atomFamily<ExecutedResult, string>({
  key: "testcaseExecutedFamily",
  default: () => ({
    status: "idle",
  }),
});
