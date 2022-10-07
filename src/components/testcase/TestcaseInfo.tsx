import { Button, Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { MdEdit } from "react-icons/md";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { testcaseFamily } from "@/states/testcase";

interface TestcaseInfoProps {
  testcaseId: string;
}

const TestcaseInfo: FC<TestcaseInfoProps> = ({ testcaseId }) => {
  const command = useTestcaseCommand();
  const runner = useTestcaseRunner();
  const testcase = useRecoilValue(testcaseFamily(testcaseId));

  return (
    <StyledTestcaseInfo>
      <Name
        value={testcase.name}
        placeholder="이름 없음"
        onChange={(name) => command.changeValue(testcaseId, { name })}
        fontSize={20}>
        <WithEditButton>
          <EditablePreview
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            display="block"
            justifySelf="normal"
          />
        </WithEditButton>
        <EditableInput />
      </Name>
      <Button onClick={() => runner.run(testcaseId)}>Run</Button>
      <Button onClick={() => command.remove(testcaseId)}>삭제</Button>
    </StyledTestcaseInfo>
  );
};

export default TestcaseInfo;

const StyledTestcaseInfo = styled.div`
  display: flex;
  height: 3.5rem;
`;

const Name = styled(Editable)`
  flex-grow: 1;
  font-weight: 500;
  align-self: center;
  margin: 0 10px;
`;

const WithEditButton = ({ children }: { children: ReactNode }) => {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isEditing ? (
    <></>
  ) : (
    <StyledWithEditButton>
      {children}
      <Button size="sm" variant="link" {...getEditButtonProps()}>
        <MdEdit />
      </Button>
    </StyledWithEditButton>
  );
};

const StyledWithEditButton = styled.div`
  display: grid;
  grid-template-columns: minmax(16px, 1fr) 20px;
  align-items: center;
`;
