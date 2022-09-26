import { useRecoilCallback } from "recoil";

import { downloadTextFile } from "@/lib/file";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

interface ExportStructure {
  version: `${number}.${number}.${number}`;
  testcases: Array<{
    type: "plainText";
    input: string;
    answer: string;
  }>;
}

export const useExport = () => {
  const downloadPacked = useRecoilCallback(({ snapshot }) => async () => {
    const ids = await snapshot.getPromise(testcaseIdsAtom);

    const testcases: ExportStructure["testcases"] = [];
    for (const id of ids) {
      const testcase = await snapshot.getPromise(testcaseFamily(id));
      if (testcase.answer.type !== "plainText") {
        continue;
      }

      testcases.push({
        type: "plainText",
        input: testcase.input.text,
        answer: testcase.answer.text,
      });
    }

    const data: ExportStructure = {
      version: "0.1.0",
      testcases,
    };

    downloadTextFile(JSON.stringify(data), "testcases.json");
  });

  return {
    downloadPacked,
  };
};

export default useExport;
