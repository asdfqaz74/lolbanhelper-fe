import { userDataAtom } from "atoms/dataAtoms";
import {
  currentTeamAtom,
  historyAtom,
  pickStepAtom,
  pickUserAtom,
  progressAtom,
  randomPlayersAtom,
  remainingPickCountAtom,
  remainingPlayersAtom,
  selectedPlayerAtom,
  teamAAtom,
  teamBAtom,
} from "atoms/userAtoms";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

export const PickTeamMate = () => {
  const [, setStep] = useAtom(progressAtom); // 진행도
  const [randomPlayers] = useAtom(randomPlayersAtom); // 랜덤으로 뽑힌 선수
  const [registValue] = useAtom(pickUserAtom); // 선택된 선수
  const [teamA, setTeamA] = useAtom(teamAAtom); // 팀 A
  const [teamB, setTeamB] = useAtom(teamBAtom); // 팀 B
  const [remainingPlayers, setRemainingPlayers] = useAtom(remainingPlayersAtom); // 대장 뽑기 후 남은 선수
  const [currentTeam, setCurrentTeam] = useAtom(currentTeamAtom); // 현재 선택중인 팀
  const [remainingPicks, setRemainingPicks] = useAtom(remainingPickCountAtom); // 남은 선택 횟수
  const [pickStep, setPickStep] = useAtom(pickStepAtom); // 선택 단계
  const [history, setHistory] = useAtom(historyAtom); // 히스토리
  const [userList] = useAtom(userDataAtom); // 유저 데이터
  const [, setSelectedPlayer] = useAtom(selectedPlayerAtom); // 선택된 선수

  // 유저 데이터에서 선택된 선수를 매칭합니다.
  const selectedPlayers = useMemo(() => {
    return userList.filter((user) => registValue.includes(user.name));
  }, [registValue, userList]);

  useEffect(() => {
    setSelectedPlayer(selectedPlayers);
  }, [selectedPlayers, setSelectedPlayer]);

  // 선택된 선수에서 랜덤으로 뽑힌 선수를 제외합니다.
  const filteredPlayers = useMemo(() => {
    return selectedPlayers.filter((user) => !randomPlayers.includes(user.name));
  }, [selectedPlayers, randomPlayers]);

  // A팀 B팀 대장 설정
  const teamALeader = selectedPlayers.find(
    (player) => player.name === randomPlayers[0]
  );
  const teamBLeader = selectedPlayers.find(
    (player) => player.name === randomPlayers[1]
  );

  // 랜덤으로 뽑힌 선수를 제외한 나머지 선수를 저장합니다.
  useEffect(() => {
    const initialRemainingPlayers = filteredPlayers.filter(
      (player) =>
        !teamA.some((teamAPlayer) => teamAPlayer._id === player._id) &&
        !teamB.some((teamBPlayer) => teamBPlayer._id === player._id)
    );
    setRemainingPlayers(initialRemainingPlayers);
  }, [filteredPlayers, setRemainingPlayers, teamA, teamB]);

  // 히스토리 저장
  const saveHistory = () => {
    setHistory((prev) => [
      ...prev,
      {
        teamA,
        teamB,
        remainingPlayers,
        currentTeam,
        remainingPicks,
        pickStep,
      },
    ]);
  };

  // 팀 배정 (A1, B2, A2, B1 순으로 배정)
  const handlePickPlayer = (player) => {
    if (remainingPicks <= 0) return;

    saveHistory();

    // 팀 A, B에 선수를 배정합니다.
    if (currentTeam === "A") {
      setTeamA((prev) => [...prev, player]);
    } else {
      setTeamB((prev) => [...prev, player]);
    }

    // 대기 인원에서 해당 선수 제거
    setRemainingPlayers((prev) =>
      prev.filter((pick) => pick._id !== player._id)
    );

    // 다음 선택 단계로 진행
    if (remainingPicks === 1) {
      // 선택 단계 전환: A1 -> B2 -> A2 -> B1
      if (pickStep === 1) {
        setCurrentTeam("B");
        setRemainingPicks(2);
        setPickStep(2);
      } else if (pickStep === 2) {
        setCurrentTeam("A");
        setRemainingPicks(2);
        setPickStep(3);
      } else if (pickStep === 3) {
        setCurrentTeam("B");
        setRemainingPicks(1);
        setPickStep(4);
      } else if (pickStep === 4) {
        setRemainingPicks(0);
      }
    } else {
      setRemainingPicks((prev) => prev - 1);
    }
  };

  // 마지막 남은 선수 2명을 랜덤 배정
  const assignRemainingRandomly = () => {
    const shuffledRemaining = [...remainingPlayers];
    for (let i = shuffledRemaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRemaining[i], shuffledRemaining[j]] = [
        shuffledRemaining[j],
        shuffledRemaining[i],
      ];
    }
    setTeamA((prev) => [...prev, shuffledRemaining[0]]);
    setTeamB((prev) => [...prev, shuffledRemaining[1]]);
    setRemainingPlayers([]);
  };

  // 되돌리기
  const handleUndo = () => {
    if (history.length === 0) return;

    const lastHistory = history[history.length - 1];
    setTeamA(lastHistory.teamA);
    setTeamB(lastHistory.teamB);
    setRemainingPlayers(lastHistory.remainingPlayers);
    setCurrentTeam(lastHistory.currentTeam);
    setRemainingPicks(lastHistory.remainingPicks);
    setPickStep(lastHistory.pickStep);

    setHistory((prev) => prev.slice(0, -1));
  };

  // 이전 단계로 돌아가기
  const handlePrev = () => {
    setStep(1);
  };

  // 다음 단계로 넘어가기
  const handleNextButton = () => {
    setStep(3);
  };

  const isRandomAssignDisabled = remainingPlayers.length !== 2;
  const isUndoDisabled = history.length === 0;
  const isNextDisabled = !(teamA.length === 4 && teamB.length === 4);
  return (
    <>
      <div className="dblg:w-[75rem] lg:w-[60rem] db:w-[50rem]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex db:text-lg lg:text-2xl font-bold py-10 flex-1 text-center">
            {teamA.length === 4 && teamB.length === 4 ? (
              <p>팀 배정이 완료되었습니다.</p>
            ) : remainingPicks === 0 ? (
              <p>랜덤 배정을 통해 마지막 2명의 선수를 배정합니다.</p>
            ) : (
              <>
                <p className="text-primary ">
                  {currentTeam === "A"
                    ? teamALeader
                      ? teamALeader.name
                      : "A팀 대장"
                    : teamBLeader
                    ? teamBLeader.name
                    : "B팀 대장"}
                  대장님
                </p>
                <p>
                  이 팀을 고르실 차례입니다. (남은 선택 횟수: {remainingPicks})
                </p>
              </>
            )}
          </div>
          <div className="flex gap-4">
            <button
              className={`bg-primary text-white font-semibold rounded-md px-10 py-2 transform transition-all duration-500 ${
                isRandomAssignDisabled
                  ? "bg-slate-500 cursor-not-allowed"
                  : "cursor-pointer hover:scale-105"
              }`}
              onClick={assignRemainingRandomly}
              disabled={isRandomAssignDisabled} // 남은 인원이 2명이 아닐 때는 비활성화
            >
              랜덤 배정
            </button>
            <button
              className={`bg-primary text-white font-semibold rounded-md px-10 py-2 transform transition-all duration-500 ${
                isUndoDisabled
                  ? "bg-slate-500 cursor-not-allowed"
                  : "cursor-pointer hover:scale-105"
              }`}
              onClick={handleUndo}
              disabled={isUndoDisabled} // 되돌릴 히스토리가 없을 때 비활성화
            >
              이전으로
            </button>
          </div>
        </div>
        <div className="w-full h-full flex justify-between items-center flex-col">
          <div className="flex justify-around w-full h-full">
            {/* A팀 */}
            <div
              className={`${
                currentTeam === "A" || remainingPicks === 0
                  ? "bg-primary bg-opacity-35"
                  : "bg-primary bg-opacity-35 opacity-40"
              } flex flex-col w-1/3 h-[24rem] transform transition-all duration-300`}
            >
              <p className="text-xl font-bold mt-4 text-center text-primary">
                팀 {teamALeader ? teamALeader.name : "A"}
              </p>
              <div className="flex flex-col justify-center items-center flex-grow gap-6">
                {teamA.map((player) => (
                  <div key={player._id} className="flex items-center gap-2">
                    {player.isMVP && (
                      <img
                        src="images/honeybee.webp"
                        alt="mvp"
                        className="h-8"
                      />
                    )}
                    <p className="font-semibold">{player.name}</p>
                    <img
                      src={`/images/${player.main_position}.png`}
                      alt={player.main_position}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* 대기열 */}
            <div className="flex flex-col py-4 items-center gap-3 w-1/4 h-[24rem]">
              {remainingPlayers.map((player) => (
                <button
                  key={player._id}
                  onClick={() => handlePickPlayer(player)}
                  className={`${
                    remainingPlayers.length === 2
                      ? "bg-slate-500 cursor-not-allowed"
                      : "bg-primary cursor-pointer"
                  } text-white font-semibold px-2 py-1 w-full hover:scale-105 transform transition-all duration-200 ease-in-out flex items-center justify-center gap-2`}
                >
                  {player.isMVP && (
                    <img src="images/honeybee.webp" alt="mvp" className="h-5" />
                  )}
                  {player.name}
                  <img
                    src={`/images/${player.main_position}.png`}
                    alt={player.main_position}
                    className="h-5"
                  />
                </button>
              ))}
            </div>
            {/* B팀 */}
            <div
              className={`${
                currentTeam === "B" || remainingPicks === 0
                  ? "bg-primary bg-opacity-35"
                  : "bg-primary bg-opacity-35 opacity-40"
              } flex flex-col w-1/3 h-[24rem] transform transition-all duration-300`}
            >
              <p className="text-xl font-bold mt-4 text-center text-primary">
                팀 {teamBLeader ? teamBLeader.name : "B"}
              </p>
              <div className="flex flex-col justify-center items-center flex-grow gap-6">
                {teamB.map((player) => (
                  <div key={player._id} className="flex items-center gap-2">
                    {player.isMVP && (
                      <img
                        src="images/honeybee.webp"
                        alt="mvp"
                        className="h-8"
                      />
                    )}
                    <p className="font-semibold">{player.name}</p>
                    <img
                      src={`/images/${player.main_position}.png`}
                      alt={player.main_position}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-evenly mt-4">
            <button
              className="bg-dark text-white font-semibold px-10 py-2 rounded-md transform transition-transform hover:scale-105 duration-500"
              onClick={handlePrev}
            >
              이전
            </button>
            <button
              onClick={handleNextButton}
              disabled={isNextDisabled}
              className={`${
                isNextDisabled
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-primary hover:scale-105"
              } text-white font-semibold px-10 py-2 rounded-md transform transition-all duration-500`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
