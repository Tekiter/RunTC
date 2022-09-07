export function createCSSVariables<T extends Record<string, string>>(obj: T) {
  return {
    getValue(key: keyof T) {
      return `--${key}`;
    },
    getCSSInitializer() {
      return Object.keys(obj)
        .map((key) => `--${key}: ${obj[key]};\n`)
        .join("");
    },
  };
}
