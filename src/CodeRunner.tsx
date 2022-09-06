import { Button, FileInput } from "@blueprintjs/core";
import { spawn } from "child_process";
import { FC, FormEventHandler, useState } from "react";

import StaticOutput from "./StaticOutput";
import StdinList from "./StdinList";

const CodeRunner: FC = () => {
  const x = "hello world! \n\r";

  const [path, setPath] = useState<string>();
  const [stdin, setStdin] = useState("");

  const handleFileInput: FormEventHandler<HTMLInputElement> = (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setPath(file.path);
  };

  const exec = () => {
    if (!path) {
      return;
    }

    try {
      const ls = spawn(path, [], {});

      ls.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
      });

      ls.on("close", (code) => {
        console.log("Exited", code);
      });

      ls.on("error", (err) => {
        console.log(`Something is wrong: ${err}`);
      });

      ls.stdin.cork();
      ls.stdin.write(stdin + "\n");
      ls.stdin.uncork();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <FileInput onInputChange={handleFileInput} />
      <p>{path}</p>
      <Button onClick={exec}>Run</Button>

      <StdinList />
      <textarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
      ></textarea>
      <StaticOutput text={x} />
    </>
  );
};

export default CodeRunner;
