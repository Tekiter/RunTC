import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseCommand from "@/commands/useTestcaseCommand";
import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { testcaseFamily, TestcaseID } from "@/states/testcase";

import AnswerEditor from "./AnswerEditor";
import InputEditor from "./InputEditor";
import Result from "./Result";
import TestcaseInfo from "./TestcaseInfo";

interface TestcasePanelProps {
  testcaseId: TestcaseID;
}

const TestcasePanel: FC<TestcasePanelProps> = ({ testcaseId }) => {
  const testcaseCommand = useTestcaseCommand();
  const runner = useTestcaseRunner();
  const testcase = useRecoilValue(testcaseFamily(testcaseId));

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabs = useMemo(
    () => [
      {
        title: "입력",
        content: (
          <InputEditor
            value={testcase.input}
            onChange={(input) => testcaseCommand.changeValue(testcaseId, { input })}
            onKeyDown={() => runner.makeIdle(testcaseId)}
          />
        ),
      },
      {
        title: "정답",
        content: (
          <AnswerEditor
            value={testcase.answer}
            onChange={(answer) => testcaseCommand.changeValue(testcaseId, { answer })}
          />
        ),
      },
      {
        title: "출력결과",
        content: <Result testcaseId={testcaseId} />,
      },
    ],
    [testcaseId, testcase],
  );

  return (
    <StyledTestcasePanel>
      <HeaderArea>
        <TestcaseInfo testcaseId={testcaseId} />
      </HeaderArea>
      <TabArea>
        <Tabs onChange={setSelectedTabIndex}>
          <TabList>
            {tabs.map(({ title }) => (
              <Tab key={title}>{title}</Tab>
            ))}
          </TabList>
        </Tabs>
      </TabArea>
      <ContentArea>
        {tabs.map(({ title, content }, idx) => (
          <Panel key={title} show={selectedTabIndex === idx}>
            {content}
          </Panel>
        ))}
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
