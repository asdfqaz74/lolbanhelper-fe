import { progressAtom } from "atoms/userAtoms";
import { useUserDatas } from "hooks/Data";
import { useAtom } from "jotai";
import { BasePaper } from "pickToolV2/BasePaper";
import { ProgressBar } from "pickToolV2/ProgressBar";

const PickPlayers = () => {
  useUserDatas();
  const [step] = useAtom(progressAtom);

  return (
    <div className="md:mx-auto my-14 h-screen flex flex-col items-center">
      <ProgressBar currentStep={step} />
      <BasePaper currentStep={step} />
    </div>
  );
};

export default PickPlayers;
