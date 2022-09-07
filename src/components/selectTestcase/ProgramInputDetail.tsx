import { Button, FileInput, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  testcaseFamily,
  TestcaseInput,
  TestcaseInputType,
} from "@/state/testcase";

interface ProgramInputDetailProps {
  inputId: string;
}

const modes: Array<{ type: TestcaseInputType; text: string }> = [
  { type: "plainText", text: "Plain Text" },
  { type: "file", text: "File" },
];

const ProgramInputDetail: FC<ProgramInputDetailProps> = ({ inputId }) => {
  const [testcase, setTestcase] = useRecoilState(testcaseFamily(inputId));

  const [defaultData, setDefaultData] = useState<
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
    setTestcase((prev) => ({
      id: prev.id,
      name: prev.name,
      input: data,
    }));
  };

  const handleTypeChange = (type: TestcaseInputType) => {
    updateData(defaultData[type]);
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

  const reset = useResetRecoilState(testcaseFamily(inputId));
  const handleRemove = () => {
    reset();
  };

  useEffect(() => {
    setDefaultData((prev) => ({
      ...prev,
      [testcase.input.type]: testcase.input,
    }));
  }, [testcase]);

  return (
    <StyledProgramInput>
      <HTMLSelect
        value={testcase.input.type}
        onChange={(e) => handleTypeChange(modes[e.target.selectedIndex].type)}
      >
        {modes.map((mode) => (
          <option key={mode.type} value={mode.type}>
            {mode.text}
          </option>
        ))}
      </HTMLSelect>
      <Button onClick={handleRemove}>Remove</Button>
      {testcase.input.type === "plainText" && (
        <ReactCodeMirror
          value={testcase.input.text}
          height="200px"
          onChange={(value) => handlePlainTextChange(value)}
        />
      )}
      {testcase.input.type === "file" && (
        <FileInput onInputChange={handleFileChange} />
      )}
    </StyledProgramInput>
  );
};

export default ProgramInputDetail;

const StyledProgramInput = styled.div``;
