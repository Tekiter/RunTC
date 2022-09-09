import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC } from "react";

import { TestcaseInput } from "@/states/testcase";

interface InputEditorProps {
  value: TestcaseInput;
  onChange(newVal: TestcaseInput): void;
}

const InputEditor: FC<InputEditorProps> = ({ value, onChange }) => {
  const updateData = (data: TestcaseInput) => {
    onChange(data);
  };

  const handlePlainTextChange = (value: string) => {
    updateData({
      type: "plainText",
      text: value,
    });
  };

  return (
    <StyledInputEditor>
      <ReactCodeMirror
        value={value.text}
        height="100%"
        onChange={(value) => handlePlainTextChange(value)}
      />
    </StyledInputEditor>
  );
};

export default InputEditor;

const StyledInputEditor = styled.div``;
