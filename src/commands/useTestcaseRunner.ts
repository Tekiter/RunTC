import to from "await-to-js";
import { useContext } from "react";
import { useRecoilCallback } from "recoil";

import { RunnerContext } from "@/lib/testcaseRunner/runnerContext";
import { executableTargetAtom } from "@/states/executableTarget";
import { executedResultFamily } from "@/states/executedResult";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

const useTestcaseRunner = () => {
  const runner = useContext(RunnerContext);

  const run = useRecoilCallback(({ snapshot, set }) => async (id: string) => {
    const executablePath = await snapshot.getPromise(executableTargetAtom);

    console.log("gogo", id, executablePath);
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

        console.log(ids);

        ids.forEach((id) => reset(id));

        for (const id of ids) {
          console.log("Let's go", id);
          await run(id);
        }
      },
    []
  );

  const reset = useRecoilCallback(({ reset }) => (id: string) => {
    reset(executedResultFamily(id));
  });

  return {
    runAll,
    run,
    reset,
  };
};

export default useTestcaseRunner;
