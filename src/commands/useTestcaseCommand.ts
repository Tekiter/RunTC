import { nanoid } from "nanoid";
import { useRecoilCallback, useRecoilState } from "recoil";

import { selectedTestcaseIdAtom } from "@/states/selectedTestcase";
import { Testcase, testcaseFamily, testcaseIdsAtom, testcaseSerialCounterAtom } from "@/states/testcase";

const useTestcaseCommand = () => {
  const [serialCounter, setSerialCounter] = useRecoilState(testcaseSerialCounterAtom);

  const add = useRecoilCallback(({ set }) => () => {
    const id = nanoid();
    set(testcaseFamily(id), {
      id,
      name: `테스트 케이스 ${serialCounter}`,
      input: { type: "plainText" as const, text: "" },
      answer: { type: "plainText" as const, text: "" },
    });
    set(selectedTestcaseIdAtom, id);
    setSerialCounter((val) => val + 1);
  });

  const remove = useRecoilCallback(({ reset, set, snapshot }) => async (id: string) => {
    const cases = (await snapshot.getPromise(testcaseIdsAtom)).slice();
    reset(testcaseFamily(id));

    if (cases.length === 1) {
      set(selectedTestcaseIdAtom, null);
      return;
    }

    const index = cases.indexOf(id);

    if (index + 1 < cases.length) {
      set(selectedTestcaseIdAtom, cases[index + 1]);
    } else {
      set(selectedTestcaseIdAtom, cases[index - 1]);
    }
  });

  const changeValue = useRecoilCallback(({ set }) => (id: string, value: Partial<Testcase>) => {
    set(testcaseFamily(id), (prev) => ({ ...prev, ...value }));
  });

  const select = useRecoilCallback(({ set }) => (id: string) => {
    set(selectedTestcaseIdAtom, id);
  });

  return {
    add,
    remove,
    select,
    changeValue,
  };
};

export default useTestcaseCommand;
