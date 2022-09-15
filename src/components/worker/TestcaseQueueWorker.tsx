import to from "await-to-js";
import { FC, useContext, useEffect } from "react";
import { useRecoilCallback } from "recoil";

import { RunningQueueContext } from "@/context/runningQueue";
import { RunnerContext } from "@/lib/testcaseRunner/runnerContext";
import { executedResultFamily } from "@/states/executedResult";

const TestcaseQueueWorker: FC = () => {
  const queue = useContext(RunningQueueContext);
  const runner = useContext(RunnerContext);

  const processTask = useRecoilCallback(
    ({ set }) =>
      async (testcaseId: string, executablePath: string, stdin: string) => {
        set(executedResultFamily(testcaseId), () => ({
          status: "running" as const,
        }));

        const [err, ret] = await to(
          runner.run(testcaseId, {
            filepath: executablePath,
            stdin,
            timeout: 2000,
          })
        );

        if (err) {
          set(executedResultFamily(testcaseId), {
            status: "error",
            message: err.message,
          });

          return;
        }

        if (ret.status === "exited") {
          set(executedResultFamily(testcaseId), {
            status: "exited",
            stdout: ret.stdout,
            stderr: ret.stderr,
            exitCode: ret.exitCode,
          });
        } else if (ret.status === "timeout") {
          set(executedResultFamily(testcaseId), {
            status: "timeout",
          });
        } else {
          set(executedResultFamily(testcaseId), {
            status: "error",
            message: ret.stderr,
          });
        }
      }
  );

  useEffect(() => {
    queue.setHandler(async ({ data }) => {
      const { testcaseId, executablePath, stdin } = data;
      await processTask(testcaseId, executablePath, stdin);
    });

    return () => {
      queue.removeHandler();
    };
  }, []);

  return <></>;
};

export default TestcaseQueueWorker;
