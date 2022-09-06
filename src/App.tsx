import "@blueprintjs/core/lib/css/blueprint.css";

import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import { RecoilRoot } from "recoil";

import CodeRunner from "./CodeRunner";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Global
        styles={css`
          ${emotionReset}
        `}
      />
      <CodeRunner />
    </RecoilRoot>
  );
};

export default App;
