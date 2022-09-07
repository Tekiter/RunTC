import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import ChooseExecuteTarget from "./ChooseExecuteTarget";
import AppLayout from "./components/AppLayout";
import SelectTestcaseMenu from "./components/selectTestcase/SelectTestcaseMenu";
import PanelFrame from "./components/sidePanel/PanelFrame";
import TestcasePanel from "./components/testcase/TestcasePanel";
import { selectedTestcaseIdAtom } from "./state/selectedTestcase";

const CodeRunner: FC = () => {
  const selectedTestcaseId = useRecoilValue(selectedTestcaseIdAtom);

  return (
    <AppLayout
      leftPanel={
        <>
          <PanelFrame title="실행 대상">
            <ChooseExecuteTarget />
          </PanelFrame>
          <PanelFrame title="작업">
            <Button>Run</Button>
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
