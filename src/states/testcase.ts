import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

export interface Testcase {
  id: TestcaseID;
  name: string;
  input: TestcaseInput;
}

export type TestcaseID = string;

export type TestcaseInput =
  | { type: "plainText"; text: string }
  | { type: "file"; path: string | null };

export type TestcaseInputType = TestcaseInput["type"];

const testcaseInternalFamily = atomFamily<Testcase, string>({
  key: "testcaseInternalFamily",
  default: (id) => ({
    id,
    name: "",
    input: {
      type: "plainText",
      text: "",
    },
  }),
});

export const testcaseIdsAtom = atom<string[]>({
  key: "testcaseIdsAtom",
  default: [],
});

export const testcaseSerialCounterAtom = atom<number>({
  key: "testcaseSerialCounterAtom",
  default: 1,
});

export const testcaseFamily = selectorFamily<Testcase, string>({
  key: "testcaseFamily",
  get(id) {
    return ({ get }) => get(testcaseInternalFamily(id));
  },
  set(id) {
    return ({ set, reset }, inputValue) => {
      if (inputValue instanceof DefaultValue) {
        reset(testcaseInternalFamily(id));
        set(testcaseIdsAtom, (prev) => prev.filter((item) => item !== id));
        return;
      }

      set(testcaseInternalFamily(id), inputValue);
      set(testcaseIdsAtom, (prev) =>
        Array.from(new Set([...prev, inputValue.id]))
      );
    };
  },
});
