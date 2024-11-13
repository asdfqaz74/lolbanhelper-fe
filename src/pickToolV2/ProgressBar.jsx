export const ProgressBar = ({ currentStep = "step1" }) => {
  return (
    <div className="flex border w-[28.125rem] h-20 text-2xl font-bold overflow-hidden rounded">
      <div
        className={`flex items-center justify-center py-4 border-r border-gray-300 transition-all duration-500 ${
          currentStep === "step1"
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === "step1" ? "1. 인원 고르기 (최대10명)" : "1"}</p>
      </div>
      <div
        className={`flex items-center justify-center py-4 border-r border-gray-300 transition-all duration-500 ${
          currentStep === "step2"
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === "step2" ? "2. 대장 뽑기" : "2"}</p>
      </div>
      <div
        className={`flex items-center justify-center py-4 transition-all duration-500 ${
          currentStep === "step3"
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === "step3" ? "3. 팀원 고르기" : "3"}</p>
      </div>
    </div>
  );
};
