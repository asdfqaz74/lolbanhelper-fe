export const LeastWinChamp = ({ leastWinChampionData, championList }) => {
  return !leastWinChampionData ? (
    <p>loading...</p>
  ) : (
    leastWinChampionData.map((data, index) => {
      const championName = championList.find(
        (champion) => champion._id === data._id
      ).name;

      return (
        <div key={index}>
          <p>{championName}</p>
          <p>{data.winRate.toFixed(2)}</p>
          <p>{data.total}</p>
        </div>
      );
    })
  );
};
