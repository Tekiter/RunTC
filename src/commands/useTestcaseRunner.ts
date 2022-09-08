import to from "await-to-js";
import { useContext } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { RunnerContext } from "@/lib/testcaseRunner/runnerContext";
import { executedResultFamily } from "@/state/executedResult";
import { executeTargetAtom } from "@/state/executeTarget";
import { testcaseFamily, testcaseIdsAtom } from "@/state/testcase";

const useTestcaseRunner = () => {
  const runner = useContext(RunnerContext);
  const executablePath = useRecoilValue(executeTargetAtom);

  const run = useRecoilCallback(({ snapshot, set }) => async (id: string) => {
    if (!executablePath) {
      return;
    }

    set(executedResultFamily(id), () => ({
      status: "running" as const,
    }));

    const testcase = await snapshot.getPromise(testcaseFamily(id));

    if (testcase.input.type === "plainText") {
      const [err, ret] = await to(
        runner.run(id, {
          filepath: executablePath,
          stdin: testcase.input.text,
          timeout: 2000,
        })
      );

      if (err) {
        set(executedResultFamily(id), {
          status: "error",
          message: err.message,
        });

        return;
      }

      if (ret.status === "exited") {
        set(executedResultFamily(id), {
          status: "exited",
          stdout: ret.stdout,
          stderr: ret.stderr,
          exitCode: ret.exitCode,
        });
      } else if (ret.status === "timeout") {
        set(executedResultFamily(id), {
          status: "timeout",
        });
      } else {
        set(executedResultFamily(id), {
          status: "error",
          message: ret.stderr,
        });
      }
    }
  });

  const runAll = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const ids = await snapshot.getPromise(testcaseIdsAtom);

        await Promise.allSettled(ids.map((id) => run(id)));
      },
    []
  );

  return {
    runAll,
    run,
  };
};

export default useTestcaseRunner;
