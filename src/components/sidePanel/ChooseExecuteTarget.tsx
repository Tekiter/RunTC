import { FileInput } from "@blueprintjs/core";
import { FormEventHandler } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  executeTargetAtom,
  executeTargetFilenameSelector,
} from "../../states/executeTarget";

const ChooseExecuteTarget = () => {
  const setExecuteTarget = useSetRecoilState(executeTargetAtom);
  const filename = useRecoilValue(executeTargetFilenameSelector);

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
      <FileInput
        onInputChange={handleFileInput}
        text={filename ?? "파일 선택..."}
      ></FileInput>
    </>
  );
};

export default ChooseExecuteTarget;
