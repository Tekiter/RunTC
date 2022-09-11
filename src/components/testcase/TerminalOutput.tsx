import styled from "@emotion/styled";
import { FC, useCallback, useEffect, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

interface OutputProps {
  content: string;
}

const TerminalOutput: FC<OutputProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal>();
  const fitAddonRef = useRef<FitAddon>();

  const handleResize = useCallback(() => {
    fitAddonRef.current?.fit();
  }, []);

  useResizeDetector({ targetRef: containerRef, onResize: handleResize });

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

    requestAnimationFrame(handleResize);

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
      <div ref={containerRef} />
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
