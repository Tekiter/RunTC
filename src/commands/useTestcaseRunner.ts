import { useContext } from "react";
import { useRecoilCallback } from "recoil";

import { RunningQueueContext } from "@/context/runningQueue";
import { executableTargetAtom } from "@/states/executableTarget";
import { executedResultFamily } from "@/states/executedResult";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

const useTestcaseRunner = () => {
  const queue = useContext(RunningQueueContext);

  const run = useRecoilCallback(({ snapshot }) => async (id: string) => {
    const executablePath = await snapshot.getPromise(executableTargetAtom);

    if (!executablePath) {
      return;
    }

    const testcase = await snapshot.getPromise(testcaseFamily(id));

    queue.add({
      testcaseId: id,
      executablePath,
      stdin: testcase.input.text,
    });
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

  const stopAll = () => {
    queue.clear();
  };

  return {
    runAll,
    run,
    makeIdle,
    stopAll,
  };
};

export default useTestcaseRunner;
