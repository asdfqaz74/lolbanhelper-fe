import { useUserDatas } from "hooks/Data";
import { BasePaper } from "pickToolV2/BasePaper";
import { ProgressBar } from "pickToolV2/ProgressBar";

const PickPlayers = () => {
  const userList = useUserDatas();
  console.log(userList);

  const currentStep = "step1";

  return (
    <div className="md:mx-80 my-10">
      <ProgressBar currentStep={currentStep} />
      <BasePaper currentStep={currentStep} />
    </div>
  );
};

export default PickPlayers;
