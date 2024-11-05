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
  const recentPlayed = match.slice(0, 5);
  const userWin = match.filter((match) => match.victoryordefeat === "win");

  const winRate = ((userWin.length / match.length) * 100).toFixed(2);
  return (
    <div className="flex justify-between">
      {match.length === 0 && <p className="mt-1">최근 전적이 없습니다</p>}
      <div className="flex gap-1">
        {recentPlayed.map((match, index) =>
          match.victoryordefeat === "win" ? (
            <WinBox key={index} />
          ) : (
            <LoseBox key={index} />
          )
        )}
      </div>
      {match.length > 0 ? (
        <p className="mt-1">{winRate}%</p>
      ) : (
        <p className="mt-1"></p>
      )}
    </div>
  );
};

export default RecentPlayed;
