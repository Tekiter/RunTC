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

    const matches = path.match(/.+[\\/\\]([^\\/\\]+)/);

    return matches?.[1] ?? null;
  },
});
