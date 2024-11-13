import { Autocomplete, TextField } from "@mui/material";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";

export const RegistPlayer = () => {
  const [userList] = useAtom(userDataAtom);
  console.log(userList);
  return (
    <div className="mt-10">
      <div className="flex items-center">
        <p className="bg-primary text-lg text-white px-4 py-2 flex items-center h-[3.5rem]">
          선수 등록
        </p>
        <Autocomplete
          freeSolo
          sx={{ width: 500 }}
          id="user-search"
          options={userList || []}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="유저 검색"
              variant="filled"
              placeholder="등록할 선수의 이름을 입력하세요"
            />
          )}
        />
        <button className="bg-primary text-white px-4 py-2 h-[3.5rem]">
          등록
        </button>
      </div>
    </div>
  );
};
