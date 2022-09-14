import { atom, atomFamily, selector } from "recoil";

import { testcaseIdsAtom } from "./testcase";

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

export const isRunningSelector = selector({
  key: "isRunningSelector",
  get: ({ get }) => {
    const ids = get(testcaseIdsAtom);

    return ids.some((id) => get(executedResultFamily(id)).status === "running");
  },
});

export const shouldCancel = atom({
  key: "shouldCancel",
  default: false,
});
