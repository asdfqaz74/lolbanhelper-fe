import { pickUserAtom, progressAtom, randomPlayersAtom } from "atoms/userAtoms";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

export const PickTeamMate = () => {
  const [, setStep] = useAtom(progressAtom); // 진행도
  const [randomPlayers] = useAtom(randomPlayersAtom); // 랜덤으로 뽑힌 선수
  const [registValue] = useAtom(pickUserAtom); // 선택된 선수
  const [teamA, setTeamA] = useState([]); // 팀 A
  const [teamB, setTeamB] = useState([]); // 팀 B
  const [remainingPlayers, setRemainingPlayers] = useState([]); // 마지막 2명의 선수
  const [currentTeam, setCurrentTeam] = useState("A"); // 현재 선택중인 팀
  const [remainingPicks, setRemainingPicks] = useState(1); // 남은 선택 횟수
  const [pickStep, setPickStep] = useState(1); // 선택 단계
  const [history, setHistory] = useState([]); // 히스토리

  // 선택된 선수에서 랜덤으로 뽑힌 선수를 제외합니다.
  const filteredPlayers = useMemo(() => {
    return registValue.filter((player) => !randomPlayers.includes(player));
  }, [registValue, randomPlayers]);

  // A팀 B팀 대장 설정
  const teamALeader = randomPlayers[0];
  const teamBLeader = randomPlayers[1];

  // 랜덤으로 뽑힌 선수를 제외한 나머지 선수를 저장합니다.
  useEffect(() => {
    setRemainingPlayers(filteredPlayers);
  }, [filteredPlayers]);

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
    setRemainingPlayers((prev) => prev.filter((pick) => pick !== player));

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

  const handlePrev = () => {
    setStep(1);
  };

  const isRandomAssignDisabled = remainingPlayers.length !== 2;
  const isUndoDisabled = history.length === 0;
  return (
    <>
      <div className="w-[75rem]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex text-2xl font-bold py-10 flex-1 text-center">
            <p className="text-primary ">
              {currentTeam === "A" ? teamALeader : teamBLeader} 대장님
            </p>
            <p>이 팀을 고르실 차례입니다. (남은 선택 횟수: {remainingPicks})</p>
          </div>
          <div className="flex gap-4">
            <button
              className={`bg-gray-800 text-white font-semibold px-8 py-2 rounded-md transform transition-transform hover:scale-105 duration-500 ${
                isRandomAssignDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={assignRemainingRandomly}
              disabled={isRandomAssignDisabled} // 남은 인원이 2명이 아닐 때는 비활성화
            >
              랜덤 배정
            </button>
            <button
              className={`bg-gray-800 text-white font-semibold px-8 py-2 rounded-md transform transition-transform hover:scale-105 duration-500 ${
                isUndoDisabled ? "cursor-not-allowed" : "cursor-pointer"
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
            <div className="bg-emerald-400 flex flex-col w-1/3 h-[24rem]">
              <p className="text-xl font-bold mt-4 text-center">
                팀 {teamALeader}
              </p>
              <div className="flex flex-col justify-center items-center flex-grow">
                {teamA.map((player) => (
                  <p key={player}>{player}</p>
                ))}
              </div>
            </div>
            <div className="bg-red-400 flex flex-col py-4 items-center gap-3 w-1/4 h-[24rem]">
              {remainingPlayers.map((player) => (
                <button
                  key={player}
                  onClick={() => handlePickPlayer(player)}
                  className="bg-gray-200 text-black px-2 py-1 rounded-md"
                >
                  {player}
                </button>
              ))}
            </div>
            <div className="bg-sky-400 flex flex-col w-1/3 h-[24rem]">
              <p className="text-xl font-bold mt-4 text-center">
                팀 {teamBLeader}
              </p>
              <div className="flex flex-col justify-center items-center flex-grow">
                {teamB.map((player) => (
                  <p key={player}>{player}</p>
                ))}
              </div>
            </div>
          </div>
          <button
            className="bg-dark text-white font-semibold px-10 py-2 rounded-md transform transition-transform hover:scale-105 duration-500 mt-4"
            onClick={handlePrev}
          >
            이전
          </button>
        </div>
      </div>
    </>
  );
};