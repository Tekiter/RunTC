import { EditableText, H1 } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { executedResultFamily } from "@/states/executedResult";
import { testcaseFamily, TestcaseID } from "@/states/testcase";

import InputEditor from "./InputEditor";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const runner = useTestcaseRunner();
  const testcaseCommand = useTestcaseCommand();

  const testcase = useRecoilValue(testcaseFamily(testcaseId));

  const result = useRecoilValue(executedResultFamily(testcaseId));

  return (
    <StyledTestcasePanel>
      <H1>
        <EditableText
          value={testcase.name}
          onChange={(name) => testcaseCommand.changeValue(testcaseId, { name })}
        />
      </H1>
      <button onClick={() => runner.run(testcaseId)}>Run</button>
      <button onClick={() => testcaseCommand.remove(testcaseId)}>삭제</button>
      <p>{JSON.stringify(result)}</p>
      <InputEditor
        value={testcase.input}
        onChange={(input) => testcaseCommand.changeValue(testcaseId, { input })}
      />
    </StyledTestcasePanel>
  );
};

export default TestcasePanel;

const StyledTestcasePanel = styled.div``;
