import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import ChooseExecuteTarget from "./ChooseExecuteTarget";
import AppLayout from "./components/AppLayout";
import ProgramInputDetail from "./components/selectTestcase/ProgramInputDetail";
import SelectTestcaseMenu from "./components/selectTestcase/SelectTestcaseMenu";
import PanelFrame from "./components/sidePanel/PanelFrame";
import { selectedTestcaseKeyAtom } from "./state/selectedTestcase";
import StaticOutput from "./StaticOutput";

const CodeRunner: FC = () => {
  const selectedInputKey = useRecoilValue(selectedTestcaseKeyAtom);

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
          {selectedInputKey ? (
            <ProgramInputDetail inputId={selectedInputKey} />
          ) : null}

          <StaticOutput text={"asdf"} />
        </>
      }
    />
  );
};

export default CodeRunner;
