import { Button } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import RecentPlayed from "./recentPlayed";
import { useNavigate } from "react-router-dom";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
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

const UserFolder = ({ userList, resultData, championList }) => {
  const navigate = useNavigate();

  const handleMoreInfo = (userId) => {
    navigate(`/playerdb/${userId}`);
  };

  return (
    <div className="grid grid-cols-3 gap-14 justify-items-center">
      {userList.map((user) => {
        const userResult = resultData
          .filter((res) => res.user === user._id)
          .slice(0, 5);
        return (
          <div key={user._id} className="min-w-96">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-3 text-primary">
                <p className="border-t border-primary bg-dark rounded-t-lg px-2 text-gray-200 text-xl max-w-20 py-1">
                  {user.name}
                </p>
                <p className="text-sm">{user.game_id}</p>
              </div>
              <Button
                variant="text"
                sx={{ display: "flex" }}
                size="small"
                endIcon={<PlusIcon />}
                onClick={() => handleMoreInfo(user._id)}
              >
                더보기
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
                <img
                  src={`/images/${user.main_position}.png`}
                  className="w-20"
                  alt=""
                />
              </div>
              <HorizonLine />
              <p className="text-lg font-semibold">Recent Played</p>
              <RecentPlayed match={userResult} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserFolder;
