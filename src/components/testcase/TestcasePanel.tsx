import { EditableText, H1 } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilState } from "recoil";

import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { testcaseFamily, TestcaseID } from "@/state/testcase";

import InputEditor from "./InputEditor";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const [testcase, setTestcase] = useRecoilState(testcaseFamily(testcaseId));
  const runner = useTestcaseRunner();

  return (
    <StyledTestcasePanel>
      <H1>
        <EditableText
          value={testcase.name}
          onChange={(name) => setTestcase({ ...testcase, name })}
        />
      </H1>
      <button onClick={() => runner.run(testcaseId)}>Run</button>
      <InputEditor
        value={testcase.input}
        onChange={(input) => setTestcase({ ...testcase, input })}
      />
    </StyledTestcasePanel>
  );
};

export default TestcasePanel;

const StyledTestcasePanel = styled.div``;
