import { Autocomplete, TextField } from "@mui/material";
import { championDataAtom, userDataAtom } from "atoms/dataAtoms";
import { useUnprocessed } from "hooks/Data";
import { useAtom } from "jotai";
import { useState } from "react";

const positionPriority = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

const ReadyToHistory = () => {
  const { unprocessed, status } = useUnprocessed();
  const [championData] = useAtom(championDataAtom);
  const [userList] = useAtom(userDataAtom);
  const [teamData, setTeamData] = useState({ blueTeam: [], redTeam: [] });

  if (!unprocessed || unprocessed.length === 0) {
    return <div>모든 매치가 처리되었습니다.</div>;
  }

  if (status === "loading") {
    return <div>로딩중...</div>;
  }

  // 블루팀과 레드팀으로 나누기
  const blueTeam = unprocessed.filter((data) => data?.team === "BLUE");
  const sortedBlueTeam = blueTeam.sort((a, b) => {
    return (
      positionPriority.indexOf(a?.position) -
      positionPriority.indexOf(b?.position)
    );
  });

  // championData.en_name과 soredBlueTeam.champion이 같은 것을 찾아서 sortedBlueTema에 championData.name과 championData.small 을 추가
  const blueTeamWithChampionData = sortedBlueTeam.map((data) => {
    const champion = championData.find(
      (champion) => champion.en_name === data.champion
    );

    return {
      ...data,
      champion_kr: champion?.name,
      small: champion?.small,
    };
  });

  const redTeam = unprocessed.filter((data) => data?.team === "RED");
  const sortedRedTeam = redTeam.sort((a, b) => {
    return (
      positionPriority.indexOf(a?.position) -
      positionPriority.indexOf(b?.position)
    );
  });

  const redTeamWithChampionData = sortedRedTeam.map((data) => {
    const champion = championData.find(
      (champion) => champion.en_name === data.champion
    );

    return {
      ...data,
      champion_kr: champion?.name,
      small: champion?.small,
    };
  });

  if (teamData.blueTeam.length === 0 && teamData.redTeam.length === 0) {
    setTeamData({
      blueTeam: blueTeamWithChampionData,
      redTeam: redTeamWithChampionData,
    });
  }

  const handleSummonerNameChange = (team, index, value) => {
    const updatedTeam = [...teamData[team]];

    updatedTeam[index].summonerName = value;
    setTeamData((prev) => ({
      ...prev,
      [team]: updatedTeam,
    }));
  };

  console.log(teamData);

  return (
    <div className="">
      <p className="text-2xl font-bold">
        매치 작성을 위해 아이디를 기입해주세요.
      </p>
      <div className="flex flex-col dblg:flex-row max-w-[35rem] dblg:min-w-full justify-evenly bg-lime-300">
        <div className="bg-slate-500">
          <p className="text-center text-2xl font-semibold">블루팀</p>
          <table className="table-auto min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-300 p-2 text-left">챔피언</th>
                <th className="border border-gray-300 p-2 text-left">
                  소환사 이름
                </th>
                <th className="border border-gray-300 p-2">K</th>
                <th className="border border-gray-300 p-2">D</th>
                <th className="border border-gray-300 p-2">A</th>
              </tr>
            </thead>
            <tbody>
              {blueTeamWithChampionData.map((data, index) => {
                return (
                  <tr key={`blue-${data.id}`}>
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion}
                        className="w-8 rounded-full"
                      />
                      <p className="text-lg">{data?.champion_kr}</p>
                    </td>
                    <td className=" p-2">
                      <Autocomplete
                        sx={{ width: 250 }}
                        freeSolo
                        id="user-search"
                        options={userList || []}
                        value={data.summonerName || ""}
                        onChange={(e, value) => {
                          const selectedValue =
                            typeof value === "string"
                              ? value
                              : value?.name || "";
                          handleSummonerNameChange(
                            "blueTeam",
                            index,
                            selectedValue
                          );
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.game_id || ""
                        } // 문자열 또는 객체 처리
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="소환사 이름"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.kills}</p>
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.deaths}</p>
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.assists}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-sky-500">
          <p className="text-center text-lg font-semibold">레드팀</p>
          <table className="table-auto min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-300 p-2 text-left">챔피언</th>
                <th className="border border-gray-300 p-2 text-left">
                  소환사 이름
                </th>
                <th className="border border-gray-300 p-2">K</th>
                <th className="border border-gray-300 p-2">D</th>
                <th className="border border-gray-300 p-2">A</th>
              </tr>
            </thead>
            <tbody>
              {redTeamWithChampionData.map((data, index) => {
                return (
                  <tr key={`red-${data.id}`}>
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={`${data.small}.jpg`}
                        alt={data.champion}
                        className="w-8 rounded-full"
                      />
                      <p className="text-lg">{data?.champion_kr}</p>
                    </td>
                    <td className=" p-2">
                      <Autocomplete
                        sx={{ width: 250 }}
                        freeSolo
                        id="user-search"
                        options={userList || []}
                        value={data.summonerName || ""}
                        onChange={(e, value) => {
                          const selectedValue =
                            typeof value === "string"
                              ? value
                              : value?.name || "";
                          handleSummonerNameChange(
                            "redTeam",
                            index,
                            selectedValue
                          );
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.game_id || ""
                        } // 문자열 또는 객체 처리
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="소환사 이름"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.kills}</p>
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.deaths}</p>
                    </td>
                    <td className=" p-2 text-center w-10">
                      <p>{data?.assists}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadyToHistory;
