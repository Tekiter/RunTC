import { useContext } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { RunnerContext } from "@/lib/testcaseRunner/runnerContext";
import { executeTargetAtom } from "@/state/executeTarget";
import { testcaseFamily, testcaseIdsAtom } from "@/state/testcase";

const useTestcaseRunner = () => {
  const runner = useContext(RunnerContext);
  const executablePath = useRecoilValue(executeTargetAtom);

  const runAll = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const ids = await snapshot.getPromise(testcaseIdsAtom);

        for (const id of ids) {
          const value = await snapshot.getPromise(testcaseFamily(id));
          console.log(value);
        }
      },
    []
  );

  const run = useRecoilCallback(({ snapshot }) => async (id: string) => {
    if (!executablePath) {
      return;
    }

    const testcase = await snapshot.getPromise(testcaseFamily(id));

    if (testcase.input.type === "plainText") {
      const ret = await runner.run(id, {
        filepath: executablePath,
        stdin: testcase.input.text,
        timeout: 2000,
      });

      console.log(ret);
    }
  });

  return {
    runAll,
    run,
  };
};

export default useTestcaseRunner;
