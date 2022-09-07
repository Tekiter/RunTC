import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

import useSerial from "@/hook/useSerial";
import { selectedInputKeyAtom } from "@/state/selectedProgramInput";
import { itemCounterAtom, stdinInput, stdinInputIds } from "@/state/stdinInput";

import ProgramInputListItem from "./ProgramInputListItem";

const ProgramInputList: FC = () => {
  const { getSerial } = useSerial();
  const programInputIds = useRecoilValue(stdinInputIds);
  const [itemCounter, setItemCounter] = useRecoilState(itemCounterAtom);
  const [selectedInputKey, setSelectedInputKey] =
    useRecoilState(selectedInputKeyAtom);

  const handleAdd = useRecoilCallback(({ set }) => () => {
    const id = getSerial();
    set(stdinInput(id), {
      id,
      name: `테스트 케이스 ${itemCounter}`,
      data: { type: "plainText", text: "" },
    });
    setItemCounter((val) => val + 1);
  });

  const handleListItemClick = (key: string) => {
    setSelectedInputKey(key);
  };

  return (
    <>
      <Button onClick={handleAdd}>Add</Button>
      {programInputIds.map((key) => (
        <ProgramInputListItem
          key={key}
          inputId={key}
          selected={selectedInputKey === key}
          onClick={() => handleListItemClick(key)}
        />
      ))}
    </>
  );
};

export default ProgramInputList;
