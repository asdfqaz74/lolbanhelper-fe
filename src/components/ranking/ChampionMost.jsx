import { SwiperChampionMost } from "./SwiperChampionMost";

export const ChampionMost = ({ mostChampionData, championList }) => {
  // const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="flex flex-col px-2 py-3 w-full md:max-w-screen-statslg justify-center items-center">
      <p className="text-2xl font-semibold mb-5 text-dark">
        모스트 탑 10 챔피언
      </p>
      <SwiperChampionMost
        mostChampionData={mostChampionData}
        championList={championList}
      />
    </div>
  );
};
