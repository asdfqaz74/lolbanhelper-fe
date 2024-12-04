import { WinLoseBar } from "./WinLoseBar";

export const UserTable = ({ recentMatch }) => {
  return (
    <table className="table-auto w-full my-10 border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th></th>
          <th>이름</th>
          <th>닉네임</th>
          <th>메인 포지션</th>
          <th>서브 포지션</th>
          <th>총</th>
          <th>승</th>
          <th>패</th>
          <th>승률</th>
          <th>최근 5경기</th>
        </tr>
      </thead>
      <tbody className="bg-slate-300">
        {recentMatch.map((data) => {
          const recentMatch = data.recentMatches;
          const isMvp = data.isMvp;
          const isSad = data.isSad;
          return (
            <tr key={data.userId}>
              <td>
                {isMvp ? (
                  <img src="/images/honeybee.webp" alt="" className="w-8" />
                ) : isSad ? (
                  <img src="/images/sadbee.png" alt="" className="w-8" />
                ) : (
                  ""
                )}
              </td>
              <td className="py-2">{data.userName}</td>
              <td>{data.nickname}</td>
              <td>{data.mainPosition}</td>
              <td>{data.subPosition}</td>
              <td>{data.totalCount}</td>
              <td>{data.winCount}</td>
              <td>{data.loseCount}</td>
              <td>{data.userWinRate}%</td>
              <td className="text-center">
                <WinLoseBar recentMatches={recentMatch} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
