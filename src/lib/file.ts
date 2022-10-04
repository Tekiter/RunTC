import { dialog } from "@electron/remote";
import { readFile, writeFile } from "fs/promises";

export async function downloadTextFile(str: string, filename: string) {
  const { filePath } = await dialog.showSaveDialog({
    title: "테스트케이스 파일 저장",
    filters: [{ name: "RunTC 테스트케이스", extensions: ["runtc"] }],
    properties: ["createDirectory"],
    defaultPath: filename,
  });

  if (!filePath) {
    return null;
  }

  await writeFile(filePath, Buffer.from(str, "utf-8"));
}

export async function openTextFile() {
  const { filePaths } = await dialog.showOpenDialog({
    title: "테스트케이스 파일 선택",
    filters: [
      { name: "RunTC 테스트케이스", extensions: ["runtc"] },
      { name: "모든 파일", extensions: ["*"] },
    ],
    properties: ["openFile"],
  });

  if (filePaths.length !== 1) {
    return null;
  }

  const [path] = filePaths;

  const buffer = await readFile(path);
  const data = buffer.toString("utf-8");

  return data;
}
