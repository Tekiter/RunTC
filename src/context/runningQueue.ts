import { createContext } from "react";

import { TimeoutTaskQueue } from "@/lib/taskQueue/TimeoutTaskQueue";
import { TaskQueue } from "@/lib/taskQueue/types";

export type TestcaseTask = {
  testcaseId: string;
  executablePath: string;
  stdin: string;
};

export const RunningQueueContext = createContext<TaskQueue<TestcaseTask>>(new TimeoutTaskQueue());
