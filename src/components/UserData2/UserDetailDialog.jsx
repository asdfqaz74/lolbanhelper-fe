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
          src={`${data.main_character_image.image}.jpg`}
          alt=""
          onLoad={handleImageLoad}
          className={`${imageLoaded ? "block" : "hidden"}`}
        />
        <div>{data.name}</div>
        <div>{data.nickname}</div>
        <div className="flex">
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">최근 10게임</p>
            <RecentMatchGraph
              winOrLose={data.winOrLose}
              winRate={data.winRate}
            />
          </div>
          <RecentPositionGraph data={data.recentPosition} />
        </div>
      </div>
    </Dialog>
  );
};
