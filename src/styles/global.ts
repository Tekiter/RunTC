import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { color } from "./color";

export const globalStyle = css`
  ${emotionReset};

  :root {
    ${color.getCSSInitializer()}
  }
`;

console.log(color.getCSSInitializer());
