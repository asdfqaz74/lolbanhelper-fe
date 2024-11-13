import { progressAtom } from "atoms/userAtoms";
import { useAtom } from "jotai";

export const PickTeamLeader = () => {
  const [, setStep] = useAtom(progressAtom);

  const handlePrev = () => {
    setStep(0);
  };

  return (
    <div className="mt-10 flex flex-col items-center w-[50rem]">
      <p>Pick Team Leader</p>
      <button onClick={handlePrev}>이전</button>
    </div>
  );
};
