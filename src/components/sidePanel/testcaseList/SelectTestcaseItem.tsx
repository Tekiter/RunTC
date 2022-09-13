import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { testcaseFamily } from "@/states/testcase";
import { TestcaseResult, testcaseResultFamily } from "@/states/testcaseResult";
import { color } from "@/styles/color";

interface SelectTestcaseItemProps {
  inputId: string;
  selected?: boolean;
  onClick(): void;
}

const SelectTestcaseItem: FC<SelectTestcaseItemProps> = ({
  inputId,
  selected = false,
  onClick,
}) => {
  const { name } = useRecoilValue(testcaseFamily(inputId));
  const status = useRecoilValue(testcaseResultFamily(inputId));

  return (
    <StyledItem selected={selected} onClick={onClick}>
      <Dot status={status} />
      <Name selected={selected}>{name !== "" ? name : "이름 없음"}</Name>
      <StatusMessage status={status}>
        {statusDescriptionMap[status] ?? status}
      </StatusMessage>
    </StyledItem>
  );
};

export default SelectTestcaseItem;

const statusColorMap: Record<TestcaseResult[number], string> = {
  idle: "#bbbbbb",
  running: "black",
  AC: "#20b941",
  WA: "#921515",
  TLE: "#921515",
  RE: "#143168",
};

const statusDescriptionMap: Record<TestcaseResult[number], string> = {
  idle: "",
  running: "실행중",
  AC: "맞았습니다",
  WA: "틀렸습니다",
  TLE: "시간초과",
  RE: "런타임에러",
};

const StyledItem = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: auto max-content minmax(16px, 1fr);
  align-items: center;

  cursor: pointer;
  border-radius: 6px;
  margin: 0 10px;
  padding: 10px 15px;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${color.values.selectedBackground};
    `};

  &:hover {
    background-color: ${color.values.hoverBackground};
  }
`;

const Name = styled.h2<{ selected: boolean }>`
  padding-left: 8px;
  ${(props) =>
    props.selected
      ? css`
          font-weight: 500;
        `
      : ""}
`;

const StatusMessage = styled.div<{ status: TestcaseResult }>`
  justify-self: flex-end;
  font-size: 0.85em;

  ${(props) => css`
    color: ${statusColorMap[props.status]};
  `}
`;

const Dot = styled.span<{ status: TestcaseResult }>`
  height: 8px;
  width: 8px;

  border-radius: 50%;
  display: inline-block;

  ${(props) => css`
    background-color: ${statusColorMap[props.status]};
  `}
`;
