import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import ChooseExecuteTarget from "./ChooseExecuteTarget";
import AppLayout from "./components/AppLayout";
import ProgramInputDetail from "./components/programInput/ProgramInputDetail";
import ProgramInputList from "./components/programInput/ProgramInputList";
import PanelFrame from "./components/sidePanel/PanelFrame";
import { selectedInputKeyAtom } from "./state/selectedProgramInput";
import StaticOutput from "./StaticOutput";

const CodeRunner: FC = () => {
  const selectedInputKey = useRecoilValue(selectedInputKeyAtom);

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
            <ProgramInputList />
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
