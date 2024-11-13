import { Final } from "./Final";
import { PickTeamLeader } from "./PickTeamLeader";
import { PickTeamMate } from "./PickTeamMate";
import { RegistPlayer } from "./RegistPlayer";

export const BasePaper = ({ currentStep }) => {
  return (
    <div className="flex items-start justify-center w-full h-full overflow-x-hidden">
      <div
        className={`flex w-[400%] transition-transform duration-500 ease-in-out ${
          currentStep === 0
            ? "translate-x-step1"
            : currentStep === 1
            ? "translate-x-step2"
            : currentStep === 2
            ? "translate-x-step3"
            : "translate-x-step4"
        }`}
      >
        <div className="flex-shrink-0 w-full flex justify-center items-start">
          <RegistPlayer />
        </div>
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <PickTeamLeader />
        </div>
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <PickTeamMate />
        </div>
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <Final />
        </div>
      </div>
    </div>
  );
};
