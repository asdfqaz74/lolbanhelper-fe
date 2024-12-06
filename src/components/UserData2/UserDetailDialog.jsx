import { Dialog } from "@mui/material";
import { useUserDetail } from "hooks/Data";
import { useState } from "react";
import { RecentMatchGraph } from "./RecentMatchGraph";
import { RecentPositionGraph } from "./RecentPositionGraph";

export const UserDetailDialog = ({ open, onClose, userId }) => {
  const { data, status } = useUserDetail(userId);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (status !== "success") {
    return (
      <Dialog open={open} onClose={onClose}>
        <div>Loading...</div>
      </Dialog>
    );
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleClose = () => {
    setImageLoaded(false);
    onClose();
  };

  console.log(data);

  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <img
          src="/images/placeholder.svg"
          alt=""
          className={`${imageLoaded ? "hidden" : "block"}`}
        />
        <img
          src={
            `${data?.main_character_image?.image}.jpg` ||
            "/images/placeholder.svg"
          }
          alt=""
          onLoad={handleImageLoad}
          className={`${imageLoaded ? "block" : "hidden"}`}
        />
        <div className="flex p-5 justify-between">
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-bold">{data.name}</p>
            <p className="text-2xl text-gray-500">{data.nickname}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">최근 10게임</p>
            <div className="flex items-center">
              <div className="flex flex-col items-center ">
                <RecentMatchGraph
                  winOrLose={data.winOrLose}
                  winRate={data.winRate}
                />
              </div>
              <RecentPositionGraph data={data.recentPosition} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
