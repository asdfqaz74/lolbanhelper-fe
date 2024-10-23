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
            {!user.today_team && user.name}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">
                A팀 ({userList.filter((user) => user.today_team === "A").length}
                )
              </th>
              <th className="border border-gray-400 p-2">
                B팀 ({userList.filter((user) => user.today_team === "B").length}
                )
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: Math.max(
                userList.filter((user) => user.today_team === "A").length,
                userList.filter((user) => user.today_team === "B").length
              ),
            }).map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2 text-center">
                  {userList.filter((user) => user.today_team === "A")[
                    index
                  ] && (
                    <span
                      onClick={() =>
                        handleOpenModal(
                          userList.filter((user) => user.today_team === "A")[
                            index
                          ]
                        )
                      }
                      className="cursor-pointer"
                    >
                      {
                        userList.filter((user) => user.today_team === "A")[
                          index
                        ].name
                      }
                    </span>
                  )}
                </td>
                <td className="border border-gray-400 p-2 text-center">
                  {userList.filter((user) => user.today_team === "B")[
                    index
                  ] && (
                    <span
                      onClick={() =>
                        handleOpenModal(
                          userList.filter((user) => user.today_team === "B")[
                            index
                          ]
                        )
                      }
                      className="cursor-pointer"
                    >
                      {
                        userList.filter((user) => user.today_team === "B")[
                          index
                        ].name
                      }
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>
          {selectedUser ? `${selectedUser.name} 님의 팀 선택` : ""}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleTeamSelect("A")}>A팀</Button>
          <Button onClick={() => handleTeamSelect("B")}>B팀</Button>
          <Button onClick={() => handleTeamSelect(null)}>팀 초기화</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamMaker;
