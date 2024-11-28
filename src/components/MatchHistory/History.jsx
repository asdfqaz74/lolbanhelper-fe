import { Link } from "react-router-dom";
import { DealtBar } from "./DealtBar";

const History = ({ status, oneProcessed, damage }) => {
  if (status === "pending") {
    return (
      <div className="my-10">
        <p className="text-4xl font-bold">최근 게임</p>
        <div className="flex justify-center items-center h-96 bg-slate-300">
          <div className="text-2xl text-gray-400">로딩중입니다.</div>
        </div>
      </div>
    );
  }

  const blueTeam = oneProcessed.slice(0, 5);
  const redTeam = oneProcessed.slice(5, 10);
  const reverseRedTeam = redTeam.toReversed();

  return (
    <div className="my-10">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">최근 게임</p>
        <Link to="/history/group" className="text-center block text-blue-500">
          더보기
        </Link>
      </div>
      <p className="text-center text-xl">
        {blueTeam.win ? (
          <span>
            <span className="text-cyan-500 text-2xl">블루팀</span> 승리
          </span>
        ) : (
          <span>
            <span className="text-rose-500 font-bold text-2xl">레드팀</span>{" "}
            승리
          </span>
        )}
      </p>
      {/* 대표 페이지 */}
      <div className="flex items-center">
        <div className="bg-sky-300 flex p-2 gap-2">
          {blueTeam.map((data) => (
            <>
              <div key={data?.id}>
                <img src={`${data?.small}.jpg`} alt={data?.champion_kr} />
              </div>
            </>
          ))}
        </div>
        <p className="text-4xl font-bold px-10">VS</p>
        <div className="bg-rose-300 flex p-2 gap-2">
          {reverseRedTeam.map((data) => (
            <>
              <div key={data?.id}>
                <img src={`${data?.small}.jpg`} alt={data?.champion_kr} />
              </div>
            </>
          ))}
        </div>
      </div>
      {/* 매치 상세정보 */}
      <div className="bg-slate-300 p-4">
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="w-full bg-gray-500 text-white">
                <th className="w-36">챔피언</th>
                <th className="max-w-28">유저</th>
                <th>K</th>
                <th>D</th>
                <th>A</th>
                <th>CS</th>
                <th className="text-sm text-red-600 bg-red-100">입힌 피해량</th>
                <th className="text-sm text-center">그래프</th>
                <th className="text-sm">받은 피해량</th>
                <th className="text-sm">시야 점수</th>
                <th className="text-sm">와드를 산 횟수</th>
              </tr>
            </thead>
            <tbody>
              {/* 블루팀 상세정보 */}
              {blueTeam.map((data, index) => (
                <tr key={`blueTeam-${index}`} className="bg-sky-200">
                  <td className="flex items-center">
                    <img
                      src={`${data.small}.jpg`}
                      alt={data.champion_kr}
                      className="w-8"
                    />
                    <p>{data.champion_kr}</p>
                  </td>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-28">
                    <p>{data.summonerName}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.kills}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.deaths}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.assists}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.cs}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.totalDamage_dealt}</p>
                  </td>
                  <td className="w-[400px]">
                    <DealtBar data={data} maxDamage={damage} />
                  </td>
                  <td>
                    <p className="text-center">{data.totalDamage_taken}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.visionScore}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.visionWardsBought}</p>
                  </td>
                </tr>
              ))}
              {/* 레드팀 상세정보 */}
              {redTeam.map((data, index) => (
                <tr key={`redTeam-${index}`} className="bg-rose-100">
                  <td className="flex items-center">
                    <img
                      src={`${data.small}.jpg`}
                      alt={data.champion_kr}
                      className="w-8"
                    />
                    <p>{data.champion_kr}</p>
                  </td>
                  <td className="w-32">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.summonerName}
                    </p>
                  </td>
                  <td>
                    <p className="text-center">{data.kills}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.deaths}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.assists}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.cs}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.totalDamage_dealt}</p>
                  </td>
                  <td>
                    <td className="w-[400px]">
                      <DealtBar data={data} maxDamage={damage} />
                    </td>
                  </td>
                  <td>
                    <p className="text-center">{data.totalDamage_taken}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.visionScore}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.visionWardsBought}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
