import { nanoid } from "nanoid";

const useSerial = () => {
  return {
    getSerial() {
      return nanoid();
    },
  };
};

export default useSerial;
