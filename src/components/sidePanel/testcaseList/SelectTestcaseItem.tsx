import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { PuffLoader } from "react-spinners";
import { useRecoilValue } from "recoil";

import { getResultColor, getResultDescription } from "@/components/common/renderResultUtil";
import { testcaseFamily } from "@/states/testcase";
import { TestcaseResult, testcaseResultFamily } from "@/states/testcaseResult";
import { color } from "@/styles/color";

interface SelectTestcaseItemProps {
  inputId: string;
  selected?: boolean;
  onClick(): void;
}

const SelectTestcaseItem: FC<SelectTestcaseItemProps> = ({ inputId, selected = false, onClick }) => {
  const { name } = useRecoilValue(testcaseFamily(inputId));
  const status = useRecoilValue(testcaseResultFamily(inputId));

  return (
    <StyledItem selected={selected} onClick={onClick}>
      {status === "running" ? <PuffLoader size="10px" color={getResultColor("running")} /> : <Dot status={status} />}

      <Name selected={selected}>{name !== "" ? name : "이름 없음"}</Name>
      <StatusMessage status={status}>{getResultDescription(status) ?? status}</StatusMessage>
    </StyledItem>
  );
};

export default SelectTestcaseItem;

const StyledItem = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 10px minmax(16px, 1fr) max-content;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  justify-self: normal;

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
    color: ${getResultColor(props.status)};
  `}
`;

const Dot = styled.span<{ status: TestcaseResult }>`
  height: 8px;
  width: 8px;

  border-radius: 50%;

  ${(props) => css`
    background-color: ${getResultColor(props.status)};
  `}
`;
