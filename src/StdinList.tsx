import { Button } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import useSerial from "./hook/useSerial";
import {
  testcaseFamily,
  testcaseIdsAtom,
  testcaseSerialCounterAtom,
} from "./state/testcase";
import StdinInput from "./StdinInput";

const StdinList: FC = () => {
  const inputIds = useRecoilValue(testcaseIdsAtom);
  const [itemCounter, setItemCounter] = useRecoilState(
    testcaseSerialCounterAtom
  );

  const { getSerial } = useSerial();

  const handleAdd = useRecoilCallback(({ set }) => () => {
    const id = getSerial();
    set(testcaseFamily(id), {
      id,
      name: `테스트 케이스 ${itemCounter}`,
      input: { type: "plainText", text: "" },
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
