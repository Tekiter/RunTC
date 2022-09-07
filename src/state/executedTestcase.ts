import { atomFamily } from "recoil";

export type ExecutedTestcaseResult =
  | ExecutedTestcaseResultIdle
  | ExecutedTestcaseResultRunning
  | ExecutedTestcaseResultExited;

type ExecutedTestcaseResultIdle = { status: "idle" };
type ExecutedTestcaseResultRunning = { status: "running" };
type ExecutedTestcaseResultExited = {
  status: "exited";
  stdout: string;
  stderr: string;
};

export const executedTestcaseFamily = atomFamily<
  ExecutedTestcaseResult,
  string
>({
  key: "testcaseExecutedFamily",
  default: () => ({
    status: "idle",
  }),
});
