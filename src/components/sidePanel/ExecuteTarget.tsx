import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FormEventHandler, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  executableTargetAtom,
  executableTargetFilenameSelector,
} from "../../states/executableTarget";

const ExecuteTarget = () => {
  const fileRef = useRef<HTMLInputElement>(null);

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
    <StyledExecuteTarget>
      <FileInputHelper ref={fileRef} type="file" onChange={handleFileInput} />
      <FileInput
        placeholder="실행 파일 선택..."
        onClick={() => fileRef.current?.click()}
        value={filename ?? ""}
        size="md"
        readOnly
        variant="filled"
        isInvalid={filename === null}
      />
    </StyledExecuteTarget>
  );
};

export default ExecuteTarget;

const StyledExecuteTarget = styled.div`
  padding: 8px;
`;

const FileInputHelper = styled.input`
  display: none;
`;

const FileInput = styled(Input)`
  cursor: pointer;
`;
