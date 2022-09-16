import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC } from "react";

import { TestcaseAnswer } from "@/states/testcase";

interface AnswerEditorProps {
  value: TestcaseAnswer;
  onChange(newVal: TestcaseAnswer): void;
}

const AnswerEditor: FC<AnswerEditorProps> = ({ value, onChange }) => {
  const updateData = (data: TestcaseAnswer) => {
    onChange(data);
  };

  const handlePlainTextChange = (value: string) => {
    updateData({
      type: "plainText",
      text: value,
    });
  };

  return (
    <StyledAnswerEditor>
      {value.type === "plainText" && (
        <ReactCodeMirror
          value={value.text}
          onChange={(value) => handlePlainTextChange(value)}
        />
      )}
    </StyledAnswerEditor>
  );
};

export default AnswerEditor;

const StyledAnswerEditor = styled.div`
  height: 100%;
  width: 100%;

  & > * {
    height: 100%;
  }

  & .cm-editor {
    height: 100%;
  }
  & .cm-scroller {
    overflow: auto;
  }
`;
