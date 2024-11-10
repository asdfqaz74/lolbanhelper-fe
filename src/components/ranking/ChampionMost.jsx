export const ChampionMost = ({ mostChampionData, championList }) => {
  const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="bg-light flex flex-col border md:min-w-[32rem] px-2 py-3">
      <p className="text-2xl font-semibold text-center mb-5 text-dark">
        모스트 탑 10 챔피언
      </p>
      <div className="flex flex-col gap-3">
        {mostChampionData.slice(0, 3).map((data, index) => {
          const championData = championList.find(
            (champion) => champion._id === data._id
          );

          const championName = championData.name;
          const championImage = championData.image;

          return (
            <div className="flex gap-3" key={index}>
              <img
                src={`/images/${rankImages[index]}`}
                alt=""
                className="w-10 object-obtain statssm:w-20 statssm:h-20"
              />
              <div className="md:place-items-center">
                <img
                  src={`${championImage}.jpg`}
                  alt=""
                  className="w-32 dbsm:w-72 rounded-lg"
                />
                <div className="flex flex-col md:flex-row md:gap-2 md:items-end">
                  <p className="text-lg">{championName}</p>
                  <p className="text-sm">{data.count}게임</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-2 gap-4 statssm:grid-cols-3 justify-items-center mt-3">
          {mostChampionData.slice(3).map((data, index) => {
            const championName = championList.find(
              (champion) => champion._id === data._id
            ).name;

            return (
              <div
                key={index + 3}
                className="w-24 whitespace-nowrap text-center statssm:text-start"
              >
                <p className="font-semibold text-lg text-primary">
                  {index + 4}위
                </p>
                <div className="flex gap-0 statssm:gap-2 flex-col statssm:flex-row">
                  <p>{championName}</p>
                  <p className="text-sm">{data.count}게임</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
