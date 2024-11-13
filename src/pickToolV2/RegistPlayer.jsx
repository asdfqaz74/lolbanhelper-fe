import { Autocomplete, TextField } from "@mui/material";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useState } from "react";

export const RegistPlayer = () => {
  const [userList] = useAtom(userDataAtom);
  const [inputValue, setInputValue] = useState("");
  const [registValue, setRegistValue] = useState([]);

  const handleRegister = () => {
    if (inputValue) {
      setRegistValue((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  console.log(userList);
  return (
    <div className="mt-10 flex flex-col items-center w-[50rem]">
      <div className="flex w-full items-center whitespace-nowrap">
        <p className="bg-dark text-lg text-white px-4 py-2 flex items-center h-[3.5rem]">
          선수 검색
        </p>
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
          className="bg-dark text-white px-4 py-2 h-[3.5rem]"
          onClick={handleRegister}
        >
          등록
        </button>
      </div>
      <div className="bg-primary bg-opacity-30 w-full h-96 px-20 py-14 text-lg ">
        <div className="grid grid-cols-2 justify-items-center gap-8">
          {registValue.map((player, index) => (
            <p key={index}>{player}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
