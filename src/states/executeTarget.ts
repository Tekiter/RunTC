import { atom, selector } from "recoil";

export const executeTargetAtom = atom<string | null>({
  key: "executeTarget",
  default: null,
});

export const executeTargetFilenameSelector = selector<string | null>({
  key: "executeTargetFilenameSelector",
  get({ get }) {
    const path = get(executeTargetAtom);
    if (path === null) {
      return null;
    }

    return path.split("\\").at(-1) ?? null;
  },
});
