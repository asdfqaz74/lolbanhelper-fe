import { Autocomplete, TextField } from "@mui/material";
import { championDataAtom, userDataAtom } from "atoms/dataAtoms";
import { FileUploader } from "components/UserData/FileUploader";
import {
  useUnprocessed,
  useUpdateProcessed,
  useAddManyResult,
  useUserDataMap,
} from "hooks/Data";
import { useAtom } from "jotai";
import { useState } from "react";

const ReadyToHistory = () => {
  const [blueSearchValue, setBlueSearchValue] = useState([]);
  const [redSearchValue, setRedSearchValue] = useState([]);
  const { unprocessed, status } = useUnprocessed();
  const [championList] = useAtom(championDataAtom);
  const [userList] = useAtom(userDataAtom);
  const userMap = useUserDataMap();
  const addManyResult = useAddManyResult();
  const updateProcessed = useUpdateProcessed();
  const [loading, setLoading] = useState(false);

  const { statsJson, _id } = unprocessed;

  if (status === "pending") {
    return (
      <div className="my-10">
        <div className="flex justify-between">
          <p className="text-4xl font-bold mb-4">매치 작성하기</p>
          <FileUploader />
        </div>
        <div className="flex justify-center items-center h-96 bg-slate-300">
          <div className="text-2xl text-gray-400">로딩중입니다.</div>
        </div>
      </div>
    );
  }

  if (!unprocessed || !statsJson || statsJson.length === 0) {
    return (
      <div className="my-10">
        <div className="flex justify-between">
          <p className="text-4xl font-bold mb-4">매치 작성하기</p>
          <FileUploader />
        </div>
        <div className="flex justify-center items-center h-96 bg-slate-300">
          <div className="text-2xl text-gray-400">
            모든 매치가 처리되었습니다.
          </div>
        </div>
      </div>
    );
  }

  // 챔피언 데이터를 Map으로 변환
  const championMap = new Map(
    championList.map((champion) => [
      champion.en_name,
      [champion.small, champion.name, champion._id],
    ])
  );

  // 블루팀, 레드팀으로 나누기
  let blueTeam = statsJson.filter((data) => data.team === "BLUE");
  let redTeam = statsJson.filter((data) => data.team === "RED");

  // 블루팀, 레드팀에 championMap 데이터 추가
  blueTeam = blueTeam.map((data) => {
    const championData = championMap.get(data.champion);
    return {
      ...data,
      small: championData?.[0],
      champion_kr: championData?.[1],
      champion_id: championData?.[2],
    };
  });

  redTeam = redTeam.map((data) => {
    const championData = championMap.get(data.champion);
    return {
      ...data,
      small: championData?.[0],
      champion_kr: championData?.[1],
      champion_id: championData?.[2],
    };
  });

  // 유저 검색 값 변경
  const handleSearchChange = (team, index, value) => {
    const user = userMap.get(value);
    if (team === "BLUE") {
      setBlueSearchValue((prev) => {
        const newValue = [...prev];
        newValue[index] = value;
        return newValue;
      });
      blueTeam[index].summonerName = user?.game_id || "";
    } else {
      setRedSearchValue((prev) => {
        const newValue = [...prev];
        newValue[index] = value;
        return newValue;
      });

      redTeam[index].summonerName = user?.game_id || "";
    }
  };

  // 제출 버튼 클릭
  const handleSubmitButton = () => {
    setLoading(true);
    // 개인 전적 데이터로 변환
    const processedBlueTeam = blueTeam.map((data, index) => {
      const user = userMap.get(blueSearchValue[index]);
      return {
        user: user?._id,
        champion: data.champion_id,
        kills: data.kills,
        deaths: data.deaths,
        assists: data.assists,
        victoryordefeat: data.win ? "win" : "lose",
      };
    });
    const processedRedTeam = redTeam.map((data, index) => {
      const user = userMap.get(redSearchValue[index]);
      return {
        user: user?._id,
        champion: data.champion_id,
        kills: data.kills,
        deaths: data.deaths,
        assists: data.assists,
        victoryordefeat: data.win ? "win" : "lose",
      };
    });

    // 유저 이름 추가
    const updatedBlueTeam = blueTeam.map((data, index) => ({
      ...data,
      summonerName: blueSearchValue[index] || "",
    }));
    const updatedRedTeam = redTeam.map((data, index) => ({
      ...data,
      summonerName: redSearchValue[index] || "",
    }));

    // 5대5 경기 데이터로 변환
    const statsJson = [...updatedBlueTeam, ...updatedRedTeam];
    const processedMatch = {
      _id,
      statsJson,
    };

    // 개인 전적 데이터 합치기
    const allRecords = [...processedBlueTeam, ...processedRedTeam];

    // 데이터 제출
    updateProcessed.mutate(processedMatch, {
      onSuccess: () => {
        addManyResult.mutate(allRecords, {
          onSuccess: () => {
            setLoading(false);
            window.location.reload();
          },
          onError: (error) => {
            console.log(error);
          },
        });
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });

    // 상태 초기화
    setBlueSearchValue([]);
    setRedSearchValue([]);
  };

  return (
    <div className="my-10 w-full">
      <div className="flex justify-between">
        <p className="text-4xl font-bold mb-4">매치 작성하기</p>
        <FileUploader />
      </div>
      <div className="bg-slate-300 p-2 w-full">
        <div className="flex justify-evenly w-full">
          <div className="bg-sky-200 flex flex-col w-[33rem]">
            <p className="text-blue-500 text-2xl text-center font-bold">
              블루팀
            </p>
            <table className="table-auto m-2">
              <thead className="bg-slate-500 text-white">
                <tr>
                  <th>챔피언</th>
                  <th>유저</th>
                  <th className="w-12">K</th>
                  <th className="w-12">D</th>
                  <th className="w-12">A</th>
                </tr>
              </thead>
              <tbody>
                {blueTeam.map((data, index) => (
                  <tr key={`blue-${index}`}>
                    <td className="flex items-center gap-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion_kr}
                        className="rounded-full w-8"
                      />
                      <p>{data.champion_kr}</p>
                    </td>
                    <td>
                      <Autocomplete
                        sx={{ width: 200 }}
                        options={userList}
                        id="user-search"
                        getOptionLabel={(option) =>
                          option.game_id ? option.game_id : option.name
                        }
                        onChange={(e, value) =>
                          handleSearchChange(
                            "BLUE",
                            index,
                            value ? value.game_id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="유저 검색"
                            variant="outlined"
                          />
                        )}
                      />
                    </td>
                    <td>
                      <p className="text-center">{data.kills}</p>
                    </td>
                    <td>
                      <p className="text-center">{data.deaths}</p>
                    </td>
                    <td>
                      <p className="text-center">{data.assists}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-rose-100 flex flex-col w-[33rem]">
            <p className="text-red-500 text-2xl text-center font-bold">
              레드팀
            </p>
            <table className="table-auto m-2">
              <thead className="bg-slate-500 text-white">
                <tr>
                  <th>챔피언</th>
                  <th>유저</th>
                  <th className="w-12">K</th>
                  <th className="w-12">D</th>
                  <th className="w-12">A</th>
                </tr>
              </thead>
              <tbody>
                {redTeam.map((data, index) => (
                  <tr key={`red-${index}`}>
                    <td className="flex items-center gap-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion_kr}
                        className="rounded-full w-8"
                      />
                      <p>{data.champion_kr}</p>
                    </td>
                    <td>
                      <Autocomplete
                        sx={{ width: 200 }}
                        options={userList}
                        id="user-search"
                        getOptionLabel={(option) =>
                          option.game_id ? option.game_id : option.name
                        }
                        onChange={(e, value) =>
                          handleSearchChange(
                            "RED",
                            index,
                            value ? value.game_id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="유저 검색"
                            variant="outlined"
                          />
                        )}
                      />
                    </td>
                    <td>
                      <p className="text-center">{data.kills}</p>
                    </td>
                    <td>
                      <p className="text-center">{data.deaths}</p>
                    </td>
                    <td>
                      <p className="text-center">{data.assists}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmitButton}
          className={`${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-primary bg-opacity-70 hover:bg-opacity-100 transform hover:scale-105 duration-200"
          } px-4 py-2 rounded-lg mt-4 text-white font-semibold`}
        >
          {loading ? "제출중" : "제출하기"}
        </button>
      </div>
    </div>
  );
};

export default ReadyToHistory;
