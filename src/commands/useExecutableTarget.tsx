import { useResetRecoilState, useSetRecoilState } from "recoil";

import { executableTargetAtom } from "@/states/executableTarget";

const useExecutableTarget = () => {
  const setExecuteTarget = useSetRecoilState(executableTargetAtom);
  const resetExecutableTarget = useResetRecoilState(executableTargetAtom);

  return {
    setPath(path: string) {
      setExecuteTarget(path);
    },
    reset() {
      resetExecutableTarget();
    },
  };
};

export default useExecutableTarget;
