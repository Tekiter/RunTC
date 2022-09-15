import { selectorFamily } from "recoil";

import { executeStatusFamily } from "./executeStatus";

export type TestcaseResult =
  | "idle"
  | "waiting"
  | "running"
  | "AC"
  | "WA"
  | "TLE"
  | "RE"
  | "IE";

export const testcaseResultFamily = selectorFamily<TestcaseResult, string>({
  key: "testcaseResultFamily",
  get:
    (id) =>
    ({ get }) => {
      const executed = get(executeStatusFamily(id));

      if (executed.status === "idle") {
        return "idle";
      }

      if (executed.status === "running") {
        return "running";
      }

      if (executed.status === "waiting") {
        return "waiting";
      }

      if (executed.status === "timeout") {
        return "TLE";
      }

      if (executed.status === "error") {
        return "IE";
      }

      if (executed.status === "exited") {
        if (executed.exitCode !== 0) {
          return "RE";
        }

        return "AC";
      }

      throw new Error("Invalid Status");
    },
});
