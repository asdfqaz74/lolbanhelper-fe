import { Button } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import RecentPlayed from "./recentPlayed";
import { useNavigate } from "react-router-dom";
import HoneyBee from "./HoneyBee";
import SadBee from "./SadBee";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 3 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const HorizonLine = () => {
  return <div className="w-full h-0.5 bg-primary my-5 rounded-full"></div>;
};

const UserFolder = ({ userList, resultData }) => {
  const navigate = useNavigate();

  const handleMoreInfo = (userId) => {
    navigate(`/playerdb/${userId}`);
  };

  return (
    <div className="grid grid-cols-1 gap-14 justify-items-center dblg:grid-cols-3 db:grid-cols-2">
      {userList.map((user) => {
        const userResult = resultData.filter((res) => res.user === user._id);
        const userWin = userResult.filter(
          (res) => res.victoryordefeat === "win"
        ).length;
        const userLose = userResult.filter(
          (res) => res.victoryordefeat === "lose"
        ).length;
        return (
          <div key={user._id} className="dbsm:min-w-96 min-w-72">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-3 text-primary">
                <p className="border-t border-primary bg-dark rounded-t-lg px-2 text-gray-200 text-xl max-w-24 py-1">
                  {user.name}
                </p>
                <p className="dbsm:text-sm text-xs">{user.game_id}</p>
              </div>
              <Button
                variant="text"
                size="small"
                endIcon={<PlusIcon />}
                onClick={() => handleMoreInfo(user._id)}
              >
                <p>더보기</p>
              </Button>
            </div>

            <div className="border border-primary bg-light p-4 flex flex-col shadow-xl rounded-tr-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-semibold">Position</p>
                  <div className="flex flex-col gap-2">
                    <p>Main : {user.main_position}</p>
                    <p>Sub : {user.sub_position}</p>
                  </div>
                </div>
                <HoneyBee isMVP={user.isMVP} className="max-w-20" />
                <SadBee isSad={user.isSad} className="max-w-20" />
                <img
                  src={`/images/${user.main_position}.png`}
                  className="w-20"
                  alt=""
                />
              </div>
              <HorizonLine />
              <p className="dbsm:text-lg text-base font-semibold">
                Recent Played ({userWin}W {userLose}L)
              </p>
              <RecentPlayed match={userResult} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserFolder;
