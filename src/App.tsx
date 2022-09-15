import "allotment/dist/style.css";
import "xterm/css/xterm.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

import CodeRunner from "./CodeRunner";
import { RunningQueueContext } from "./context/runningQueue";
import { TimeoutTaskQueue } from "./lib/taskQueue/TimeoutTaskQueue";
import { NodejsRunner } from "./lib/testcaseRunner/NodejsRunner";
import { RunnerContext } from "./lib/testcaseRunner/runnerContext";
import { globalStyle } from "./styles/global";

const App: React.FC = () => {
  return (
    <RunnerContext.Provider value={new NodejsRunner()}>
      <RunningQueueContext.Provider value={new TimeoutTaskQueue()}>
        <ChakraProvider>
          <RecoilRoot>
            <Global styles={globalStyle} />
            <CodeRunner />
          </RecoilRoot>
        </ChakraProvider>
      </RunningQueueContext.Provider>
    </RunnerContext.Provider>
  );
};

export default App;
