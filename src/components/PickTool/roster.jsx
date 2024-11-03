import { useState } from "react";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Done";
import { Button, IconButton, TextField } from "@mui/material";
import { useAddUser, useUserUpdateData } from "hooks/Data";
import { useAtom } from "jotai";
import { checkedAtom } from "atoms/userAtoms";

const Roster = ({ userList }) => {
  const [nameValue, setNameValue] = useState(""); // 선수 이름
  const [checked, setChecked] = useAtom(checkedAtom); // 오늘 출전하는 선수 체크
  const addUser = useAddUser(); // 선수 추가 함수
  const { mutate } = useUserUpdateData(); // 선수 업데이트 함수

  // addUser : 선수 정보를 추가하는 함수
  const handleAddUser = async () => {
    addUser.mutate(nameValue, {
      onSuccess: () => {
        setNameValue("");
      },
    });
  };

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
          {userList.length > 0 ? (
            userList.map((data) => {
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
