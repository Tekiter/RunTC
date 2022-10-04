import { createContext, FC, FormEventHandler, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

interface FileDialogHandler {
  showOpenFileDialog(): Promise<string[]>;
}

export const FileDialogContext = createContext<FileDialogHandler>({
  async showOpenFileDialog() {
    return [];
  },
});

export const FileDialogProvider: FC<{ children: ReactNode }> = (props) => {
  const resolverRef = useRef<(paths: string[]) => void>();

  const handler: FileDialogHandler = {
    showOpenFileDialog() {
      return new Promise((resolve) => {
        resolverRef.current = resolve;
      });
    },
  };

  const handleSelect = (files: File[]) => {
    const resolve = resolverRef.current;

    resolve?.(files.map((file) => file.path));
  };

  return (
    <FileDialogContext.Provider value={handler}>
      {props.children}
      <HiddenFileInput onSelect={handleSelect} />
    </FileDialogContext.Provider>
  );
};

interface HiddenFileInputProps {
  onSelect(files: File[]): void;
}

const HiddenFileInput: FC<HiddenFileInputProps> = ({ onSelect }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileInput: FormEventHandler<HTMLInputElement> = (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const files = [...(e.target.files ?? [])];

    onSelect?.(files);
  };

  return createPortal(
    <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFileInput} />,
    document.body,
  );
};
