import { spawn } from "child_process";
import { useRecoilCallback, useRecoilValue } from "recoil";

import { executeTargetAtom } from "@/state/executeTarget";
import { testcaseFamily, testcaseIdsAtom } from "@/state/testcase";

const useCodeRunner = () => {
  const executablePath = useRecoilValue(executeTargetAtom);

  const execute = useRecoilCallback(
    ({ snapshot }) =>
      async (id: string) => {
        if (!executablePath) {
          return;
        }
        const stdinValue = snapshot.getLoadable(testcaseFamily(id)).getValue();

        let stdin = "";
        if (stdinValue.input.type === "plainText") {
          stdin = stdinValue.input.text;
        }

        await executeFile({
          path: executablePath,
          stdin,
          timeout: 2000,
        });
      },
    [testcaseIdsAtom]
  );

  return {
    execute,
  };
};

export default useCodeRunner;

type ExecuteFileResult = SuccessfulExitResult;
type SuccessfulExitResult = {
  status: "exited";
  exitCode: number;
  stdout: string;
  stderr: string;
};

interface ExecuteFileOptions {
  path: string;
  timeout: number;
  stdin: string;
}

async function executeFile({
  path,
  timeout,
  stdin,
}: ExecuteFileOptions): Promise<ExecuteFileResult> {
  return new Promise((resolve, reject) => {
    try {
      const ls = spawn(path, [], {
        windowsHide: true,
        timeout,
      });

      let stdoutResult = "";
      let stderrResult = "";

      ls.stdout.on("data", (data) => {
        stdoutResult += data.toString();
      });

      ls.stderr.on("data", (data) => {
        stderrResult += data.toString();
      });

      ls.on("close", (code) => {
        resolve({
          status: "exited",
          exitCode: code ?? -1,
          stdout: stdoutResult,
          stderr: stderrResult,
        });
      });

      ls.on("error", (err) => {
        reject(err);
      });

      ls.stdin.cork();
      ls.stdin.write(stdin + "\n");
      ls.stdin.uncork();
    } catch (err) {
      reject(err);
    }
  });
}
