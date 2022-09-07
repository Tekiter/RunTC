import { createCSSVariables } from "./util";

export const color = createCSSVariables(
  {
    backgroundSurface: "#f7f7f8",
    background: "#ffffff",
    hoverBackground: "rgba(23, 25, 26, .05)",
    selectedBackground: "rgba(0, 24, 42, .07)",
  },
  { suffix: "Color" }
);
