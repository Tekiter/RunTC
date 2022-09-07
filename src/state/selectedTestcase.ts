import { atom, selector } from "recoil";

import { testcaseFamily } from "./testcase";

export const selectedTestcaseKeyAtom = atom<string | null>({
  key: "selectedTestcaseKeyAtom",
  default: null,
});

export const selectedTestcaseSelector = selector({
  key: "selectedTestcaseSelector",
  get({ get }) {
    const selectedKey = get(selectedTestcaseKeyAtom);

    if (selectedKey === null) {
      return null;
    }

    return testcaseFamily(selectedKey);
  },
});
