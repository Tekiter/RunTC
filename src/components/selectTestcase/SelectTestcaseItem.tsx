import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { testcaseFamily } from "@/state/testcase";

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
  const { name, input: data } = useRecoilValue(testcaseFamily(inputId));

  return (
    <StyledItem selected={selected} onClick={onClick}>
      <h2>{name}</h2>

      <>{JSON.stringify(data)}</>
    </StyledItem>
  );
};

export default SelectTestcaseItem;

const StyledItem = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "gray" : "transparent")};
`;
