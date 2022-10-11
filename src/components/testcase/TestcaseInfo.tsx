import { Button, Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { MdDelete, MdEdit, MdPlayArrow } from "react-icons/md";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { testcaseFamily } from "@/states/testcase";
import { TestcaseResult, testcaseResultFamily } from "@/states/testcaseResult";

import { getResultColor, getResultDescription } from "../common/renderResultUtil";

interface TestcaseInfoProps {
  testcaseId: string;
}

const TestcaseInfo: FC<TestcaseInfoProps> = ({ testcaseId }) => {
  const command = useTestcaseCommand();
  const runner = useTestcaseRunner();
  const testcase = useRecoilValue(testcaseFamily(testcaseId));
  const result = useRecoilValue(testcaseResultFamily(testcaseId));

  return (
    <StyledTestcaseInfo>
      <NameBox>
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
      </NameBox>
      <ActionBox>
        <ActionBoxLeft>
          <Button
            onClick={() => runner.run(testcaseId)}
            variant="outline"
            size="sm"
            leftIcon={<MdPlayArrow />}
            colorScheme="teal"
            isLoading={result === "running"}>
            실행
          </Button>
          <Result status={result}>{getResultDescription(result)}</Result>
        </ActionBoxLeft>
        <Spacer />
        <Button
          onClick={() => command.remove(testcaseId)}
          variant="outline"
          size="sm"
          leftIcon={<MdDelete />}
          colorScheme="red">
          삭제
        </Button>
      </ActionBox>
    </StyledTestcaseInfo>
  );
};

export default TestcaseInfo;

const StyledTestcaseInfo = styled.div``;

const NameBox = styled.div`
  margin-top: 10px;
  height: 40px;
`;

const ActionBox = styled.div`
  display: flex;
  margin: 0 8px;
`;

const ActionBoxLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Result = styled.div<{ status: TestcaseResult }>`
  margin-left: 0.8rem;
  font-size: 0.85rem;

  ${(props) => css`
    color: ${getResultColor(props.status)};
  `}
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Name = styled(Editable)`
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
  grid-template-columns: max-content 20px 1fr;
  align-items: center;
`;
