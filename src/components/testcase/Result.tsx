import styled from "@emotion/styled";
import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";

import { executeStatusFamily } from "@/states/executeStatus";

import TerminalOutput from "./TerminalOutput";

interface ResultProps {
  testcaseId: string;
}

const Result: FC<ResultProps> = ({ testcaseId }) => {
  const executeStatus = useRecoilValue(executeStatusFamily(testcaseId));

  const message = useMemo(() => {
    if (executeStatus.status === "exited") {
      const exitCodeString = `\n<프로그램이 종료되었습니다. Exit Code: ${executeStatus.exitCode}>`;

      return `${executeStatus.stdout}${executeStatus.stderr}${exitCodeString}`;
    }

    return "";
  }, [executeStatus, testcaseId]);

  return (
    <StyledResultPanel>
      <TerminalOutput content={message} />
    </StyledResultPanel>
  );
};

export default Result;

const StyledResultPanel = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-top: 5px;

  background-color: black;
`;
