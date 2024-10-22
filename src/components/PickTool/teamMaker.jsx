import { Dialog, DialogActions, Button, DialogTitle } from "@mui/material";
import { useState } from "react";
import api from "../../utils/api";

const TeamMaker = ({ userList }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const playableUsers = userList.filter((user) => user.today_player);

  const sortedUserList = [...playableUsers].sort((a, b) =>
    a.name.localeCompare(b.name, "ko-KR")
  );

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleTeamSelect = async (team) => {
    try {
      const response = await api.put(`/user/${selectedUser._id}`, {
        today_team: team,
      });
      if (response.status === 200) {
        setSelectedUser(null);
      }
    } catch (e) {
      console.log(e);
    }
    handleCloseModal();
  };

  return (
    <div>
      <p className="text-[2.125rem] text-[#46505A] font-bold">대기인원</p>
      <div className="flex gap-2 border w-[62.5rem] h-20 px-2 items-center">
        {sortedUserList.map((user) => (
          <div
            key={user._id}
            onClick={() => handleOpenModal(user)}
            className="cursor-pointer text-lg"
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="flex mt-5">
        <div>
          <p>A팀</p>
        </div>
        <div>
          <p>B팀</p>
        </div>
      </div>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>
          {selectedUser ? `${selectedUser.name} 님의 팀 선택` : ""}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleTeamSelect("A")}>A팀</Button>
          <Button onClick={() => handleTeamSelect("B")}>B팀</Button>
          <Button onClick={handleCloseModal}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamMaker;
