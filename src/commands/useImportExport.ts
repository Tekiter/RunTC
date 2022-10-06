import to from "await-to-js";
import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";
import { z } from "zod";

import { downloadTextFile, openTextFile } from "@/lib/file";
import { testcaseFamily, testcaseIdsAtom } from "@/states/testcase";

const TYPE_STRING = "RunTCTestcase";

const testcaseFileValidator = z.object({
  type: z.literal(TYPE_STRING),
  version: z.literal(1),
  testcases: z.array(
    z.object({
      name: z.string(),
      type: z.literal("plainText"),
      input: z.string(),
      answer: z.string(),
    }),
  ),
});

type TestcaseFile = z.infer<typeof testcaseFileValidator>;

export const useImportExport = () => {
  const showInvalidMessage = (message: string) => {
    alert(message);
  };

  const downloadPacked = useRecoilCallback(({ snapshot }) => async () => {
    const ids = await snapshot.getPromise(testcaseIdsAtom);

    const testcases: TestcaseFile["testcases"] = [];
    for (const id of ids) {
      const testcase = await snapshot.getPromise(testcaseFamily(id));
      if (testcase.answer.type !== "plainText") {
        continue;
      }

      testcases.push({
        type: "plainText",
        name: testcase.name,
        input: testcase.input.text,
        answer: testcase.answer.text,
      });
    }

    const data: TestcaseFile = {
      type: "RunTCTestcase",
      version: 1,
      testcases,
    };

    const [err] = await to(downloadTextFile(JSON.stringify(data), "testcases"));

    if (err) {
      showInvalidMessage("테스트케이스 파일 열기에 실패했습니다.");
    }
  });

  const importPacked = useRecoilCallback(({ set }) => async () => {
    const [err, data] = await to(openTextFile());

    if (data === null) {
      return;
    }

    if (err) {
      showInvalidMessage("테스트케이스 파일 열기에 실패했습니다.");
      return;
    }

    const json = jsonParseSafe(data ?? "") as unknown;

    if (!isSignitureValid(json)) {
      showInvalidMessage("올바르지 않은 테스트케이스 파일입니다.");
      return;
    }

    if (getVersion(json) !== 1) {
      showInvalidMessage("해당 테스트케이스 파일을 열려면 업데이트가 필요합니다.");
    }

    const parsed = testcaseFileValidator.safeParse(json);

    if (!parsed.success) {
      showInvalidMessage("올바르지 않은 테스트케이스 파일입니다.");
      return;
    }

    const { testcases } = parsed.data;

    for (const testcase of testcases) {
      const id = nanoid();
      set(testcaseFamily(id), {
        id,
        name: testcase.name,
        input: {
          type: "plainText",
          text: testcase.input,
        },
        answer: {
          type: "plainText",
          text: testcase.answer,
        },
      });
    }
  });

  return {
    downloadPacked,
    importPacked,
  };
};

export default useImportExport;

function jsonParseSafe(data: string) {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function isSignitureValid(data: unknown) {
  return (data as { type: string }).type === TYPE_STRING;
}

function getVersion(data: unknown) {
  const { version } = data as { version: number };

  if (isNaN(version) || version <= 0) {
    return null;
  }

  return version;
}
