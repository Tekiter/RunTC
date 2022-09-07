import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { color } from "./color";

export const globalStyle = css`
  ${emotionReset};

  * {
    box-sizing: border-box;
    font-size: 100%;
  }

  :root {
    ${color.getCSSInitializer()}
  }
`;
