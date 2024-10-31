const WinBox = () => {
  return (
    <div className="bg-blue-600 w-6 text-center text-white rounded m-1">W</div>
  );
};

const LoseBox = () => {
  return (
    <div className="bg-red-600 w-6 text-center text-white rounded m-1">L</div>
  );
};

const RecentPlayed = ({ match }) => {
  return (
    <div className="flex gap-1">
      {match.length === 0 && <p className="mt-1">최근 전적이 없습니다</p>}
      {match.map((match, index) =>
        match.victoryordefeat === "win" ? (
          <WinBox key={index} />
        ) : (
          <LoseBox key={index} />
        )
      )}
    </div>
  );
};

export default RecentPlayed;
