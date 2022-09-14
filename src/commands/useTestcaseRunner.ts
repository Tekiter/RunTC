import to from "await-to-js";
import { useContext } from "react";
import { useRecoilCallback } from "recoil";

import { RunnerContext } from "@/lib/testcaseRunner/runnerContext";
import { executableTargetAtom } from "@/states/executableTarget";
import { executedResultFamily, shouldCancel } from "@/states/executedResult";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

const useTestcaseRunner = () => {
  const runner = useContext(RunnerContext);

  const run = useRecoilCallback(({ snapshot, set }) => async (id: string) => {
    const executablePath = await snapshot.getPromise(executableTargetAtom);

    if (!executablePath) {
      return;
    }

    set(executedResultFamily(id), () => ({
      status: "running" as const,
    }));

    const testcase = await snapshot.getPromise(testcaseFamily(id));

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
  });

  const runAll = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const ids = await snapshot.getPromise(testcaseIdsAtom);

        ids.forEach((id) => makeIdle(id));

        for (const id of ids) {
          await run(id);
        }
      },
    []
  );

  const makeIdle = useRecoilCallback(({ reset }) => (id: string) => {
    reset(executedResultFamily(id));
  });

  const stopAll = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(shouldCancel, true);
        console.log("SET");
      },
    []
  );

  return {
    runAll,
    run,
    makeIdle,
    stopAll,
  };
};

export default useTestcaseRunner;
