import { useEffect, useState } from "react";
import Roster from "../components/PickTool/roster";
import Roullete from "../components/PickTool/roulette";
import api from "../utils/api";
import { Box } from "@mui/material";
import TeamMaker from "../components/PickTool/teamMaker";

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
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor: "white",
        padding: 2,
        borderRadius: 2,
      }}
    >
      <TeamMaker userList={nameList} />
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
    </Box>
  );
};

export default PickPlayers;
