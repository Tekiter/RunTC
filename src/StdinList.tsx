import { Button } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

import useSerial from "./hook/useSerial";
import { stdinInput, stdinInputIds } from "./state/inputValue";
import StdinInput from "./StdinInput";

const StdinList: FC = () => {
  const inputIds = useRecoilValue(stdinInputIds);

  const { getSerial } = useSerial();

  const handleAdd = useRecoilCallback(({ set }) => () => {
    const id = getSerial();
    set(stdinInput(id), { id, data: { type: "plainText", text: "" + id } });
  });

  return (
    <StyledStdinList>
      <Button onClick={handleAdd}>Add</Button>
      {inputIds.map((id) => (
        <StdinInput key={id} inputId={id} />
      ))}
    </StyledStdinList>
  );
};

export default StdinList;

const StyledStdinList = styled.div``;
