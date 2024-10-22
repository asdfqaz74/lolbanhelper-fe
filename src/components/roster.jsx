import { useState } from "react";
import api from "../utils/api";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";

const Roster = ({ userList, getUser }) => {
  // 상태값을 설정합니다.
  const [nameValue, setNameValue] = useState("");

  // addUser 함수를 정의합니다.
  // addUser : 선수 정보를 추가하는 함수
  const addUser = async () => {
    try {
      const response = await api.post("/user", { name: nameValue });
      if (response.status === 200) {
        getUser();
        setNameValue("");
      }
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
      if (response.status === 200) {
        getUser();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // JSX를 반환합니다.
  return (
    <>
      <Box sx={{ marginX: 5, marginTop: 5 }}>
        <TextField
          id="outlined-basic"
          label="선수 이름"
          variant="outlined"
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
        />
        <Button onClick={addUser} variant="contained">
          선수 추가
        </Button>
      </Box>
      <Box>
        <Box sx={{ color: "#46505A", fontSize: 34, fontWeight: "bold" }}>
          선수 명단
        </Box>
        {userList.length > 0 ? (
          userList.map((data) => {
            return (
              <div key={data._id} className="justify-between">
                {data.name}
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(data._id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            );
          })
        ) : (
          <p>선수 목록이 없습니다.</p>
        )}
      </Box>
    </>
  );
};

export default Roster;
