import { oneProcessedMatchAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";

const History = ({ status }) => {
  const [oneProcessed] = useAtom(oneProcessedMatchAtom);

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

  console.log(oneProcessed);

  const blueTeam = oneProcessed.slice(0, 5);
  const redTeam = oneProcessed.slice(5, 10);
  const reverseRedTeam = redTeam.toReversed();

  console.log(blueTeam, redTeam);
  return (
    <div className="my-10">
      <p className="text-4xl font-bold">최근 게임</p>
      <p className="text-center text-xl">
        {blueTeam.win ? (
          <span>
            <span className="text-cyan-500">블루팀</span> 승리
          </span>
        ) : (
          <span>
            <span className="text-rose-500 font-bold">레드팀</span> 승리
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
                <th className="text-sm text-orange-600 bg-orange-100">
                  입힌 물리피해
                </th>
                <th className="text-sm text-blue-600 bg-blue-100">
                  입힌 마법피해
                </th>
                <th className="text-sm text-purple-600 bg-purple-100">
                  입힌 고정피해
                </th>
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
                  <td>
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
                  <td>
                    <p className="text-center">{data.physicalDamage_dealt}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.magicDamage_dealt}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.trueDamage_dealt}</p>
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
                    <p className="text-center">{data.physicalDamage_dealt}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.magicDamage_dealt}</p>
                  </td>
                  <td>
                    <p className="text-center">{data.trueDamage_dealt}</p>
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
