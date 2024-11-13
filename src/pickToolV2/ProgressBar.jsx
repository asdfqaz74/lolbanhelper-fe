export const ProgressBar = ({ currentStep = 0 }) => {
  return (
    <div className="flex border w-[28.125rem] h-20 text-2xl font-bold overflow-hidden rounded">
      <div
        className={`flex items-center justify-center py-4 border-r border-gray-300 transition-all duration-500 ${
          currentStep === 0
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === 0 ? "1. 인원 고르기 (최대10명)" : "1"}</p>
      </div>
      <div
        className={`flex items-center justify-center py-4 border-r border-gray-300 transition-all duration-500 ${
          currentStep === 1
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === 1 ? "2. 대장 뽑기" : "2"}</p>
      </div>
      <div
        className={`flex items-center justify-center py-4 transition-all duration-500 ${
          currentStep === 2
            ? "flex-grow bg-primary bg-opacity-70 text-gray-900"
            : "w-20 text-gray-500 bg-primary bg-opacity-30"
        }`}
      >
        <p>{currentStep === 2 ? "3. 팀원 고르기" : "3"}</p>
      </div>
    </div>
  );
};
