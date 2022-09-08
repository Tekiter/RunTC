import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import useTestcaseRunner from "./commands/useTestcaseRunner";
import AppLayout from "./components/AppLayout";
import ChooseExecuteTarget from "./components/executeTarget/ChooseExecuteTarget";
import SelectTestcaseMenu from "./components/selectTestcase/SelectTestcaseMenu";
import PanelFrame from "./components/sidePanel/PanelFrame";
import TestcasePanel from "./components/sidePanel/TestcasePanel";
import { selectedTestcaseIdAtom } from "./state/selectedTestcase";

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
            <Button onClick={runner.runAll}>Run</Button>
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
