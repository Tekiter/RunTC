import "xterm/css/xterm.css";

import { ResizeSensor } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { FC, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

interface OutputProps {
  content: string;
}

const TerminalOutput: FC<OutputProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal>();
  const fitAddonRef = useRef<FitAddon>();

  const handleResize = () => {
    fitAddonRef.current?.fit();
  };

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error("Output container not set.");
    }

    const term = new Terminal({
      fontFamily: "consolas",
    });
    const fitAddon = new FitAddon();

    term.open(containerRef.current);
    term.loadAddon(fitAddon);

    terminalRef.current = term;
    fitAddonRef.current = fitAddon;

    fitAddon.fit();

    return () => {
      term.dispose();
      terminalRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    const term = terminalRef.current;

    if (!term) {
      return;
    }

    term.reset();
    term.write(content);
  }, [content]);

  return (
    <StyledOutput>
      <ResizeSensor onResize={handleResize}>
        <div ref={containerRef} />
      </ResizeSensor>
    </StyledOutput>
  );
};

export default TerminalOutput;

const StyledOutput = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    width: 100%;
    height: 100%;
  }
`;
