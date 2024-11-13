import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { pickUserAtom, progressAtom } from "atoms/userAtoms";

export const RegistPlayer = () => {
  const [userList] = useAtom(userDataAtom); // 유저 데이터
  const [inputValue, setInputValue] = useState(""); // 검색한 선수
  const [registValue, setRegistValue] = useAtom(pickUserAtom); // 선택된 선수
  const [openReset, setOpenReset] = useState(false); // 초기화 다이얼로그
  const [openNext, setOpenNext] = useState(false); // 다음 다이얼로그
  const [, setStep] = useAtom(progressAtom); // 진행도

  const handleRegister = () => {
    // 선수 중복 방지
    if (registValue.includes(inputValue)) {
      alert("이미 등록된 선수입니다.");
      setInputValue("");
      return;
    }

    // 선수 등록
    if (inputValue) {
      setRegistValue((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  // 전체 초기화
  const handleRosterResetButton = () => {
    setRegistValue([]);
    setOpenReset(false);
  };

  // 다음 단계로 넘어가기
  const handleNextButton = () => {
    setStep(1);
    setOpenNext(false);
  };

  const isRegisterDisabled = !inputValue || registValue.length >= 10;
  const isNextDisabled = registValue.length <= 9;

  return (
    <div className="my-10 flex flex-col items-center w-[50rem]">
      <div className="flex w-full items-center whitespace-nowrap">
        <label
          htmlFor="user-search"
          className="bg-dark text-lg text-white px-4 py-2 flex items-center h-[3.5rem]"
        >
          선수 검색
        </label>
        <Autocomplete
          freeSolo
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              height: "3.5rem",
              backgroundColor: "white",
              borderRadius: "0",
            },
          }}
          id="user-search"
          options={userList || []}
          getOptionLabel={(option) => option.name}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="유저 검색"
              variant="outlined"
              placeholder="등록할 선수의 이름을 입력하세요"
              sx={{ backgroundColor: "white" }}
            />
          )}
        />
        <button
          className={`${
            isRegisterDisabled
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-dark cursor-pointer hover:scale-110"
          } text-white px-4 py-2 h-[3.5rem] transform transition-all duration-300`}
          onClick={handleRegister}
          disabled={isRegisterDisabled}
        >
          등록
        </button>
      </div>
      <div className="bg-primary bg-opacity-30 w-full h-96 px-20 py-5 text-lg ">
        <div className="grid grid-cols-2 justify-items-center gap-6">
          {registValue.map((player, index) => {
            const user = userList.find((user) => user.name === player);
            const userMainLine = user?.main_position;
            const userMvp = user?.isMVP;
            const gameID = user?.game_id;
            return (
              <div key={index}>
                <div className="flex gap-2 items-center">
                  {userMainLine && (
                    <img
                      src={`images/${userMainLine}.png`}
                      alt={userMainLine}
                      className="h-8"
                    />
                  )}
                  <p>{player}</p>
                  {userMvp && (
                    <img src="images/honeybee.webp" alt="mvp" className="h-8" />
                  )}
                  <RemoveCircleOutlineIcon
                    sx={{ color: "red", cursor: "pointer", width: 15 }}
                    onClick={() =>
                      setRegistValue((prev) =>
                        prev.filter((name) => name !== player)
                      )
                    }
                  />
                </div>
                {gameID && <p className="text-xs text-slate-500">{gameID}</p>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-around w-full mt-5">
        <button
          onClick={() => setOpenReset(true)}
          className="bg-dark text-white font-semibold px-10 py-2 rounded-md transform transition-transform hover:scale-105 duration-500"
        >
          초기화
        </button>
        <button
          onClick={() => setOpenNext(true)}
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

      {/* 초기화 다이얼로그 */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>초기화를 진행하시겠습니까?</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        ></DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleRosterResetButton}>초기화</Button>
          <Button onClick={() => setOpenReset(false)}>아니오</Button>
        </DialogActions>
      </Dialog>

      {/* 다음 다이얼로그 */}
      <Dialog open={openNext} onClose={() => setOpenNext(false)}>
        <DialogTitle>다음 단계로 넘어가시겠습니까?</DialogTitle>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleNextButton}>네</Button>
          <Button onClick={() => setOpenNext(false)}>아니오</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};