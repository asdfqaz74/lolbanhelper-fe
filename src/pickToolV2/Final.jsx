import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import {
  checkedAtom,
  currentTeamAtom,
  firstBlueTeamAtom,
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
  winRateAtom,
} from "atoms/userAtoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { OddsWinning } from "./OddsWinning";

export const Final = () => {
  const [step, setStep] = useAtom(progressAtom); // 진행도
  const [, setSelectedPlayer] = useAtom(selectedPlayerAtom); // 선택된 선수
  const [randomPlayers, setRandomPlayers] = useAtom(randomPlayersAtom); // 랜덤으로 뽑힌 대장선수
  const [teamA, setTeamA] = useAtom(teamAAtom); // A팀
  const [teamB, setTeamB] = useAtom(teamBAtom); // B팀
  const [, setRemainingPlayers] = useAtom(remainingPlayersAtom); // 남은 선수
  const [, setHistory] = useAtom(historyAtom); // 히스토리
  const [, setRegistValue] = useAtom(pickUserAtom); // 선택된 선수
  const [, setPickStep] = useAtom(pickStepAtom); // 픽 단계
  const [, setCurrentTeam] = useAtom(currentTeamAtom); // 현재 팀
  const [, setRemainingPickCount] = useAtom(remainingPickCountAtom); // 남은 픽 횟수
  const [, setCheckedUsers] = useAtom(checkedAtom); // 체크된 선수
  const [firstBlueTeam, setFirstBlueTeam] = useAtom(firstBlueTeamAtom); // 선블루팀
  const [initModalOpen, setInitModalOpen] = useState(false); // 초기화 다이얼로그
  const [winRate, setWinRate] = useAtom(winRateAtom); // 승률

  // 이전 단계로 돌아가기
  const handlePrev = () => {
    setStep(2);
  };

  // 초기화 다이얼로그 열기
  const handleInitModal = () => {
    setInitModalOpen(true);
  };

  // 초기화
  const handleInit = () => {
    setStep(0);
    setSelectedPlayer([]);
    setRandomPlayers([]);
    setTeamA([]);
    setTeamB([]);
    setRemainingPlayers([]);
    setHistory([]);
    setRegistValue([]);
    setPickStep(1);
    setCurrentTeam("A");
    setRemainingPickCount(1);
    setCheckedUsers([]);
    setFirstBlueTeam("");
    setWinRate({});

    setInitModalOpen(false);
  };

  // 팀원 위치
  const teamAPosition = [
    "top-10 right-10",
    "top-20 right-20",
    "top-[7.5rem] right-[7.5rem]",
    "top-40 right-40",
  ];
  const teamBPosition = [
    "top-10 left-10",
    "top-20 left-20",
    "top-[7.5rem] left-[7.5rem]",
    "top-40 left-40",
  ];

  return (
    <>
      <div className="w-[45rem] lg:w-[60rem] flex flex-col bg-backgroundLobby h-[30rem] relative">
        <p className="text-4xl text-white text-center my-5">
          <span>선 </span>
          <span className="font-bold text-primary">블루팀</span>은
          <span className="font-bold text-primary"> {firstBlueTeam}</span>팀
          입니다.
        </p>
        <div className="flex flex-col items-center gap-4 justify-center mb-10">
          <p className="text-white font-semibold text-lg">
            <span className="text-primary">
              {winRate?.teamAWinRate > winRate?.teamBWinRate
                ? winRate?.teamAWinRate
                : winRate?.teamBWinRate}
              %{" "}
            </span>
            만큼{" "}
            <span className="text-primary">
              {winRate?.teamAWinRate > winRate?.teamBWinRate
                ? randomPlayers[0]
                : randomPlayers[1]}
              팀
            </span>
            이 이길 확률이 높습니다.
          </p>
          <OddsWinning winRate={winRate} />
        </div>

        <div
          className={`${
            step === 3 ? "animate-fadeIn" : ""
          } flex flex-col gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <img src="/images/clash_logo.svg" alt="" className="w-10" />
          <img src="/images/wordmark-01.svg" alt="" className="w-20" />
        </div>
        <div className="flex w-full justify-around text-white">
          <div className="text-lg font-semibold relative w-1/3">
            <p className="flex justify-end items-center gap-2">
              <img src="/images/captain-icon.png" alt="" className="w-8" />
              {randomPlayers ? randomPlayers[0] : "A"}
            </p>
            {teamA.map((player, index) => (
              <p
                key={index}
                className={`absolute ${teamAPosition[index]} opacity-0  ${
                  step === 3
                    ? `animate-slideInLeft delay-[${index * 0.2}s]`
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationFillMode: "forwards",
                }}
              >
                {player.name}
              </p>
            ))}
          </div>
          <div className="text-lg font-semibold relative w-1/3">
            <p className="flex justify-start items-center gap-2">
              {randomPlayers ? randomPlayers[1] : "B"}
              <img src="/images/captain-icon.png" alt="" className="w-8" />
            </p>
            {teamB.map((player, index) => (
              <p
                key={index}
                className={`absolute ${teamBPosition[index]} opacity-0 ${
                  step === 3 ? `animate-slideInRight` : ""
                }`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationFillMode: "forwards",
                }}
              >
                {player.name}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full mt-10 flex justify-evenly absolute bottom-5">
          <button
            className="bg-dark text-white font-semibold px-10 py-2 rounded-md transform transition-transform hover:scale-105 duration-500"
            onClick={handlePrev}
          >
            이전
          </button>
          <button
            className="text-white font-semibold px-10 py-2 rounded-md transform transition-all duration-500 bg-primary hover:scale-105"
            onClick={handleInitModal}
          >
            처음
          </button>
        </div>
      </div>
      <Dialog onClose={() => initModalOpen(false)} open={initModalOpen}>
        <DialogTitle>초기화를 진행하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleInit}>초기화</Button>
          <Button onClick={() => setInitModalOpen(false)}>아니오</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
