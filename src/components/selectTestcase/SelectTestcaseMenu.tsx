import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";
import { testcaseIdsAtom } from "@/states/testcase";

import SelectTestcaseItem from "./SelectTestcaseItem";

const SelectTestcaseMenu: FC = () => {
  const testcaseCommand = useTestcaseCommand();
  const testcaseIds = useRecoilValue(testcaseIdsAtom);
  const selectedTestcaseKey = useRecoilValue(selectedTestcaseIdAtom);

  const changeTestcase = (id: string) => {
    testcaseCommand.select(id);
  };

  return (
    <StyledMenu>
      <Button onClick={testcaseCommand.add}>Add</Button>
      {testcaseIds.map((id) => (
        <SelectTestcaseItem
          key={id}
          inputId={id}
          selected={selectedTestcaseKey === id}
          onClick={() => changeTestcase(id)}
        />
      ))}
    </StyledMenu>
  );
};

export default SelectTestcaseMenu;

const StyledMenu = styled.div``;
