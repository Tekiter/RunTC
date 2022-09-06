import { atom } from "recoil";

export const executeTargetAtom = atom<string | null>({
  key: "executeTarget",
  default: null,
});
