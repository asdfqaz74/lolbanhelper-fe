export const MostWinRateChamp = ({ mostWinChampionData, championList }) => {
  return !mostWinChampionData ? (
    <p>loading...</p>
  ) : (
    mostWinChampionData.map((data, index) => {
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
