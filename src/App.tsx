import "@blueprintjs/core/lib/css/blueprint.css";

import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

import CodeRunner from "./CodeRunner";
import { NodejsRunner } from "./lib/testcaseRunner/NodejsRunner";
import { RunnerContext } from "./lib/testcaseRunner/runnerContext";
import { globalStyle } from "./styles/global";

const App: React.FC = () => {
  return (
    <RunnerContext.Provider value={new NodejsRunner()}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <CodeRunner />
      </RecoilRoot>
    </RunnerContext.Provider>
  );
};

export default App;
