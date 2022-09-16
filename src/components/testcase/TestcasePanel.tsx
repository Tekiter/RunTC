import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import { executeStatusFamily } from "@/states/executeStatus";
import { testcaseFamily, TestcaseID } from "@/states/testcase";

import AnswerEditor from "./AnswerEditor";
import InputEditor from "./InputEditor";
import TerminalOutput from "./TerminalOutput";
import TestcaseInfo from "./TestcaseInfo";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const testcaseCommand = useTestcaseCommand();
  const testcase = useRecoilValue(testcaseFamily(testcaseId));
  const result = useRecoilValue(executeStatusFamily(testcaseId));

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <StyledTestcasePanel>
      <HeaderArea>
        <TestcaseInfo testcaseId={testcaseId} />
      </HeaderArea>
      <TabArea>
        <Tabs onChange={setSelectedTabIndex}>
          <TabList>
            <Tab>입력</Tab>
            <Tab>정답</Tab>
            <Tab>출력</Tab>
            <Tab>에러</Tab>
            <Tab>부가정보</Tab>
          </TabList>
        </Tabs>
      </TabArea>
      <ContentArea>
        <Panel show={selectedTabIndex === 0}>
          <InputEditor
            value={testcase.input}
            onChange={(input) =>
              testcaseCommand.changeValue(testcaseId, { input })
            }
          />
        </Panel>
        <Panel show={selectedTabIndex === 1}>
          <AnswerEditor
            value={testcase.answer}
            onChange={(answer) =>
              testcaseCommand.changeValue(testcaseId, { answer })
            }
          />
        </Panel>
        <Panel show={selectedTabIndex === 2}>
          <TerminalOutput
            content={result.status === "exited" ? result.stdout : ""}
          />
        </Panel>
        <Panel show={selectedTabIndex === 3}>
          <TerminalOutput
            content={result.status === "exited" ? result.stderr : ""}
          />
        </Panel>
        <Panel show={selectedTabIndex === 4}>
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
          visibility: collapse;
        `
      : ""}
`;
