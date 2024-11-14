import { progressAtom } from "atoms/userAtoms";
import { useAtom } from "jotai";

export const Final = () => {
  const [, setStep] = useAtom(progressAtom); // 진행도

  const handlePrev = () => {
    setStep(2);
  };
  return (
    <>
      <div>Final</div>
      <button onClick={handlePrev}>이전으로</button>
    </>
  );
};
