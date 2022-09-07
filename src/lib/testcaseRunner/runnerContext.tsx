import { createContext } from "react";

import { TestcaseRunner } from "./types";

const placeholderRunner = new Proxy(
  {},
  {
    get() {
      throw new Error("Runner is not loaded yet.");
    },
  }
) as TestcaseRunner;

export const RunnerContext = createContext<TestcaseRunner>(placeholderRunner);
