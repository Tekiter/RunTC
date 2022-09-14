import { Input, InputGroup } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FormEventHandler, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  executableTargetAtom,
  executableTargetFilenameSelector,
} from "../../states/executableTarget";

const ChooseExecuteTarget = () => {
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
    <>
      <HiddenFileInput ref={fileRef} type="file" onChange={handleFileInput} />
      <InputGroup>
        <Input
          placeholder={"Your file ..."}
          onClick={() => fileRef.current?.click()}
          value={filename ?? ""}
          readOnly
        />
      </InputGroup>
    </>
  );
};

export default ChooseExecuteTarget;

const HiddenFileInput = styled.input`
  display: none;
`;
