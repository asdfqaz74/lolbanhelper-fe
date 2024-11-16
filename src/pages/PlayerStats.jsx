import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ResultTable from "components/UserData/ResultTable";
import ChampionStats from "components/UserData/ChampionStats";
import { useChampionData, useOneUserData, useResultData } from "hooks/Data";

const HorizonLine = () => {
  return <div className="w-full h-0.5 bg-primary my-5 rounded-full"></div>;
};

const PlayerStats = () => {
  const resultData = useResultData();
  const championData = useChampionData();
  const { id } = useParams();
  const navigate = useNavigate();

  const playerId = id;
  const { data: playerData } = useOneUserData(playerId);

  // 전체 결과 중 해당 유저의 결과만 필터링
  const userResult = resultData
    .filter((res) => res.user === id)
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleEdit = (id) => {
    navigate(`/playerdb/${id}/edit`);
  };

  const handleAdd = (id) => {
    navigate(`/playerdb/${id}/record`);
  };

  const championCounts = userResult
    ? userResult.reduce((acc, cur) => {
        const { champion, victoryordefeat } = cur;

        if (!acc[champion]) {
          acc[champion] = { games: 0, wins: 0 };
        }
        acc[champion].games += 1;

        if (victoryordefeat === "win") {
          acc[champion].wins += 1;
        }
        return acc;
      }, {})
    : {};

  const mostPlayedChampion =
    Object.keys(championCounts).length > 0
      ? Object.keys(championCounts).reduce((a, b) => {
          const gamesA = championCounts[a].games;
          const gamesB = championCounts[b].games;

          if (gamesA > gamesB) return a;
          if (gamesA < gamesB) return b;

          const winRateA = gamesA > 0 ? championCounts[a].wins / gamesA : 0;
          const winRateB = gamesB > 0 ? championCounts[b].wins / gamesB : 0;

          return winRateA > winRateB ? a : b;
        })
      : null;

  const mostChampionData = championData
    ? championData.find((res) => res._id === mostPlayedChampion)
    : null;

  return (
    <>
      {playerData ? (
        <div className="flex flex-col my-5 pb-10 statssm:pt-10 px-10 statssm:px-20 justify-between rounded-b-lg mx-4 z-10">
          {mostChampionData && (
            <img
              src={`${mostChampionData.image}.jpg`}
              className="statslg:h-[30rem] statslg:w-[62.5rem] statsmd:w-[35rem] object-cover rounded-t-xl absolute z-20 statslg:block statsmd:block statssm:block statssm:w-[21rem] hidden"
              alt=""
            />
          )}
          <div className="z-30 statsmd:mt-56 mt-24">
            <div className=" flex items-center justify-between mt-5">
              <span className="bg-dark border-t border-primary text-3xl font-bold text-gray-200 max-w-36 text-center p-4 rounded-t-lg whitespace-nowrap">
                {playerData.name}
              </span>
              <div className="flex flex-col stats:flex-row stats:gap-4 whitespace-nowrap">
                <Button
                  variant="outlined"
                  endIcon={<AddCircleOutlineIcon />}
                  onClick={() => handleAdd(playerData._id)}
                >
                  전적 추가
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<EditIcon />}
                  onClick={() => handleEdit(playerData._id)}
                >
                  수정하기
                </Button>
              </div>
            </div>
            <div className="statssm:bg-light px-14 py-10 statssm:border statssm:border-primary rounded-tr-lg bg-white border-none">
              <p className="text-center statssm:text-start text-xl font-semibold mb-5">
                INFO
              </p>
              <div className="flex w-full justify-center">
                <div className="flex text-sm statssm:text-base gap-5 w-3/4 items-center statsmd:justify-between flex-col-reverse statsmd:flex-row">
                  <div className="flex justify-start statsmd:w-1/3 gap-10 whitespace-nowrap">
                    <div className="flex flex-col justify-between font-semibold gap-5 ">
                      <p>NickName</p>
                      <p>Main Position</p>
                      <p>Sub Position</p>
                    </div>
                    <div className="flex flex-col justify-between gap-5 ">
                      <p>{playerData.game_id}</p>
                      <p>{playerData.main_position}</p>
                      <p>{playerData.sub_position}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start">
                    <img
                      src={`/images/${playerData.main_position}.png`}
                      alt=""
                      className="w-8 h-8 dbsm:w-14 dbsm:h-14 statsmd:w-32 statsmd:h-32"
                    />
                  </div>
                </div>
              </div>
              <HorizonLine />
              <p className="text-center statssm:text-start text-xl font-semibold mb-5">
                RECORD
              </p>
              <div className="flex flex-col justify-around stats:flex-row items-center stats:items-start gap-10">
                <div className="">
                  <p className="text-center statssm:text-start text-lg mb-3">
                    최근 경기
                  </p>
                  <ResultTable
                    userResult={userResult}
                    championDatas={championData}
                  />
                </div>
                <div>
                  <p className="text-center statssm:text-start text-lg mb-3">
                    챔피언 성적
                  </p>
                  <ChampionStats
                    userResult={userResult}
                    championDatas={championData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PlayerStats;
