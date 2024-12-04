const WinBox = () => {
  return (
    <div className="bg-blue-600 w-6 text-center text-white rounded-full m-1">
      W
    </div>
  );
};

const LoseBox = () => {
  return (
    <div className="bg-red-600 w-6 text-center text-white rounded-full m-1">
      L
    </div>
  );
};

export const WinLoseBar = ({ recentMatches }) => {
  return (
    <div className="text-center">
      {typeof recentMatches === "string" && (
        <p className="text-center">최근 전적이 없습니다</p>
      )}
      <div className="flex justify-evenly">
        {Array.isArray(recentMatches) &&
          recentMatches.map((match, index) =>
            match === "win" ? <WinBox key={index} /> : <LoseBox key={index} />
          )}
      </div>
    </div>
  );
};
