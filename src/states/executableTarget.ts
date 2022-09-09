import { atom, selector } from "recoil";

export const executableTargetAtom = atom<string | null>({
  key: "executableTargetAtom",
  default: null,
});

export const executableTargetFilenameSelector = selector<string | null>({
  key: "executableTargetFilenameSelector",
  get({ get }) {
    const path = get(executableTargetAtom);
    if (path === null) {
      return null;
    }

    return path.split("\\").at(-1) ?? null;
  },
});
