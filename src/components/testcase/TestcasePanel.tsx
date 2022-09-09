import { EditableText, H1, Tab, TabId, Tabs } from "@blueprintjs/core";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { executedResultFamily } from "@/states/executedResult";
import { testcaseFamily, TestcaseID } from "@/states/testcase";

import InputEditor from "./InputEditor";
import TerminalOutput from "./TerminalOutput";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const runner = useTestcaseRunner();
  const testcaseCommand = useTestcaseCommand();
  const testcase = useRecoilValue(testcaseFamily(testcaseId));
  const result = useRecoilValue(executedResultFamily(testcaseId));

  const [selectedTabId, setSelectedTabId] = useState<TabId>("input");

  return (
    <StyledTestcasePanel>
      <HeaderArea>
        <H1>
          <EditableText
            value={testcase.name}
            onChange={(name) =>
              testcaseCommand.changeValue(testcaseId, { name })
            }
          />
        </H1>
        <button onClick={() => runner.run(testcaseId)}>Run</button>
        <button onClick={() => testcaseCommand.remove(testcaseId)}>삭제</button>
      </HeaderArea>
      <TabArea>
        <Tabs
          id="testcaseTabs"
          large
          selectedTabId={selectedTabId}
          onChange={(id) => setSelectedTabId(id)}
        >
          <Tab id="input" title="입력" />
          <Tab id="output" title="출력" />
          <Tab id="error" title="에러" />
          <Tab id="others" title="부가정보" />
        </Tabs>
      </TabArea>
      <ContentArea>
        <Panel show={selectedTabId === "input"}>
          <InputEditor
            value={testcase.input}
            onChange={(input) =>
              testcaseCommand.changeValue(testcaseId, { input })
            }
          />
        </Panel>
        <Panel show={selectedTabId === "output"}>
          <TerminalOutput
            content={result.status === "exited" ? result.stdout : ""}
          />
        </Panel>
        <Panel show={selectedTabId === "error"}>
          <TerminalOutput
            content={result.status === "exited" ? result.stderr : ""}
          />
        </Panel>
        <Panel show={selectedTabId === "others"}>
          <p>{JSON.stringify(result)}</p>
        </Panel>
      </ContentArea>
    </StyledTestcasePanel>
  );
};

export default TestcasePanel;

const StyledTestcasePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderArea = styled.div``;

const TabArea = styled.div`
  padding: 0;
  margin: 10px;
`;

const ContentArea = styled.div`
  flex-grow: 1;

  position: relative;
`;

const Panel = styled.div<{ show: boolean }>`
  height: 100%;
  width: 100%;
  position: absolute;

  ${(props) =>
    !props.show
      ? css`
          display: none;
        `
      : ""}
`;
