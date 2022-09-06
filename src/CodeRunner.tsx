import { Button } from "@blueprintjs/core";
import { FC } from "react";

import ChooseExecuteTarget from "./ChooseExecuteTarget";
import AppLayout from "./components/AppLayout";
import ProgramInputList from "./components/programInputList/ProgramInputList";
import PanelFrame from "./components/sidePanel/PanelFrame";
import StaticOutput from "./StaticOutput";
import StdinList from "./StdinList";

const CodeRunner: FC = () => {
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
          <StdinList />
          <StaticOutput text={"asdf"} />
        </>
      }
    />
  );
};

export default CodeRunner;
