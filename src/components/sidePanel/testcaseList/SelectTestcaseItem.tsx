import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { testcaseFamily } from "@/states/testcase";
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

  return (
    <StyledItem selected={selected} onClick={onClick}>
      <Name selected={selected}>{name !== "" ? name : "이름 없음"}</Name>
    </StyledItem>
  );
};

export default SelectTestcaseItem;

const StyledItem = styled.div<{ selected: boolean }>`
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
  ${(props) =>
    props.selected
      ? css`
          font-weight: 500;
        `
      : ""}
`;
