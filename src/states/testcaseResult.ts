import { selectorFamily } from "recoil";

import { executeStatusFamily } from "./executeStatus";
import { testcaseFamily } from "./testcase";

export type TestcaseResult =
  | "idle"
  | "waiting"
  | "running"
  | "FIN"
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
      const testcase = get(testcaseFamily(id));

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

        if (testcase.answer.type === "plainText") {
          if (compareResult(executed.stdout, testcase.answer.text)) {
            return "AC";
          }
          return "WA";
        }

        return "FIN";
      }

      throw new Error("Invalid Status");
    },
});

function compareResult(a: string, b: string) {
  return a.trim() === b.trim();
}
