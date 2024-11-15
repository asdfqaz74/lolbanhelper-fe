import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import {
  checkedAtom,
  pickUserAtom,
  progressAtom,
  randomPlayersAtom,
} from "atoms/userAtoms";
import { useAtom } from "jotai";
import { useState } from "react";

export const PickTeamLeader = () => {
  const [registValue] = useAtom(pickUserAtom); // 선택된 선수
  const [checkedUsers, setCheckedUsers] = useAtom(checkedAtom); // 체크된 선수
  const [, setStep] = useAtom(progressAtom); // 진행도
  const [openPickLeaderModal, setOpenPickLeaderModal] = useState(false); // 대장 뽑기 다이얼로그
  const [showResult, setShowResult] = useState(false); // 결과 보여주기 상태
  const [randomPlayers, setRandomPlayers] = useAtom(randomPlayersAtom); // 랜덤으로 뽑힌 선수

  console.log(checkedUsers);
  // 이전 단계로 돌아가기
  const handlePrev = () => {
    setStep(0);
  };

  // 다음 단계로 넘어가기
  const handleNextButton = () => {
    setStep(2);
  };

  const handleCheckedBoxChange = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setCheckedUsers((prev) => [...prev, name]);
    } else {
      setCheckedUsers((prev) => prev.filter((user) => user !== name));
    }
  };

  const handlePickLeader = () => {
    setOpenPickLeaderModal(true);
  };

  const handleConfirmPick = () => {
    setShowResult(true);

    setTimeout(() => {
      // 선수 목록을 섞어서 랜덤으로 뽑습니다.
      const shuffled = [...checkedUsers];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // 랜덤으로 뽑힌 선수 2명을 저장합니다.
      setRandomPlayers(shuffled.slice(0, 2));

      setShowResult(false);
    }, 1000);
  };

  const isNextDisabled = randomPlayers.length === 0;

  return (
    <div className="flex flex-col items-center w-[50rem]">
      <p className="text-2xl font-bold mb-5">대장을 뽑아주세요!</p>
      <div className="flex justify-evenly w-full items-start">
        <div className="flex flex-col">
          <p className="text-center">대장 후보를 골라주세요</p>
          <div className="flex px-2 py-2 bg-primary bg-opacity-35">
            <FormGroup>
              <div className="grid grid-cols-2 h-96 w-60 pl-2">
                {registValue.map((user) => (
                  <FormControlLabel
                    key={user}
                    control={
                      <Checkbox
                        name={user}
                        checked={checkedUsers.includes(user)}
                        onChange={handleCheckedBoxChange}
                      />
                    }
                    label={user}
                  />
                ))}
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          <div className="bg-primary bg-opacity-35 mt-6 w-64 px-4 py-4 flex flex-col gap-6">
            <div className="flex gap-4 text-lg">
              <p className="text-red-400 font-bold">A팀(선) :</p>
              <p className="font-bold">
                {randomPlayers ? randomPlayers[0] : ""}
              </p>
            </div>
            <div className="flex gap-4 text-lg">
              <p className="text-blue-400 font-bold">B팀(후) :</p>
              <p className="font-bold">
                {randomPlayers ? randomPlayers[1] : ""}
              </p>
            </div>
          </div>
          <button
            onClick={handlePickLeader}
            className="bg-dark text-white font-semibold rounded-md px-10 py-2 transform transition-transform duration-500 hover:scale-110"
          >
            대장 뽑기
          </button>
        </div>
      </div>
      <div className="flex justify-evenly w-full mt-5">
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

      {/* 대장 뽑기 다이얼로그 */}
      <Dialog
        onClose={() => setOpenPickLeaderModal(false)}
        open={openPickLeaderModal}
      >
        <DialogTitle>대장 뽑기를 진행하겠습니다.</DialogTitle>
        <div className="flex flex-col items-center gap-4 p-6">
          {showResult ? (
            <CircularProgress />
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-xl font-bold">대장 뽑기 결과</p>
              <div className="text-center text-2xl font-semibold">
                {randomPlayers.length > 0 ? (
                  <>
                    <div className="flex gap-2">
                      <p className="mb-3 text-red-400">A팀(선) : </p>
                      <p> {randomPlayers[0]}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-blue-400">B팀(선) : </p>
                      <p> {randomPlayers[1]}</p>
                    </div>
                  </>
                ) : (
                  "선수가 선택되지 않았습니다."
                )}
              </div>
            </div>
          )}
        </div>
        <DialogActions>
          {showResult ? (
            // 결과 화면에서 확인 버튼만 보이게 설정
            <Button
              onClick={() => setOpenPickLeaderModal(false)}
              color="primary"
              variant="contained"
            >
              확인
            </Button>
          ) : randomPlayers.length > 0 ? (
            // 대장 뽑기가 완료된 상태에서 확인 버튼 표시
            <div className="flex items-center justify-end w-full gap-5">
              <Button
                onClick={handleConfirmPick}
                color="primary"
                variant="contained"
              >
                다시 뽑기
              </Button>
              <Button
                onClick={() => setOpenPickLeaderModal(false)}
                color="primary"
                variant="contained"
              >
                확인
              </Button>
            </div>
          ) : (
            // 대장 뽑기 버튼 표시
            <Button
              onClick={handleConfirmPick}
              color="primary"
              variant="contained"
            >
              대장 뽑기
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
