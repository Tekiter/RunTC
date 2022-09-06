import "xterm/css/xterm.css";

import styled from "@emotion/styled";
import { FC, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

interface OutputProps {
  text: string;
}

const StaticOutput: FC<OutputProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal>();

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
    term.write(text);
    // // Partial escape
    // term.write("\x1b");
    // // First \n will cancel any existing escape or go to new line
    // // Then the \n\r will put the cursor at the start of the next line
    // term.write("\n\n\r");
  }, [text]);

  return <StyledOutput ref={containerRef}></StyledOutput>;
};

export default StaticOutput;

const StyledOutput = styled.div`
  width: 30%;
`;
