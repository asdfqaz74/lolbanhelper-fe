import { SwiperChampionMost } from "./SwiperChampionMost";

export const ChampionMost = ({ mostChampionData, championList }) => {
  // const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="flex flex-col px-2 py-3 w-full justify-center items-center rounded-b-md bg-opacity-30 bg-primary">
      <p className="text-2xl md:text-4xl font-semibold mb-5 text-dark">
        모스트 챔피언 탑 10
      </p>
      <SwiperChampionMost
        mostChampionData={mostChampionData}
        championList={championList}
      />
    </div>
  );
};
