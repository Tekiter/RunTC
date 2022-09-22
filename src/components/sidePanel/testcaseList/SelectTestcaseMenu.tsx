import styled from "@emotion/styled";
import { FC } from "react";
import { BiExport, BiImport } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { useRecoilValue } from "recoil";

import useExport from "@/commands/useExport";
import useTestcaseCommand from "@/commands/useTestcaseCommand";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";
import { testcaseIdsAtom } from "@/states/testcase";

import MenuButton from "../common/MenuButton";
import SelectTestcaseItem from "./SelectTestcaseItem";

const SelectTestcaseMenu: FC = () => {
  const testcaseCommand = useTestcaseCommand();
  const testcaseIds = useRecoilValue(testcaseIdsAtom);
  const selectedTestcaseKey = useRecoilValue(selectedTestcaseIdAtom);
  const importExport = useExport();

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
      <ActionButtonList>
        <MenuButton icon={<MdAdd />} onClick={testcaseCommand.add}>
          테스트 케이스 추가
        </MenuButton>
        <Spacer />
        <MenuButton icon={<BiExport />} onClick={importExport.downloadPacked}>
          내보내기
        </MenuButton>
        <MenuButton icon={<BiImport />} onClick={testcaseCommand.add}>
          불러오기
        </MenuButton>
      </ActionButtonList>
    </StyledMenu>
  );
};

export default SelectTestcaseMenu;

const StyledMenu = styled.div``;

const ActionButtonList = styled.div`
  margin-top: 15px;
`;

const Spacer = styled.div`
  margin-top: 15px;
`;
