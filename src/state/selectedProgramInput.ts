import { atom, selector } from "recoil";

import { stdinInput } from "./stdinInput";

export const selectedInputKeyAtom = atom<string | null>({
  key: "selectedInputKeyAtom",
  default: null,
});

export const selectedInputSelector = selector({
  key: "selectedInputSelector",
  get({ get }) {
    const selectedKey = get(selectedInputKeyAtom);

    if (selectedKey === null) {
      return null;
    }

    return stdinInput(selectedKey);
  },
});
