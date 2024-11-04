import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ResultTable from "components/UserData/ResultTable";
import ChampionStats from "components/UserData/ChampionStats";
import { useAtom } from "jotai";
import { championDataAtom, resultDataAtom } from "atoms/dataAtoms";
import { useOneUserData } from "hooks/Data";

const HorizonLine = () => {
  return <div className="w-full h-0.5 bg-primary my-5 rounded-full"></div>;
};

const PlayerStats = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resultData] = useAtom(resultDataAtom);
  const [championData] = useAtom(championDataAtom);
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
    navigate(`/playerdb/${id}/record`, { state: { data: playerData } });
  };

  const championCounts = userResult
    ? userResult.reduce((acc, cur) => {
        acc[cur.champion] = (acc[cur.champion] || 0) + 1;
        return acc;
      }, {})
    : {};

  const mostPlayedChampion =
    Object.keys(championCounts).length > 0
      ? Object.keys(championCounts).reduce((a, b) =>
          championCounts[a] > championCounts[b] ? a : b
        )
      : null;

  const mostChampionData = championData
    ? championData.find((res) => res._id === mostPlayedChampion)
    : null;

  return (
    <>
      {playerData ? (
        <div className="flex flex-col mt-5 py-10 px-20 bg-white shadow-2xl justify-between rounded-b-lg mx-4 z-10">
          {mostChampionData && (
            <img
              src={`${mostChampionData.image}.jpg`}
              className="h-[30rem] w-[62.5rem] object-cover rounded-t-xl absolute z-20"
              alt=""
            />
          )}
          <div className="z-30 mt-56">
            <div className=" flex items-center justify-between mt-5">
              <span className="bg-dark border-t border-primary text-3xl font-bold text-gray-200 max-w-36 text-center p-4 rounded-t-lg">
                {playerData.name}
              </span>
              <div className="flex gap-4">
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
            <div className="bg-light px-14 py-10 border border-primary rounded-tr-lg">
              <p className="text-xl font-semibold mb-5">INFO</p>
              <div className="flex w-full justify-center">
                <div className="flex w-3/4 justify-between">
                  <div className="flex justify-start w-1/4 gap-10">
                    <div className="flex flex-col justify-between font-semibold">
                      <p>NickName</p>
                      <p>Main Position</p>
                      <p>Sub Position</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p>{playerData.game_id}</p>
                      <p>{playerData.main_position}</p>
                      <p>{playerData.sub_position}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start">
                    <img
                      src={`/images/${playerData.main_position}.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <HorizonLine />
              <p className="text-xl font-semibold mb-5">RECORD</p>
              <div className="max-h-[28.125rem] flex justify-around">
                <div className="">
                  <p className="text-lg mb-3">최근 경기</p>
                  <ResultTable
                    userResult={userResult}
                    championDatas={championData}
                  />
                </div>
                <div>
                  <p>챔피언 성적</p>
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
