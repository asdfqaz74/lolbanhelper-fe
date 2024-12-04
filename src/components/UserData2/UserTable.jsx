import { WinLoseBar } from "./WinLoseBar";

export const UserTable = ({ recentMatch, status }) => {
  console.log(status);

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
                {index === 0 && "Now Loading..."}
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
              <td className="w-3/12 py-2">
                <div className="bg-gray-500 w-6 rounded-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

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
        {recentMatch.map((data) => {
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
