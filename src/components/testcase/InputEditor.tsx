import { FileInput, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC, FormEventHandler, useEffect, useState } from "react";

import { TestcaseInput, TestcaseInputType } from "@/states/testcase";

interface InputEditorProps {
  value: TestcaseInput;
  onChange(newVal: TestcaseInput): void;
}

const modes: Array<{ type: TestcaseInputType; text: string }> = [
  { type: "plainText", text: "Plain Text" },
  { type: "file", text: "File" },
];

const InputEditor: FC<InputEditorProps> = ({ value, onChange }) => {
  const [inputToChange, setInputToChange] = useState<
    Record<TestcaseInputType, TestcaseInput>
  >({
    plainText: {
      type: "plainText",
      text: "",
    },
    file: {
      type: "file",
      path: null,
    },
  });

  const updateData = (data: TestcaseInput) => {
    onChange(data);
  };

  const handleTypeChange = (type: TestcaseInputType) => {
    updateData(inputToChange[type]);
  };

  const handlePlainTextChange = (value: string) => {
    updateData({
      type: "plainText",
      text: value,
    });
  };

  const handleFileChange: FormEventHandler<HTMLInputElement> = (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    updateData({
      type: "file",
      path: file.path,
    });
  };

  useEffect(() => {
    setInputToChange((prev) => ({
      ...prev,
      [value.type]: value,
    }));
  }, [value]);

  return (
    <StyledProgramInput>
      <HTMLSelect
        value={value.type}
        onChange={(e) => handleTypeChange(modes[e.target.selectedIndex].type)}
      >
        {modes.map((mode) => (
          <option key={mode.type} value={mode.type}>
            {mode.text}
          </option>
        ))}
      </HTMLSelect>
      {value.type === "plainText" && (
        <ReactCodeMirror
          value={value.text}
          height="200px"
          onChange={(value) => handlePlainTextChange(value)}
        />
      )}
      {value.type === "file" && <FileInput onInputChange={handleFileChange} />}
    </StyledProgramInput>
  );
};

export default InputEditor;

const StyledProgramInput = styled.div``;
