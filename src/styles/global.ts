import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { color } from "./color";

export const globalStyle = css`
  ${emotionReset};

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 100;
    src: local("Spoqa Han Sans Neo Thin"),
      url("/fonts/SpoqaHanSansNeo-Thin.woff2") format("woff2");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 700;
    src: local("Spoqa Han Sans Neo Bold"),
      url("/fonts/SpoqaHanSansNeo-Bold.woff2") format("woff2");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 300;
    src: local("Spoqa Han Sans Neo Light"),
      url("/fonts/SpoqaHanSansNeo-Light.woff2") format("woff2");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 400;
    src: local("Spoqa Han Sans Neo Regular"),
      url("/fonts/SpoqaHanSansNeo-Regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    src: local("Spoqa Han Sans Neo Medium"),
      url("/fonts/SpoqaHanSansNeo-Medium.woff2") format("woff2");
  }

  * {
    box-sizing: border-box;
    font-size: 100%;
  }

  body,
  button,
  input,
  textarea {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
  }

  :root {
    ${color.getCSSInitializer()}
  }

  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
  }
  input,
  button,
  textarea,
  :focus {
    outline: none;
  }
`;
