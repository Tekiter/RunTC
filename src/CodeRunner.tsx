import { Button } from "@blueprintjs/core";
import { FC } from "react";

import ChooseExecuteTarget from "./ChooseExecuteTarget";
import StaticOutput from "./StaticOutput";
import StdinList from "./StdinList";

const CodeRunner: FC = () => {
  return (
    <>
      <ChooseExecuteTarget />

      <Button>Run</Button>

      <StdinList />
      <StaticOutput text={"asdf"} />
    </>
  );
};

export default CodeRunner;
