import Roster from "components/PickTool/roster";
import Roullete from "components/PickTool/roulette";
import { Box } from "@mui/material";
import TeamMaker from "components/PickTool/teamMaker";
import HowTo from "components/PickTool/howTo";
import { useUserData } from "hooks/User";

const PickPlayers = () => {
  const userData = useUserData();
  return (
    <div className="flex mt-5 px-6 py-10 bg-white shadow-2xl h-[80vh] justify-between rounded-b-lg mx-4">
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
