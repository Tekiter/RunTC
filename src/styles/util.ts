interface CSSVariableOptions {
  suffix?: string;
}

export interface CSSVariables<T extends Record<string, string>> {
  getCSSInitializer(): string;
  values: { [key in keyof T]: string };
}

export function createCSSVariables<T extends Record<string, string>>(
  obj: T,
  options: CSSVariableOptions = {},
): CSSVariables<T> {
  return {
    getCSSInitializer() {
      return Object.keys(obj)
        .map((key) => `--${key}${options.suffix ?? ""}: ${obj[key]};\n`)
        .join("");
    },
    values: new Proxy(
      {},
      {
        get(_, key) {
          return `var(--${String(key)}${options.suffix ?? ""})`;
        },
      },
    ) as CSSVariables<T>["values"],
  };
}
