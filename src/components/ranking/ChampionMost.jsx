export const ChampionMost = ({ mostChampionData, championList }) => {
  const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="bg-light flex flex-col border statssm:max-w-[31.25rem] px-2 py-3">
      <p className="text-2xl font-semibold text-center mb-5">
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
                className="w-10 statssm:w-20"
              />
              <img
                src={`${championImage}.jpg`}
                alt=""
                className="w-32 statssm:w-72 rounded-lg"
              />
              <div className="">
                <p className="text-lg">{championName}</p>
                <p className="text-sm">{data.count}게임</p>
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
              <div key={index + 3} className="w-24 whitespace-nowrap">
                <p className="font-semibold text-lg">{index + 4}위</p>
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
