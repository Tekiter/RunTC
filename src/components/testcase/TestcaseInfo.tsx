import { Button, EditableText, H1 } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
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
      <Name>
        <EditableText
          value={testcase.name}
          onChange={(name) => command.changeValue(testcaseId, { name })}
        />
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

const Name = styled(H1)`
  flex-grow: 1;
  font-weight: 500;
  align-self: center;
  margin: 0 10px;
`;
