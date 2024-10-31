const WinBox = () => {
  return <div className="bg-blue-600 p-2 text-white rounded m-1">W</div>;
};

const LoseBox = () => {
  return <div className="bg-red-600 p-2 text-white rounded m-1">L</div>;
};

const RecentPlayed = ({ match }) => {
  return (
    <div className="flex gap-1">
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
