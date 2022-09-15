import { createCSSVariables } from "./util";

export const color = createCSSVariables(
  {
    backgroundSurface: "#f7f7f8",
    background: "#ffffff",
    hoverBackground: "rgba(23, 25, 26, .05)",
    selectedBackground: "rgba(0, 24, 42, .07)",
    grayForeground: "rgba(0, 24, 42, 0.65)",
    foreground: "rgba(0, 24, 42, 1)",
    disabledForebround: "rgba(0, 24, 42, 0.2)",
    error: "#e53e3e",

    statusIdle: "#bbbbbb",
    statusWaiting: "#777777",
    statusRunning: "#ae9504",
    statusAC: "#20b941",
    statusWA: "#921515",
    statusTLE: "#921515",
    statusRE: "#143168",
  },
  { suffix: "Color" }
);
