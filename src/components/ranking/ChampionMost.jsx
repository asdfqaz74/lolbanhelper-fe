import { SwiperChampionMost } from "./SwiperChampionMost";

export const ChampionMost = ({ mostChampionData, championList }) => {
  // const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostChampionData ? (
    <p>loading...</p>
  ) : (
    <div className="flex flex-col px-36 py-3 w-full rounded-b-md bg-opacity-30 bg-primary">
      <p className="text-2xl md:text-4xl font-semibold text-gray-500">
        모스트 챔피언 탑 10
      </p>
      <p className="text-gray-500 font-semibold mb-5">
        팀 메이커 사용자들이 가장 많이 선택하는 챔피언!
      </p>
      <SwiperChampionMost
        mostChampionData={mostChampionData}
        championList={championList}
      />
    </div>
  );
};
