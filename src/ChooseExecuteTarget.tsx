import { FileInput } from "@blueprintjs/core";
import { FormEventHandler } from "react";
import { useRecoilState } from "recoil";

import { executeTargetAtom } from "./state/executeTarget";

const ChooseExecuteTarget = () => {
  const [executeTarget, setExecuteTarget] = useRecoilState(executeTargetAtom);

  const handleFileInput: FormEventHandler<HTMLInputElement> = (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setExecuteTarget(file.path);
  };

  return (
    <>
      <FileInput onInputChange={handleFileInput} />
      <p>Target: {executeTarget}</p>
    </>
  );
};

export default ChooseExecuteTarget;
