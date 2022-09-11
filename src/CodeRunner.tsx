import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseRunner from "./commands/useTestcaseRunner";
import AppLayout from "./components/AppLayout";
import SelectTestcaseMenu from "./components/selectTestcase/SelectTestcaseMenu";
import ChooseExecuteTarget from "./components/sidePanel/ChooseExecuteTarget";
import PanelFrame from "./components/sidePanel/PanelFrame";
import TestcasePanel from "./components/testcase/TestcasePanel";
import { selectedTestcaseIdAtom } from "./states/selectedTestcase";

const CodeRunner: FC = () => {
  const selectedTestcaseId = useRecoilValue(selectedTestcaseIdAtom);
  const runner = useTestcaseRunner();

  return (
    <AppLayout
      leftPanel={
        <>
          <PanelFrame title="실행 대상">
            <ChooseExecuteTarget />
          </PanelFrame>
          <PanelFrame title="작업">
            <Button size="sm" onClick={runner.runAll}>
              Run
            </Button>
          </PanelFrame>
          <PanelFrame title="테스트 케이스">
            <SelectTestcaseMenu />
          </PanelFrame>
        </>
      }
      content={
        <>
          {selectedTestcaseId ? (
            <TestcasePanel testcaseId={selectedTestcaseId} />
          ) : null}
        </>
      }
    />
  );
};

export default CodeRunner;
