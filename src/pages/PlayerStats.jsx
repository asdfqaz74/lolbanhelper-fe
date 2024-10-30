import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const PlayerStats = () => {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState({});
  const navigate = useNavigate();

  const playerId = id;

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await api.get(`/user/${id}`, {
          params: { _id: playerId },
        });

        setPlayerData(response.data.data[0]);
      } catch (e) {
        console.error(e);
      }
    };
    getPlayerData();
  }, [id, playerId]);

  const handleEdit = (id) => {
    navigate(`/playerdb/${id}/edit`, { state: { data: playerData } });
  };

  return (
    <>
      {playerData ? (
        <div className="flex flex-col mt-5 py-10 px-20 bg-white shadow-2xl justify-between rounded-b-lg mx-4">
          <div className="flex items-center justify-between mt-5">
            <span className="bg-dark border-t border-primary text-3xl font-bold text-gray-200 max-w-36 text-center p-4 rounded-t-lg">
              {playerData.name}
            </span>
            <Button
              variant="outlined"
              endIcon={<EditIcon />}
              onClick={() => handleEdit(playerData._id)}
            >
              수정하기
            </Button>
          </div>
          <div className="bg-light px-14 pt-10 border border-primary rounded-tr-lg">
            <p className="text-xl font-semibold mb-5">INFO</p>
            <div className="flex w-full justify-center">
              <div className="flex w-3/4 justify-between">
                <div className="flex flex-col justify-start">
                  <p>NickName : {playerData.game_id}</p>
                  <p>Main Position : {playerData.main_position}</p>
                </div>
                <div className="flex flex-col justify-start">
                  <p>Recent Played</p>
                  <p>Sub Position : {playerData.sub_position}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PlayerStats;
