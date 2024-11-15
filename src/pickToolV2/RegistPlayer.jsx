import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { pickUserAtom, progressAtom } from "atoms/userAtoms";
import { useAddUser } from "hooks/Data";

export const RegistPlayer = () => {
  const [userList] = useAtom(userDataAtom); // 유저 데이터
  const [inputValue, setInputValue] = useState(""); // 검색한 선수
  const [registValue, setRegistValue] = useAtom(pickUserAtom); // 선택된 선수
  const [openReset, setOpenReset] = useState(false); // 초기화 다이얼로그
  const [, setStep] = useAtom(progressAtom); // 진행도

  const addUser = useAddUser(); // 선수 추가 함수

  const handleRegister = () => {
    // 선수 중복 방지
    if (registValue.includes(inputValue)) {
      alert("이미 등록된 선수입니다.");
      setInputValue("");
      return;
    }

    // 유저 데이터에 없으면 선수 추가
    if (!userList.find((user) => user.name === inputValue)) {
      addUser.mutate(inputValue, {
        onSuccess: () => {
          setInputValue("");
        },
      });
      setRegistValue((prev) => [...prev, inputValue]);
      setInputValue("");
      return;
    }

    // 선수 등록
    if (inputValue) {
      setRegistValue((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const handleRegisterChecked = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setRegistValue((prev) => [...prev, name]);
    } else {
      setRegistValue((prev) => prev.filter((user) => user !== name));
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
          getOptionLabel={(option) => `${option.name} ${option.game_id}`}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="유저 검색 및 추가"
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
      <div className="bg-primary bg-opacity-30 w-full h-96 pr-20 py-5 text-lg flex justify-between">
        <div className=" h-full overflow-auto pl-4 scrollbar-hide border-r border-primary">
          <img
            src="/images/icon-sub.png"
            alt=""
            className="w-8 place-self-center"
          />
          <FormGroup>
            <div className="grid grid-cols-2 w-60 pl-2">
              {userList.map((user) => (
                <FormControlLabel
                  key={user._id}
                  control={
                    <Checkbox
                      name={user.name}
                      checked={registValue.includes(user.name)}
                      onChange={handleRegisterChecked}
                    />
                  }
                  label={user.name}
                />
              ))}
            </div>
          </FormGroup>
        </div>
        <div className="grid grid-cols-2 gap-6">
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
    </div>
  );
};
