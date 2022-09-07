import { Button, FileInput, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  testcaseFamily,
  TestcaseInput,
  TestcaseInputType,
} from "./state/testcase";

const modes: Array<{ type: TestcaseInputType; text: string }> = [
  { type: "plainText", text: "Plain Text" },
  { type: "file", text: "File" },
];

interface StdinInputProps {
  inputId: string;
}

const StdinInput: FC<StdinInputProps> = ({ inputId }) => {
  const [stdinValue, setStdinValue] = useRecoilState(testcaseFamily(inputId));

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
    setStdinValue((prev) => ({
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
      [stdinValue.input.type]: stdinValue.input,
    }));
  }, [stdinValue]);

  return (
    <StyledInputSelector>
      <HTMLSelect
        value={stdinValue.input.type}
        onChange={(e) => handleTypeChange(modes[e.target.selectedIndex].type)}
      >
        {modes.map((mode) => (
          <option key={mode.type} value={mode.type}>
            {mode.text}
          </option>
        ))}
      </HTMLSelect>
      <Button onClick={handleRemove}>Remove</Button>
      {stdinValue.input.type === "plainText" && (
        <ReactCodeMirror
          value={stdinValue.input.text}
          height="200px"
          onChange={(value) => handlePlainTextChange(value)}
        />
      )}
      {stdinValue.input.type === "file" && (
        <FileInput onInputChange={handleFileChange} />
      )}
    </StyledInputSelector>
  );
};

export default StdinInput;

const StyledInputSelector = styled.div``;
