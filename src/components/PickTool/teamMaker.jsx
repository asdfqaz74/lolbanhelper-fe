import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  CircularProgress,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import DraggableUser from "./DraggableUser";
import TeamDropZone from "./TeamDropZone";
import { useOnlyPut, useUserUpdateData } from "hooks/Data";
import { useAtom } from "jotai";
import { checkedAtom } from "atoms/userAtoms";

const TeamMaker = ({ userList }) => {
  // 상태값을 설정합니다.
  const [openReset, setOpenReset] = useState(false); // 팀 초기화 모달창
  const [openRoulette, setOpenRoulette] = useState(false); // 룰렛 모달창
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [showResult, setShowResult] = useState(false); // 결과 보여주기 상태
  const [teamA, setTeamA] = useState(null); // A팀 설정
  const [teamB, setTeamB] = useState(null); // B팀 설정
  const [, setChecked] = useAtom(checkedAtom); // 오늘 출전하는 선수 체크
  const { mutate: assignTeam } = useUserUpdateData(); // 팀 배정 함수
  const { mutate: resetTeam } = useOnlyPut(); // 팀 초기화 함수

  // playableUsers : 오늘 출전 가능한 선수 목록
  const playableUsers = userList.filter((user) => user.today_player);

  // remainingUsers : 오늘 팀이 없는 선수 목록
  const remainingUsers = playableUsers.filter((user) => !user.today_team);

  // assignUserToTeam : 팀에 선수를 배정하는 함수
  const assignUserToTeam = (userId, teamName) => {
    const updateData = { today_team: teamName };

    assignTeam(
      { id: userId, updateData },
      {
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  // handleResetButton : 팀 초기화 함수
  const handleTeamResetButton = () => {
    resetTeam("/user/reset-today", {
      onSuccess: () => {
        setOpenReset(false);
      },
    });
  };

  // handleRosterResetButton : 전체 초기화 함수
  const handleRosterResetButton = () => {
    resetTeam("/user/reset-wait", {
      onSuccess: () => {
        setOpenReset(false);
        setChecked({});
      },
    });
  };

  // handleOpenRoulette : 룰렛 모달창을 열어주는 함수
  const handleOpenRoulette = () => {
    setOpenRoulette(true);
    setLoading(false);
    setShowResult(false);
  };

  // handleRandom : 룰렛을 돌려 팀을 선택하는 함수
  const handleRandom = async () => {
    setLoading(true);
    setShowResult(false);

    const randomIndex = Math.floor(Math.random() * remainingUsers.length);

    const teamAUser = remainingUsers[randomIndex];
    const teamBUser = remainingUsers[1 - randomIndex];

    try {
      // 2초 후에 팀을 선택합니다.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // API 호출로 팀을 선택합니다.
      await Promise.all([
        assignUserToTeam(teamAUser._id, "A"),
        assignUserToTeam(teamBUser._id, "B"),
      ]);

      setTeamA(teamAUser);
      setTeamB(teamBUser);
      setLoading(false);
      setShowResult(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* 대기명단 */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[2.125rem] text-title font-bold ">
            대기인원
          </span>
          <span className="text-title text-sm">(드래그 앤 드롭 해주세요)</span>
        </div>
        <div className="flex gap-10">
          <Button
            variant="contained"
            onClick={handleOpenRoulette}
            disabled={remainingUsers.length === 2 ? false : true}
          >
            룰렛
          </Button>
          <Button variant="contained" onClick={() => setOpenReset(true)}>
            리셋
          </Button>
        </div>
      </div>

      {/* 명단 리스트 */}
      <TeamDropZone
        teamName=""
        onDropUser={assignUserToTeam}
        className="flex gap-4 border w-[68.75rem] h-20 px-5 items-center border-gray-400"
      >
        {userList
          .filter((user) => user.today_player && !user.today_team)
          .map((user) => (
            <DraggableUser key={user._id} user={user} />
          ))}
      </TeamDropZone>

      {/* 팀 목록 */}
      <div className="flex gap-10 mt-10 justify-center">
        {/* A팀 드랍존 */}
        <TeamDropZone
          teamName="A"
          onDropUser={assignUserToTeam}
          className="h-[300px] border border-gray-400 flex flex-col items-center rounded-lg gap-4"
        >
          <p className="text-[2.125rem] text-title font-bold px-32">A팀</p>
          {userList
            .filter((user) => user.today_team === "A")
            .map((user) => (
              <DraggableUser key={user._id} user={user}>
                {user.name}
              </DraggableUser>
            ))}
        </TeamDropZone>
        <TeamDropZone
          teamName="B"
          onDropUser={assignUserToTeam}
          className="h-[300px] border border-gray-400 flex flex-col items-center rounded-lg gap-4"
        >
          <p className="text-[2.125rem] text-title font-bold px-32">B팀</p>
          {userList
            .filter((user) => user.today_team === "B")
            .map((user) => (
              <DraggableUser key={user._id} user={user}>
                {user.name}
              </DraggableUser>
            ))}
        </TeamDropZone>
      </div>

      {/* 팀 초기화 모달창 */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>초기화를 진행하시겠습니까?</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <p>
            <span className="text-dark">전체 초기화</span> : 팀과 대기인원 모두
            초기화 됩니다.
          </p>
          <p>
            <span className="text-dark">팀 초기화</span> : 선택된 팀만 초기화
            됩니다.
          </p>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={handleRosterResetButton}>전체 초기화</Button>
          <Button onClick={handleTeamResetButton}>팀 초기화</Button>
          <Button onClick={() => setOpenReset(false)}>아니오</Button>
        </DialogActions>
      </Dialog>

      {/* 룰렛 모달창 */}
      <Dialog open={openRoulette} onClose={() => setOpenRoulette(false)}>
        <DialogTitle>마지막 팀원의 팀을 뽑아주세요</DialogTitle>
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", gap: 5 }}
        >
          {loading ? (
            <CircularProgress />
          ) : showResult ? (
            <>
              <p>A팀 : {teamA ? teamA.name : "미정"}</p>
              <p>B팀 : {teamB ? teamB.name : "미정"}</p>
            </>
          ) : (
            <p>팀원을 배정하려면 '돌리기!' 버튼을 클릭하세요.</p>
          )}
        </DialogContent>
        <DialogActions>
          {showResult ? (
            <Button
              onClick={() => {
                setOpenRoulette(false);
              }}
            >
              확인
            </Button>
          ) : (
            <Button onClick={handleRandom}>돌리기!</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamMaker;
