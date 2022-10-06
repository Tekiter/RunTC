const compare = {
  ignoreTailingSpaces(a: string, b: string) {
    const aLines = splitByLines(a.trimEnd());
    const bLines = splitByLines(b.trimEnd());

    if (aLines.length !== bLines.length) {
      return false;
    }

    return aLines.every((a, idx) => a.trimEnd() === bLines[idx].trimEnd());
  },
};

export default compare;

function splitByLines(str: string): string[] {
  return str.split("\n").map((line) => line.trimEnd());
}
