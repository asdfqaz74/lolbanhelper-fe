import { Autocomplete, TextField } from "@mui/material";
import { championDataAtom, userDataAtom } from "atoms/dataAtoms";
import { useUnprocessed } from "hooks/Data";
import { useAddManyResult } from "hooks/Data";
import { useUserDataMap } from "hooks/Data/User/useUserDataMap";
import { useAtom } from "jotai";
import { useState } from "react";

const sortedPosition = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

const ReadyToHistory = () => {
  const [blueSearchValue, setBlueSearchValue] = useState([]);
  const [redSearchValue, setRedSearchValue] = useState([]);
  const { unprocessed, status } = useUnprocessed();
  const [championList] = useAtom(championDataAtom);
  const [userList] = useAtom(userDataAtom);
  const userMap = useUserDataMap();
  const addManyResult = useAddManyResult();

  if (status !== "success") {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-2xl text-gray-400">로딩중입니다.</div>
      </div>
    );
  }

  if (!unprocessed) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-2xl text-gray-400">데이터가 없습니다.</div>
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

  // unprocessed를 sortedPosition에 따라 정렬
  const sortedUnprocessed = unprocessed.sort((a, b) => {
    return (
      sortedPosition.indexOf(a.position) - sortedPosition.indexOf(b.position)
    );
  });

  // 블루팀, 레드팀으로 나누기
  let blueTeam = sortedUnprocessed.filter((data) => data.team === "BLUE");
  let redTeam = sortedUnprocessed.filter((data) => data.team === "RED");

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
    if (team === "BLUE") {
      setBlueSearchValue((prev) => {
        const newValue = [...prev];
        newValue[index] = value;
        return newValue;
      });
    } else {
      setRedSearchValue((prev) => {
        const newValue = [...prev];
        newValue[index] = value;
        return newValue;
      });
    }
  };

  // 제출 버튼 클릭
  const handleSubmitButton = () => {
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

    // 5대5 경기 데이터로 변환

    // 개인 전적 데이터 합치기
    const allRecords = [...processedBlueTeam, ...processedRedTeam];

    addManyResult.mutate(allRecords);
  };

  return (
    <div>
      <div className="bg-slate-400">
        <div className="flex justify-evenly">
          <div className="bg-yellow-200 flex flex-col">
            <p>블루팀</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>챔피언</th>
                  <th>유저</th>
                  <th>K</th>
                  <th>D</th>
                  <th>A</th>
                </tr>
              </thead>
              <tbody>
                {blueTeam.map((data, index) => (
                  <tr key={`blue-${index}`}>
                    <td className="flex items-center space-x-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion_kr}
                        className="rounded-full w-8"
                      />
                      <p>{data.champion_kr}</p>
                    </td>
                    <td>
                      <Autocomplete
                        sx={{ width: 250 }}
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
                      <p>{data.kills}</p>
                    </td>
                    <td>
                      <p>{data.deaths}</p>
                    </td>
                    <td>
                      <p>{data.assists}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-200 flex flex-col">
            <p>레드팀</p>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>챔피언</th>
                  <th>유저</th>
                  <th>K</th>
                  <th>D</th>
                  <th>A</th>
                </tr>
              </thead>
              <tbody>
                {redTeam.map((data, index) => (
                  <tr key={`red-${index}`}>
                    <td className="flex items-center space-x-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion_kr}
                        className="rounded-full w-8"
                      />
                      <p>{data.champion_kr}</p>
                    </td>
                    <td>
                      <Autocomplete
                        sx={{ width: 250 }}
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
                      <p>{data.kills}</p>
                    </td>
                    <td>
                      <p>{data.deaths}</p>
                    </td>
                    <td>
                      <p>{data.assists}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={handleSubmitButton}>제출</button>
      </div>
    </div>
  );
};

export default ReadyToHistory;
