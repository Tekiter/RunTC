import styled from "@emotion/styled";
import { FC } from "react";
import { MdPlayArrow, MdStop } from "react-icons/md";
import { RingLoader } from "react-spinners";
import { useRecoilValue } from "recoil";

import useTestcaseRunner from "@/commands/useTestcaseRunner";
import { isRunningSelector } from "@/states/executeStatus";
import { testcaseIdsAtom } from "@/states/testcase";

import MenuButton from "./common/MenuButton";

const Action: FC = () => {
  const testcaseIds = useRecoilValue(testcaseIdsAtom);
  const isRunning = useRecoilValue(isRunningSelector);
  const runner = useTestcaseRunner();

  return (
    <StyledAction>
      {isRunning ? (
        <MenuButton icon={<RingLoader size="10px" />} disabled>
          실행중...
        </MenuButton>
      ) : (
        <MenuButton
          icon={<MdPlayArrow />}
          disabled={testcaseIds.length === 0 || isRunning}
          onClick={runner.runAll}
        >
          모두 실행
        </MenuButton>
      )}

      <MenuButton
        icon={<MdStop />}
        disabled={!isRunning}
        onClick={runner.stopAll}
      >
        실행 중단
      </MenuButton>
    </StyledAction>
  );
};

export default Action;

const StyledAction = styled.div`
  margin-bottom: 10px;
`;
