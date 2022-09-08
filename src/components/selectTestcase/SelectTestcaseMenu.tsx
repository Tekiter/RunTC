import { Button } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import useSerial from "@/hook/useSerial";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";
import {
  testcaseFamily,
  testcaseIdsAtom,
  testcaseSerialCounterAtom,
} from "@/states/testcase";

import SelectTestcaseItem from "./SelectTestcaseItem";

const SelectTestcaseMenu: FC = () => {
  const { getSerial } = useSerial();
  const testcaseIds = useRecoilValue(testcaseIdsAtom);
  const [serialCounter, setSerialCounter] = useRecoilState(
    testcaseSerialCounterAtom
  );
  const [selectedTestcaseKey, setSelectedTestcaseKey] = useRecoilState(
    selectedTestcaseIdAtom
  );

  const addTestcase = useRecoilCallback(({ set }) => () => {
    const id = getSerial();
    set(testcaseFamily(id), {
      id,
      name: `테스트 케이스 ${serialCounter}`,
      input: { type: "plainText", text: "" },
    });
    setSerialCounter((val) => val + 1);
  });

  const changeTestcase = (key: string) => {
    setSelectedTestcaseKey(key);
  };

  return (
    <StyledMenu>
      <Button onClick={addTestcase}>Add</Button>
      {testcaseIds.map((key) => (
        <SelectTestcaseItem
          key={key}
          inputId={key}
          selected={selectedTestcaseKey === key}
          onClick={() => changeTestcase(key)}
        />
      ))}
    </StyledMenu>
  );
};

export default SelectTestcaseMenu;

const StyledMenu = styled.div``;
