import { FC } from "react";
import { useRecoilValue } from "recoil";

import AppLayout from "@/components/AppLayout";
import ExecuteTarget from "@/components/sidePanel/ExecuteTarget";
import SelectTestcaseMenu from "@/components/sidePanel/testcaseList/SelectTestcaseMenu";
import TestcasePanel from "@/components/testcase/TestcasePanel";
import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";

import Action from "./components/sidePanel/Action";
import TestcaseWorker from "./components/worker/TestcaseWorker";

const CodeRunner: FC = () => {
  const selectedTestcaseId = useRecoilValue(selectedTestcaseIdAtom);

  return (
    <>
      <TestcaseWorker />
      <AppLayout
        leftPanel={
          <>
            <ExecuteTarget />
            <Action />
            <SelectTestcaseMenu />
          </>
        }
        content={<>{selectedTestcaseId ? <TestcasePanel testcaseId={selectedTestcaseId} /> : null}</>}
      />
    </>
  );
};

export default CodeRunner;
