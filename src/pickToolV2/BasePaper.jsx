import { PickTeamLeader } from "./PickTeamLeader";
import { PickTeamMate } from "./PickTeamMate";
import { RegistPlayer } from "./RegistPlayer";

export const BasePaper = ({ currentStep = "step1" }) => {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div
        className={`flex w-[300%] transition-transform duration-500 ease-in-out ${
          currentStep === "step1"
            ? "translate-x-step1"
            : currentStep === "step2"
            ? "translate-x-step2"
            : "translate-x-step3"
        }`}
      >
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <RegistPlayer />
        </div>
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <PickTeamLeader />
        </div>
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <PickTeamMate />
        </div>
      </div>
    </div>
  );
};
