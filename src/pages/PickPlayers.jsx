import { useEffect, useState } from "react";
import Roster from "../components/PickTool/roster";
import Roullete from "../components/PickTool/roulette";
import api from "../utils/api";
import { Box } from "@mui/material";
import TeamMaker from "../components/PickTool/teamMaker";
import HowTo from "../components/PickTool/howTo";

const PickPlayers = () => {
  // 유저 정보를 저장할 상태값을 설정합니다.
  const [nameList, setNameList] = useState([]);

  // getUser 함수를 정의합니다.
  // getUser : 유저 정보를 가져오는 함수
  const getUser = async () => {
    const response = await api.get("/user");
    setNameList(response.data.data);
  };

  // useEffect 훅을 사용하여 getUser 함수를 호출합니다.
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="flex mt-5 px-6 py-10 bg-white shadow-2xl h-[80vh] justify-between rounded-b-lg mx-4">
      <HowTo />
      <TeamMaker userList={nameList} getUser={getUser} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Roster userList={nameList} getUser={getUser} />
        <Roullete userList={nameList} />
      </Box>
    </div>
  );
};

export default PickPlayers;
