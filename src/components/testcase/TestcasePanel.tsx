import { EditableText, H1 } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { executedResultFamily } from "@/state/executedResult";
import { testcaseFamily, TestcaseID } from "@/state/testcase";

import InputEditor from "./InputEditor";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const runner = useTestcaseRunner();
  const [testcase, setTestcase] = useRecoilState(testcaseFamily(testcaseId));

  const result = useRecoilValue(executedResultFamily(testcaseId));

  return (
    <StyledTestcasePanel>
      <H1>
        <EditableText
          value={testcase.name}
          onChange={(name) => setTestcase({ ...testcase, name })}
        />
      </H1>
      <button onClick={() => runner.run(testcaseId)}>Run</button>
      <p>{JSON.stringify(result)}</p>
      <InputEditor
        value={testcase.input}
        onChange={(input) => setTestcase({ ...testcase, input })}
      />
    </StyledTestcasePanel>
  );
};

export default TestcasePanel;

const StyledTestcasePanel = styled.div``;
