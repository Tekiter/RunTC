import styled from "@emotion/styled";
import { FC } from "react";
import { MdAdd } from "react-icons/md";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";
import { testcaseIdsAtom } from "@/states/testcase";
import { color } from "@/styles/color";

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
      {testcaseIds.map((id) => (
        <SelectTestcaseItem
          key={id}
          inputId={id}
          selected={selectedTestcaseKey === id}
          onClick={() => changeTestcase(id)}
        />
      ))}
      <AddTestcaseButton onClick={testcaseCommand.add}>
        <AddIcon />
        테스트 케이스 추가
      </AddTestcaseButton>
    </StyledMenu>
  );
};

export default SelectTestcaseMenu;

const StyledMenu = styled.div``;

const AddTestcaseButton = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 6px;
  margin: 10px 10px 0 10px;
  padding: 10px 15px;

  color: ${color.values.grayForeground};
  font-weight: 500;

  &:hover {
    color: ${color.values.foreground};
    background-color: ${color.values.hoverBackground};
  }
`;

const AddIcon = styled(MdAdd)`
  margin-right: 6px;
`;
