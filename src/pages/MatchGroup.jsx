import { DealtBar } from "components/MatchHistory/DealtBar";
import { useManyProcessed } from "hooks/Data";
import { useState } from "react";

const MatchGroup = () => {
  const { data, status } = useManyProcessed();
  const [clickMatch, setClickMatch] = useState({});

  if (status !== "success" || !data) {
    return <div>Loading...</div>;
  }

  const handleClickMatch = (matchId) => {
    setClickMatch((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };

  return (
    <div className="md:mx-36 my-10">
      <p className="font-bold text-primary text-2xl mb-10">
        클릭 시 상세내용을 볼 수 있습니다
      </p>
      {data.map((match) => {
        const team = match.statsJson;
        const blueTeam = team.slice(0, 5);
        const redTeam = team.slice(5, 10);
        const reverseRedTeam = redTeam.toReversed(); // redTeam의 역순

        const isClicked = clickMatch[match._id];
        return (
          <div key={match._id} className="mb-10">
            <div>
              <div>
                {blueTeam[0].win ? (
                  <span>
                    <span className="text-cyan-500 font-bold text-2xl">
                      블루팀
                    </span>{" "}
                    승리
                  </span>
                ) : (
                  <span>
                    <span className="text-rose-500 font-bold text-2xl">
                      레드팀
                    </span>{" "}
                    승리
                  </span>
                )}
              </div>
              <div
                className="flex items-center bg-slate-300 p-2 cursor-pointer"
                onClick={() => handleClickMatch(match._id)}
              >
                <div className="flex">
                  {blueTeam.map((data) => (
                    <div key={data?.id} className="bg-sky-300 flex p-2 gap-2">
                      <img src={`${data?.small}.jpg`} alt={data?.champion_kr} />
                    </div>
                  ))}
                </div>
                <span className="text-4xl font-bold px-10">vs</span>
                <div>
                  <div className="flex">
                    {reverseRedTeam.map((data) => (
                      <div
                        key={data?.id}
                        className="bg-rose-300 flex p-2 gap-2"
                      >
                        <img
                          src={`${data?.small}.jpg`}
                          alt={data?.champion_kr}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ease-in-out ${
                  isClicked ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
              >
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
                          <th className="text-sm text-red-600 bg-red-100">
                            입힌 피해량
                          </th>
                          <th className="text-sm text-center">그래프</th>
                          <th className="text-sm">받은 피해량</th>
                          <th className="text-sm">시야 점수</th>
                          <th className="text-sm">와드를 산 횟수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 블루팀 상세정보 */}
                        {blueTeam.map((player, index) => (
                          <tr key={`blueTeam-${index}`} className="bg-sky-200">
                            <td className="flex items-center">
                              <img
                                src={`${player.small}.jpg`}
                                alt={player.champion_kr}
                                className="w-8"
                              />
                              <p>{player.champion_kr}</p>
                            </td>
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis ">
                              <p>{player.summonerName}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.kills}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.deaths}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.assists}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.cs}</p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.totalDamage_dealt}
                              </p>
                            </td>
                            <td className="w-[400px]">
                              <DealtBar data={player} maxDamage={match} />
                            </td>
                            <td>
                              <p className="text-center">
                                {player.totalDamage_taken}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.visionScore}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.visionWardsBought}
                              </p>
                            </td>
                          </tr>
                        ))}
                        {/* 레드팀 상세정보 */}
                        {redTeam.map((player, index) => (
                          <tr key={`redTeam-${index}`} className="bg-rose-100">
                            <td className="flex items-center">
                              <img
                                src={`${player.small}.jpg`}
                                alt={player.champion_kr}
                                className="w-8"
                              />
                              <p>{player.champion_kr}</p>
                            </td>
                            <td className="w-32">
                              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                {player.summonerName}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">{player.kills}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.deaths}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.assists}</p>
                            </td>
                            <td>
                              <p className="text-center">{player.cs}</p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.totalDamage_dealt}
                              </p>
                            </td>
                            <td>
                              <td className="w-[400px]">
                                <DealtBar data={player} maxDamage={match} />
                              </td>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.totalDamage_taken}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.visionScore}
                              </p>
                            </td>
                            <td>
                              <p className="text-center">
                                {player.visionWardsBought}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchGroup;
