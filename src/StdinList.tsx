import { Button } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import useSerial from "./hook/useSerial";
import { itemCounterAtom, stdinInput, stdinInputIds } from "./state/stdinInput";
import StdinInput from "./StdinInput";

const StdinList: FC = () => {
  const inputIds = useRecoilValue(stdinInputIds);
  const [itemCounter, setItemCounter] = useRecoilState(itemCounterAtom);

  const { getSerial } = useSerial();

  const handleAdd = useRecoilCallback(({ set }) => () => {
    const id = getSerial();
    set(stdinInput(id), {
      id,
      name: `테스트 케이스 ${itemCounter}`,
      data: { type: "plainText", text: "" },
    });
    setItemCounter((val) => val + 1);
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
