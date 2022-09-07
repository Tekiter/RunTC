import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import useSerial from "@/hook/useSerial";
import { selectedTestcaseKeyAtom } from "@/state/selectedTestcase";
import {
  testcaseFamily,
  testcaseIdsAtom,
  testcaseSerialCounterAtom,
} from "@/state/testcase";

import SelectTestcaseItem from "./SelectTestcaseItem";

const SelectTestcaseMenu: FC = () => {
  const { getSerial } = useSerial();
  const testcaseIds = useRecoilValue(testcaseIdsAtom);
  const [serialCounter, setSerialCounter] = useRecoilState(
    testcaseSerialCounterAtom
  );
  const [selectedTestcaseKey, setSelectedTestcaseKey] = useRecoilState(
    selectedTestcaseKeyAtom
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
    <>
      <Button onClick={addTestcase}>Add</Button>
      {testcaseIds.map((key) => (
        <SelectTestcaseItem
          key={key}
          inputId={key}
          selected={selectedTestcaseKey === key}
          onClick={() => changeTestcase(key)}
        />
      ))}
    </>
  );
};

export default SelectTestcaseMenu;
