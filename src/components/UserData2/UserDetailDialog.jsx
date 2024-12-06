import { Dialog } from "@mui/material";
import { useUserDetail } from "hooks/Data";
import { useState } from "react";
import { RecentMatchGraph } from "./RecentMatchGraph";
import { RecentPositionGraph } from "./RecentPositionGraph";
import { HorizonLine } from "components/etc/HorizonLine";
import { RecentMatch } from "./RecentMatch";

export const UserDetailDialog = ({
  open,
  onClose,
  userId,
  userName,
  nickname,
}) => {
  const { data, status } = useUserDetail(userId);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (status === "pending") {
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="p-5 w-[583px]">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-[327px] w-full mb-4"></div>
            <div className="flex justify-between mb-4">
              <div className="flex flex-col gap-2">
                <div className="bg-gray-300 h-6 w-32"></div>
                <div className="bg-gray-300 h-6 w-24"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 h-6 w-24 mb-2"></div>
                <div className="bg-gray-300 h-32 w-32"></div>
              </div>
            </div>
            <div className="bg-gray-300 h-1 w-full mb-4"></div>
            <div className="bg-gray-300 h-6 w-48 mb-2"></div>
            <div className="bg-gray-300 h-24 w-full"></div>
          </div>
        </div>
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ maxHeight: "900px", overflow: "hidden" }}
    >
      <img
        src="/images/placeholder.svg"
        alt=""
        className={`${
          imageLoaded ? "hidden" : "block"
        } w-[36.4375rem] h-[20.4962rem]`}
      />
      <img
        src={`${data?.image}.jpg` || "/images/placeholder.svg"}
        alt=""
        onLoad={handleImageLoad}
        className={`${imageLoaded ? "block" : "hidden"}`}
      />
      <div className="flex flex-col p-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-bold">
              {data?.name || userName || "알수없음"}
            </p>
            <p className="text-2xl text-gray-500">
              {data?.nickname || nickname || "알수없음"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">최근 10게임</p>
            <div className="flex items-center">
              <div className="flex flex-col items-center ">
                {data?.winOrLose && data?.winRate ? (
                  <RecentMatchGraph
                    winOrLose={data.winOrLose}
                    winRate={data.winRate}
                  />
                ) : (
                  <p className="text-gray-500">데이터가 없습니다.</p>
                )}
              </div>
              {data?.recentPosition ? (
                <RecentPositionGraph data={data.recentPosition} />
              ) : (
                <p className="text-gray-500">데이터가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
        <HorizonLine color={"bg-gray-300"} />
        <div className="mt-2">
          <p className="text-2xl font-bold">최근 매치 (5경기)</p>
          {data?.match ? (
            <RecentMatch
              match={data.match}
              matchMe={data.matchMe}
              status={status}
            />
          ) : (
            <p className="text-gray-500">데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </Dialog>
  );
};
