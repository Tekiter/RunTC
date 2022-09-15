import { useContext } from "react";
import { useRecoilCallback } from "recoil";

import { RunningQueueContext } from "@/context/runningQueue";
import { executableTargetAtom } from "@/states/executableTarget";
import { executeStatusFamily } from "@/states/executeStatus";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

const useTestcaseRunner = () => {
  const queue = useContext(RunningQueueContext);

  const run = useRecoilCallback(({ snapshot, set }) => async (id: string) => {
    const executablePath = await snapshot.getPromise(executableTargetAtom);

    if (!executablePath) {
      return;
    }

    const testcase = await snapshot.getPromise(testcaseFamily(id));
    const { status } = await snapshot.getPromise(executeStatusFamily(id));

    if (status === "waiting" || status === "running") {
      return;
    }

    set(executeStatusFamily(id), { status: "waiting" });

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

        for (const id of ids) {
          await run(id);
        }
      },
    []
  );

  const makeIdle = useRecoilCallback(({ set }) => (id: string) => {
    set(executeStatusFamily(id), { status: "waiting" });
  });

  const stopAll = useRecoilCallback(() => () => {
    queue.pause();
    queue.clear();
  });

  return {
    runAll,
    run,
    makeIdle,
    stopAll,
  };
};

export default useTestcaseRunner;
