import Roster from "components/PickTool/roster";
import Roullete from "components/PickTool/roulette";
import { Box } from "@mui/material";
import TeamMaker from "components/PickTool/teamMaker";
import HowTo from "components/PickTool/howTo";
import { useUserDatas } from "hooks/Data";

const PickPlayers = () => {
  // 커스텀 훅을 사용하여 유저 데이터를 가져옵니다.
  const userData = useUserDatas();

  return (
    <div className="flex mt-5 px-6 py-10 h-[80vh] justify-between rounded-b-lg mx-4">
      <HowTo />
      <TeamMaker userList={userData} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Roster userList={userData} />
        <Roullete userList={userData} />
      </Box>
    </div>
  );
};

export default PickPlayers;
