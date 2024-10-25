import { Dialog, DialogActions, Button, DialogTitle } from "@mui/material";
import { useState } from "react";
import api from "../../utils/api";

const TeamMaker = ({ userList }) => {
  // 상태값을 설정합니다.
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // playableUsers : 오늘 출전 가능한 선수 목록
  const playableUsers = userList.filter((user) => user.today_player);

  // 선수 목록을 이름 순으로 정렬합니다.
  const sortedUserList = [...playableUsers].sort((a, b) =>
    a.name.localeCompare(b.name, "ko-KR")
  );

  // handleOpenModal 함수를 정의합니다.
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // handleResetButton 함수를 정의합니다.
  // handleResetButton : 팀 초기화 함수
  const handleTeamResetButton = async () => {
    try {
      const response = await api.put("/user/reset-today");

      if (response.status === 200) {
        setOpenReset(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handleTeamSelect 함수를 정의합니다.
  // handleTeamSelect : 팀을 선택하는 함수
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
    setOpen(false);
  };

  // handleRosterResetButton 함수를 정의합니다.
  // handleRosterResetButton : 대기명단 초기화 함수
  const handleRosterResetButton = async () => {
    try {
      const response = await api.put("/user/reset-wait");

      if (response.status === 200) {
        setOpenReset(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[2.125rem] text-title font-bold ">대기인원</p>
        <Button
          variant="contained"
          onClick={() => setOpenReset(true)}
          color="secondary"
        >
          리셋
        </Button>
      </div>
      <div className="flex gap-4 border w-[62.5rem] h-20 px-5 items-center bg-light border-gray-400">
        {sortedUserList
          .filter((user) => !user.today_team)
          .map((user) => (
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
              <th className="border border-gray-400 p-2 bg-light">
                A팀 ({userList.filter((user) => user.today_team === "A").length}
                )
              </th>
              <th className="border border-gray-400 p-2 bg-light">
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

      {/* 팀 선택 모달창 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {selectedUser ? `${selectedUser.name} 님의 팀 선택` : ""}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleTeamSelect("A")} color="secondary">
            A팀
          </Button>
          <Button onClick={() => handleTeamSelect("B")} color="secondary">
            B팀
          </Button>
          <Button onClick={() => handleTeamSelect("")} color="secondary">
            대기인원으로
          </Button>
        </DialogActions>
      </Dialog>

      {/* 팀 초기화 모달창 */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>팀 초기화를 하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleRosterResetButton} color="secondary">
            전체 초기화
          </Button>
          <Button onClick={handleTeamResetButton} color="secondary">
            팀 초기화
          </Button>
          <Button onClick={() => setOpenReset(false)} color="secondary">
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamMaker;
