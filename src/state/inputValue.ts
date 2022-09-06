import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

export interface StdinInput {
  id: string;
  data: StdinInputData;
}

export type StdinInputData =
  | { type: "plainText"; text: string }
  | { type: "file"; path: string | null };
export type StdinInputType = StdinInputData["type"];

export const stdinInputFamily = atomFamily<StdinInput, string>({
  key: "inputValueAtom",
  default: (id) => ({
    id,
    data: {
      type: "plainText",
      text: "",
    },
  }),
});

export const stdinInputIds = atom<string[]>({
  key: "inputValueIds",
  default: [],
});

export const stdinInput = selectorFamily<StdinInput, string>({
  key: "inputValue",
  get(id) {
    return ({ get }) => get(stdinInputFamily(id));
  },
  set(id) {
    return ({ set, reset }, inputValue) => {
      if (inputValue instanceof DefaultValue) {
        reset(stdinInputFamily(id));
        set(stdinInputIds, (prev) => prev.filter((item) => item !== id));
        return;
      }

      set(stdinInputFamily(id), inputValue);
      set(stdinInputIds, (prev) =>
        Array.from(new Set([...prev, inputValue.id]))
      );
    };
  },
});
