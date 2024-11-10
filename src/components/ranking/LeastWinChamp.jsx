export const LeastWinChamp = ({ leastWinChampionData, championList }) => {
  const rankImages = ["1st.png", "2nd.png", "3rd.png"];
  return !leastWinChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="bg-light flex flex-col border md:min-w-[32rem] px-2 py-3">
      <p className="text-2xl font-semibold text-center mb-5 text-dark">
        승률 워스트 5 챔피언
      </p>
      <div className="flex flex-col gap-3 mb-3">
        {leastWinChampionData.slice(0, 3).map((data, index) => {
          const championName = championList.find(
            (champion) => champion._id === data._id
          ).name;

          return (
            <div key={index} className="flex items-center gap-3">
              <img
                src={`/images/${rankImages[index]}`}
                alt=""
                className="w-10"
              />
              <div>
                <p className="text-lg font-semibold">{championName}</p>
                <div className="flex gap-2">
                  <p>{data.total} 게임</p>
                  <p>{(data.winRate * 100).toFixed(2)}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 justify-items-center">
        {leastWinChampionData.slice(3).map((data, index) => {
          const championName = championList.find(
            (champion) => champion._id === data._id
          ).name;

          return (
            <div key={index + 3}>
              <p className="font-semibold text-lg text-primary text-center">
                {index + 4}위
              </p>
              <p className="text-center">{championName}</p>
              <div className="flex gap-2 text-sm">
                <p>{data.total} 게임</p>
                <p>{(data.winRate * 100).toFixed(2)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
