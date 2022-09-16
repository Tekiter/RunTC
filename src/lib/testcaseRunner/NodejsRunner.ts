import { ChildProcessWithoutNullStreams, spawn } from "child_process";

import { RunOption, RunResult, TestcaseRunner } from "./types";

const globalTimeout = 60000;

export class NodejsRunner implements TestcaseRunner {
  private processes: Map<string, ProcessInfo>;
  constructor() {
    this.processes = new Map();
  }

  run(key: string, options: RunOption): Promise<RunResult> {
    const { filepath, stdin, timeout } = options;

    return new Promise((resolve, reject) => {
      const existingInfo = this.processes.get(key);
      if (existingInfo?.status === "running") {
        reject(new RunnerError("Process is already running"));
      }

      try {
        const ls = spawn(filepath, [], {
          windowsHide: true,
          timeout: globalTimeout,
        });

        const info: ProcessInfo = {
          status: "running",
          ls,
          stdout: "",
          stderr: "",
        };
        this.processes.set(key, info);

        ls.stdout.on("data", (data) => {
          info.stdout += data.toString();
        });

        ls.stderr.on("data", (data) => {
          info.stderr += data.toString();
        });

        ls.on("close", (code) => {
          if (info.status !== "running") {
            return;
          }

          if (code !== null) {
            info.status = "exited";

            resolve({
              status: "exited",
              exitCode: code,
              stdout: info.stdout,
              stderr: info.stderr,
            });
            return;
          }

          info.status = "error";
          resolve({
            status: "error",
            stdout: info.stdout,
            stderr: info.stderr,
          });
        });

        ls.on("error", (err) => {
          reject(err);
        });

        setTimeout(() => {
          ls.kill();

          info.status = "timeout";

          resolve({
            status: "timeout",
            stdout: info.stdout,
            stderr: info.stderr,
          });
        }, timeout);

        ls.stdin.write(stdin);
        ls.stdin.end();
      } catch (e) {
        reject(e);
      }
    });
  }

  dispose(key: string): void {
    const info = this.processes.get(key);

    if (!info) {
      return;
    }

    info.ls.kill();
    this.processes.delete(key);
  }
}

interface ProcessInfo {
  status: "running" | "exited" | "timeout" | "error";
  ls: ChildProcessWithoutNullStreams;
  stdout: string;
  stderr: string;
}

class RunnerError extends Error {}
