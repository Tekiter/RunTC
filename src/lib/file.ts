export async function downloadTextFile(str: string, filename: string) {
  const file = new Blob([str], { type: "text/plain" });
  const a = document.createElement("a");

  const url = URL.createObjectURL(file);
  a.setAttribute("href", url);
  a.setAttribute("download", filename);

  a.click();

  document.body.removeChild(a);
}
