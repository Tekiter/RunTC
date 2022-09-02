import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import emotionReset from "emotion-reset";
import { useState } from "react";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <StyeldApp>
      <Global
        styles={css`
          ${emotionReset}
        `}
      />
      <h1>Hello world!</h1>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
    </StyeldApp>
  );
};

const StyeldApp = styled.div`
  background-color: gray;
`;

export default App;
