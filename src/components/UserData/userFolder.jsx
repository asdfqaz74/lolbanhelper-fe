import { Button } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import RecentPlayed from "./recentPlayed";
import api from "../../utils/api";
import { useEffect, useState } from "react";
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

const UserFolder = ({ user }) => {
  const [userRecords, setUserRecords] = useState({});

  const navigate = useNavigate();

  const sortedUser = user.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const handleMoreInfo = (userId) => {
    navigate(`/playerdb/${userId}`);
  };

  useEffect(() => {
    const fetchUserRecords = async () => {
      for (let user of sortedUser) {
        try {
          const response = await api.get(`/record/${user._id}`);
          setUserRecords((prev) => ({
            ...prev,
            [user._id]: response.data.data,
          }));
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchUserRecords();
  }, [sortedUser]);

  return (
    <div className="grid grid-cols-3 gap-10 justify-items-center">
      {sortedUser.map((user) => (
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

          <div className="border border-primary bg-light px-2 flex flex-col shadow-md rounded-tr-lg py-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-4">
                <p>Main Position : {user.main_position}</p>
                <p>Sub Position : {user.sub_position}</p>
              </div>
              <img
                src={`/images/${user.main_position}.png`}
                className="w-20"
                alt=""
              />
            </div>
            <HorizonLine />
            <p>Recent Played</p>
            <RecentPlayed user={userRecords} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFolder;
