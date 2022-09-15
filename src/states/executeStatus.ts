import { atomFamily, selector } from "recoil";

import { testcaseIdsAtom } from "./testcase";

export type ExecuteStatus =
  | StatusIdle
  | StatusWaiting
  | StatusRunning
  | StatusExited
  | StatusTimeout
  | StatusError;

type StatusIdle = { status: "idle" };
type StatusWaiting = { status: "waiting" };
type StatusRunning = { status: "running" };
type StatusExited = {
  status: "exited";
  stdout: string;
  stderr: string;
  exitCode: number;
};
type StatusTimeout = {
  status: "timeout";
};
type StatusError = {
  status: "error";
  message: string;
};

export const executeStatusFamily = atomFamily<ExecuteStatus, string>({
  key: "executeStatusFamily",
  default: () => ({
    status: "idle",
  }),
});

export const isRunningSelector = selector({
  key: "isRunningSelector",
  get: ({ get }) => {
    const ids = get(testcaseIdsAtom);

    return ids.some((id) => {
      const { status } = get(executeStatusFamily(id));
      return status === "running" || status === "waiting";
    });
  },
});
