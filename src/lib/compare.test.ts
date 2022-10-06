import compare from "./compare";

describe("compare", () => {
  describe("ignoreTailingSpaces", () => {
    test.each<[string, string, boolean]>([
      ["3", "3", true],
      ["3 ", "3", true],
      ["3", "3 ", true],
      ["3  ", "3 ", true],
      ["aaa\nddd", "aaa \nddd", true],
      ["aaa\nddd", "aaa \nddd ", true],
      ["aaa\nddd ", "aaa \nddd", true],
      ["aaa\nddd ", "aaa \nddd  ", true],
      ["aaa\r\nddd", "aaa\nddd", true],
      ["aaa\nddd\n", "aaa\nddd\n", true],
      ["aaa\nddd", "aaa\nddd\n", true],

      ["3", "4", false],
      ["3", "4 ", false],
      ["3 ", "4", false],
      ["3 ", "4", false],
      [" 3", "3", false],
      ["3", " 3", false],
      ["aaa\nddd", "aaa\naaa", false],
      ["aaa\n\nddd", "aaa\nddd", false],
    ])("success w/ \n%p\n%p", (a, b, result) => {
      expect(compare.ignoreTailingSpaces(a, b)).toBe(result);
    });
  });
});
