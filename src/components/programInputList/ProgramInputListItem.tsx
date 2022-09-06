import { EditableText } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { stdinInput } from "@/state/stdinInput";

interface ProgramInputListItemProps {
  inputId: string;
  selected?: boolean;
  onClick(): void;
}

const ProgramInputListItem: FC<ProgramInputListItemProps> = ({
  inputId,
  selected = false,
  onClick,
}) => {
  const { name, data } = useRecoilValue(stdinInput(inputId));
  const setInputValue = useSetRecoilState(stdinInput(inputId));

  return (
    <StyledProgramInputListItem selected={selected} onClick={onClick}>
      <EditableText
        value={name}
        onChange={(val) => setInputValue((prev) => ({ ...prev, name: val }))}
      ></EditableText>

      <>{JSON.stringify(data)}</>
    </StyledProgramInputListItem>
  );
};

export default ProgramInputListItem;

const StyledProgramInputListItem = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "gray" : "transparent")};
`;
