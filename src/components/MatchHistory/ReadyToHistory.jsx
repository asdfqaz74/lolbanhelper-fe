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
      <div className="flex justify-evenly bg-lime-300">
        <div className="bg-slate-500">
          <p className="text-center text-2xl font-semibold">블루팀</p>
          {blueTeamWithChampionData.map((data, index) => {
            return (
              <div
                key={`${data?.id || "blue"}-${index}`}
                className="flex items-center"
              >
                <img
                  src={`${data.small}.jpg`}
                  alt={data.champion}
                  className="w-8 rounded-full"
                />
                <p className="text-lg">{data?.champion_kr}</p>
                <Autocomplete
                  sx={{ width: 250 }}
                  freeSolo
                  id="user-search"
                  options={userList || []}
                  value={data.summonerName || ""}
                  onChange={(e, value) => {
                    const selectedValue =
                      typeof value === "string" ? value : value?.name || "";
                    handleSummonerNameChange("blueTeam", index, selectedValue);
                  }}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.game_id || ""
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
                <p>K {data?.kills}</p>
                <p>D {data?.deaths}</p>
                <p>A {data?.assists}</p>
              </div>
            );
          })}
        </div>
        <div className="bg-sky-500">
          <p className="text-center text-lg font-semibold">레드팀</p>
          {redTeamWithChampionData.map((data, index) => {
            return (
              <div
                key={`${data?.id || "red"}-${index}`}
                className="flex items-center"
              >
                <img
                  src={`${data.small}.jpg`}
                  alt={data.champion}
                  className="w-8 rounded-full"
                />
                <p>{data?.champion_kr}</p>
                <Autocomplete
                  sx={{ width: 250 }}
                  freeSolo
                  id="user-search"
                  options={userList || []} // 유저 리스트
                  value={data.summonerName || ""} // 현재 소환사 이름
                  onChange={(e, value) => {
                    const selectedValue =
                      typeof value === "string"
                        ? value // 사용자가 직접 입력한 경우
                        : value?.name || ""; // Autocomplete 옵션을 선택한 경우
                    handleSummonerNameChange("redTeam", index, selectedValue);
                  }}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.game_id || ""
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

                <p>K {data?.kills}</p>
                <p>D {data?.deaths}</p>
                <p>A {data?.assists}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadyToHistory;
