import { atom, selector } from "recoil";

import { testcaseFamily } from "./testcase";

export const selectedTestcaseIdAtom = atom<string | null>({
  key: "selectedTestcaseKeyAtom",
  default: null,
});

export const selectedTestcaseSelector = selector({
  key: "selectedTestcaseSelector",
  get({ get }) {
    const selectedKey = get(selectedTestcaseIdAtom);

    if (selectedKey === null) {
      return null;
    }

    return testcaseFamily(selectedKey);
  },
});
