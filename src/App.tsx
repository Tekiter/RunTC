import "@blueprintjs/core/lib/css/blueprint.css";

import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

import CodeRunner from "./CodeRunner";
import { globalStyle } from "./styles/global";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Global styles={globalStyle} />
      <CodeRunner />
    </RecoilRoot>
  );
};

export default App;
