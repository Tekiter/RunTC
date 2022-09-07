import { Button, FileInput, HTMLSelect } from "@blueprintjs/core";
import styled from "@emotion/styled";
import ReactCodeMirror from "@uiw/react-codemirror";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { stdinInput, StdinInputData, StdinInputType } from "@/state/stdinInput";

interface ProgramInputDetailProps {
  inputId: string;
}

const modes: Array<{ type: StdinInputType; text: string }> = [
  { type: "plainText", text: "Plain Text" },
  { type: "file", text: "File" },
];

const ProgramInputDetail: FC<ProgramInputDetailProps> = ({ inputId }) => {
  const [stdinValue, setStdinValue] = useRecoilState(stdinInput(inputId));

  const [defaultData, setDefaultData] = useState<
    Record<StdinInputType, StdinInputData>
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

  const updateData = (data: StdinInputData) => {
    setStdinValue((prev) => ({
      id: prev.id,
      name: prev.name,
      data: data,
    }));
  };

  const handleTypeChange = (type: StdinInputType) => {
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

  const reset = useResetRecoilState(stdinInput(inputId));
  const handleRemove = () => {
    reset();
  };

  useEffect(() => {
    setDefaultData((prev) => ({
      ...prev,
      [stdinValue.data.type]: stdinValue.data,
    }));
  }, [stdinValue]);

  return (
    <StyledProgramInput>
      <HTMLSelect
        value={stdinValue.data.type}
        onChange={(e) => handleTypeChange(modes[e.target.selectedIndex].type)}
      >
        {modes.map((mode) => (
          <option key={mode.type} value={mode.type}>
            {mode.text}
          </option>
        ))}
      </HTMLSelect>
      <Button onClick={handleRemove}>Remove</Button>
      {stdinValue.data.type === "plainText" && (
        <ReactCodeMirror
          value={stdinValue.data.text}
          height="200px"
          onChange={(value) => handlePlainTextChange(value)}
        />
      )}
      {stdinValue.data.type === "file" && (
        <FileInput onInputChange={handleFileChange} />
      )}
    </StyledProgramInput>
  );
};

export default ProgramInputDetail;

const StyledProgramInput = styled.div``;
