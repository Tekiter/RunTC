import { FC } from "react";
import { useRecoilValue } from "recoil";

import AppLayout from "@/components/AppLayout";
import ChooseExecuteTarget from "@/components/sidePanel/ChooseExecuteTarget";
import PanelFrame from "@/components/sidePanel/PanelFrame";
import SelectTestcaseMenu from "@/components/sidePanel/testcaseList/SelectTestcaseMenu";
import TestcasePanel from "@/components/testcase/TestcasePanel";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";

const CodeRunner: FC = () => {
  const selectedTestcaseId = useRecoilValue(selectedTestcaseIdAtom);

  return (
    <AppLayout
      leftPanel={
        <>
          <PanelFrame title="실행 대상">
            <ChooseExecuteTarget />
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
