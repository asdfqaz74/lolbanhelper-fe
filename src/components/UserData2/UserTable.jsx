import { useState } from "react";
import { WinLoseBar } from "./WinLoseBar";

export const UserTable = ({ recentMatch, status }) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

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

  return (
    <table className="table-auto w-full my-10 border-separate border-spacing-y-4">
      <thead>
        <tr>
          <th className="w-1/12"></th>
          <th
            className="w-1/12 cursor-pointer hover:scale-110"
            onClick={() => handleSort("userName")}
          >
            <div className="flex justify-center items-center whitespace-nowrap">
              이름 <img src="/images/asc.svg" alt="" className="w-5" />
            </div>
          </th>
          <th className="w-2/12">닉네임</th>
          <th className="w-1/12 whitespace-nowrap">메인 포지션</th>
          <th className="w-1/12 whitespace-nowrap">서브 포지션</th>
          <th
            className="w-1/12 cursor-pointer hover:scale-110"
            onClick={() => handleSort("totalCount")}
          >
            <div className="flex justify-center items-center whitespace-nowrap">
              총 <img src="/images/asc.svg" alt="" className="w-5" />
            </div>
          </th>
          <th
            className="w-1/12 cursor-pointer hover:scale-110"
            onClick={() => handleSort("winCount")}
          >
            <div className="flex justify-center items-center whitespace-nowrap">
              승 <img src="/images/asc.svg" alt="" className="w-5" />
            </div>
          </th>
          <th
            className="w-1/12 cursor-pointer hover:scale-110"
            onClick={() => handleSort("loseCount")}
          >
            <div className="flex justify-center items-center whitespace-nowrap">
              패 <img src="/images/asc.svg" alt="" className="w-5" />
            </div>
          </th>
          <th className="w-1/12">승률</th>
          <th className="w-3/12">최근 5경기</th>
        </tr>
      </thead>
      <tbody className=" text-center">
        {sortedData.map((data) => {
          const recentMatch = data.recentMatches;
          const isMvp = data.isMvp;
          const isSad = data.isSad;
          return (
            <tr
              key={data.userId}
              className="bg-slate-200 transition-transform hover:scale-105 duration-300 cursor-pointer"
            >
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
              <td className="w-1/12 overflow-hidden whitespace-nowrap text-ellipsis py-2">
                {data.userName}
              </td>
              <td className="w-2/12 overflow-hidden whitespace-nowrap text-ellipsis">
                {data.nickname}
              </td>
              <td className="w-1/12">{data.mainPosition}</td>
              <td className="w-1/12">{data.subPosition}</td>
              <td className="w-1/12">{data.totalCount}</td>
              <td className="w-1/12">{data.winCount}</td>
              <td className="w-1/12">{data.loseCount}</td>
              <td className="w-1/12">{data.userWinRate}%</td>
              <td className="w-3/12 text-center">
                <WinLoseBar recentMatches={recentMatch} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
