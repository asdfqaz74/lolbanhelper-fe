import { useState } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Done";
import { Button, IconButton, TextField } from "@mui/material";
import { useAddUser, useUserUpdateData } from "hooks/User";

const Roster = ({ userList }) => {
  // 상태값을 설정합니다.
  const [nameValue, setNameValue] = useState("");
  const [checked, setChecked] = useState({});
  const addUser = useAddUser();
  const { mutate } = useUserUpdateData();
  // addUser 함수를 정의합니다.
  // addUser : 선수 정보를 추가하는 함수

  const handleAddUser = async () => {
    addUser.mutate(nameValue, {
      onSuccess: () => {
        setNameValue("");
      },
    });
  };

  // handleTogglePlayer 함수를 정의합니다.
  // handleTogglePlayer : 오늘 출전하는 선수를 추가하는 함수
  const handleTogglePlayer = async (id) => {
    const todayPlayer = userList.find((user) => user._id === id);

    mutate(
      { id, updateData: { today_player: !todayPlayer.today_player } },
      {
        onSuccess: () => {
          setChecked((prev) => ({
            ...prev,
            [id]: !todayPlayer.today_player,
          }));
        },
      }
    );
  };

  // 선수 목록을 이름 순으로 정렬합니다.
  const sortedUserList = [...userList].sort((a, b) =>
    a.name.localeCompare(b.name, "ko-KR")
  );

  // JSX를 반환합니다.
  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="선수 이름"
          variant="outlined"
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
        />
        <Button onClick={handleAddUser} variant="contained">
          선수 추가
        </Button>
      </Box>
      <Box>
        <Box
          sx={{
            color: "#46505A",
            fontSize: 34,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          선수 명단 ({userList.length}명)
        </Box>
        <div className="border px-4 py-1 h-80 w-80 overflow-auto flex flex-col gap-3">
          {sortedUserList.length > 0 ? (
            sortedUserList.map((data) => {
              return (
                <div
                  key={data._id}
                  className="flex justify-between items-center"
                >
                  <p
                    className={`${
                      data.today_player
                        ? "line-through text-dark text-lg"
                        : "text-lg text-primary"
                    }`}
                  >
                    {data.name}
                  </p>
                  <IconButton
                    size="small"
                    onClick={() => handleTogglePlayer(data._id)}
                    variant="contained"
                  >
                    {checked[data._id] ? (
                      <SendIcon color="secondary" />
                    ) : (
                      <SendIcon />
                    )}
                  </IconButton>
                </div>
              );
            })
          ) : (
            <p>선수 목록이 없습니다.</p>
          )}
        </div>
      </Box>
    </>
  );
};

export default Roster;
