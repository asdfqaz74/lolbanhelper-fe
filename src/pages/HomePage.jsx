import { ChampionMost } from "components/ranking/ChampionMost";
import { LeastWinChamp } from "components/ranking/LeastWinChamp";
import { MostWinRateChamp } from "components/ranking/MostWinRateChamp";
import { MostWinRateUser } from "components/ranking/MostWinRateUser";
import { useChampionData, useHomeData, useUserDatas } from "hooks/Data";

const HomePage = () => {
  const {
    mostChampionData,
    mostWinChampionData,
    leastWinChampionData,
    mostUserWinRateData,
  } = useHomeData();
  const championList = useChampionData();
  const userList = useUserDatas();

  return (
    <>
      <ChampionMost
        mostChampionData={mostChampionData}
        championList={championList}
      />
      <div className="mb-5 pb-10 md:mx-36 flex flex-col items-center">
        {/* <HorizonLine /> */}
        <div className="grid grid-cols-1 statssm:grid-cols-3 mt-10">
          <MostWinRateUser
            mostUserWinRateData={mostUserWinRateData}
            userList={userList}
          />
          <MostWinRateChamp
            mostWinChampionData={mostWinChampionData}
            championList={championList}
          />
          <LeastWinChamp
            leastWinChampionData={leastWinChampionData}
            championList={championList}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
