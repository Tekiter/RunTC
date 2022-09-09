import { FileInput } from "@blueprintjs/core";
import { FormEventHandler } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  executableTargetAtom,
  executableTargetFilenameSelector,
} from "../../states/executableTarget";

const ChooseExecuteTarget = () => {
  const setExecuteTarget = useSetRecoilState(executableTargetAtom);
  const filename = useRecoilValue(executableTargetFilenameSelector);

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
        hasSelection={!!filename}
      ></FileInput>
    </>
  );
};

export default ChooseExecuteTarget;
