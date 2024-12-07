import { useState } from "react";
import { WinLoseBar } from "./WinLoseBar";
import { useMediaQuery } from "@mui/material";
import { UserDetailDialog } from "./UserDetailDialog";

export const UserTable = ({ recentMatch, status }) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [dialogUserId, setDialogUserId] = useState(null);
  const [dialogUserName, setDialogUserName] = useState(null);
  const [dialogNickname, setDialogNickname] = useState(null);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (status !== "success") {
    return (
      <table className="table-auto w-full my-10 border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="w-1/12"></th>
            <th className="w-1/12">이름</th>
            <th className="w-2/12">닉네임</th>
            <th className="w-1/12 whitespace-nowrap">메인 포지션</th>
            <th className="w-1/12 whitespace-nowrap">서브 포지션</th>
            <th className="w-1/12">총</th>
            <th className="w-1/12">승</th>
            <th className="w-1/12">패</th>
            <th className="w-1/12">승률</th>
            <th className="w-3/12">최근 5경기</th>
          </tr>
        </thead>
        <tbody className=" text-center">
          {Array.from({ length: 15 }).map((_, index) => (
            <tr key={index} className="bg-slate-300 animate-pulse h-10">
              <td className="w-1/12 py-2"></td>
              <td className="w-1/12 py-2 text-center whitespace-nowrap">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-2/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-1/12 py-2">
                <div className="h-5 mx-auto w-1/2 bg-gray-500 rounded"></div>
              </td>
              <td className="w-3/12 flex justify-evenly py-2 text-center"></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const sortData = (data) => {
    if (!sortConfig.key) return data;

    const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = sortData(recentMatch);

  const handleRowClick = (userId, userName, nickname) => {
    setDialogUserId(userId);
    setDialogUserName(userName);
    setDialogNickname(nickname);
  };

  const handleCloseDialog = () => {
    setDialogUserId(null);
    setDialogUserName(null);
    setDialogNickname(null);
  };

  return (
    <>
      <table
        className={`table-auto w-full ${
          isMobile ? "" : "min-w-[50.9375rem]"
        } my-10 border-collapse`}
      >
        <thead className="bg-[#CCCDDE] h-12">
          <tr>
            {!isMobile && <th className="w-1/12"></th>}
            <th
              className="w-1/12 cursor-pointer hover:scale-110"
              onClick={() => handleSort("userName")}
            >
              <div className="flex justify-center items-center whitespace-nowrap">
                이름{" "}
                {isDesktop && (
                  <img src="/images/asc.svg" alt="" className="w-5" />
                )}
              </div>
            </th>
            <th className="w-2/12">닉네임</th>
            {!isMobile && (
              <th className="w-1/12 whitespace-nowrap">
                {isDesktop ? "메인 포지션" : "메인"}
              </th>
            )}
            {!isMobile && (
              <th className="w-1/12 whitespace-nowrap">
                {isDesktop ? "서브 포지션" : "서브"}
              </th>
            )}
            <th
              className="w-1/12 cursor-pointer hover:scale-110"
              onClick={() => handleSort("totalCount")}
            >
              <div className="flex justify-center items-center whitespace-nowrap">
                총{" "}
                {isDesktop && (
                  <img src="/images/asc.svg" alt="" className="w-5" />
                )}
              </div>
            </th>
            <th
              className="w-1/12 cursor-pointer hover:scale-110"
              onClick={() => handleSort("winCount")}
            >
              <div className="flex justify-center items-center whitespace-nowrap">
                승{" "}
                {isDesktop && (
                  <img src="/images/asc.svg" alt="" className="w-5" />
                )}
              </div>
            </th>
            <th
              className="w-1/12 cursor-pointer hover:scale-110"
              onClick={() => handleSort("loseCount")}
            >
              <div className="flex justify-center items-center whitespace-nowrap">
                패{" "}
                {isDesktop && (
                  <img src="/images/asc.svg" alt="" className="w-5" />
                )}
              </div>
            </th>
            <th className="w-1/12">승률</th>
            {!isMobile && <th className="w-3/12">최근 5경기</th>}
          </tr>
        </thead>
        <tbody className=" text-center ">
          {sortedData.map((data) => {
            const {
              userId,
              userName,
              nickname,
              recentMatches,
              isMvp,
              isSad,
              mainPosition,
              subPosition,
              totalCount,
              winCount,
              loseCount,
              userWinRate,
            } = data;

            return (
              <tr
                key={userId}
                className="border-[#C1C9F8] border-y bg-[#F1F2FF] hover:bg-[#D4D7FF]  cursor-pointer transition-colors duration-200"
                onClick={() => handleRowClick(userId, userName, nickname)}
              >
                {!isMobile && (
                  <td className="w-1/12">
                    {isMvp ? (
                      <img
                        src="/images/honeybee.webp"
                        alt=""
                        className="w-8 mx-auto"
                      />
                    ) : isSad ? (
                      <img
                        src="/images/sadbee.png"
                        alt=""
                        className="w-8 mx-auto"
                      />
                    ) : (
                      ""
                    )}
                  </td>
                )}
                <td className="w-1/12 overflow-hidden whitespace-nowrap text-ellipsis py-2">
                  {userName}
                </td>
                <td className="w-2/12 overflow-hidden whitespace-nowrap text-ellipsis">
                  {nickname}
                </td>
                {!isMobile && <td className="w-1/12">{mainPosition}</td>}
                {!isMobile && <td className="w-1/12">{subPosition}</td>}
                <td className="w-1/12">{totalCount}</td>
                <td className="w-1/12">{winCount}</td>
                <td className="w-1/12">{loseCount}</td>
                <td className="w-1/12">{userWinRate}%</td>
                {!isMobile && (
                  <td className="w-3/12 text-center whitespace-nowrap">
                    <WinLoseBar recentMatches={recentMatches} />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <UserDetailDialog
        open={!!dialogUserId}
        userId={dialogUserId}
        onClose={handleCloseDialog}
        userName={dialogUserName}
        nickname={dialogNickname}
      />
    </>
  );
};
