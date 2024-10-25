import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

// Roullete 컴포넌트를 정의합니다.
// Roullete : 대장을 랜덤으로 뽑는 컴포넌트
const Roullete = ({ userList }) => {
  // 랜덤으로 뽑힌 선수를 저장할 상태값을 설정합니다.
  const [randomPlayers, setRandomPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const playableUsers = userList.filter((user) => user.today_player);

  // pickRandomPlayers 함수를 정의합니다.
  // pickRandomPlayers : 선수를 랜덤으로 뽑는 함수
  const pickRandomPlayers = async () => {
    // 선수가 2명 이상인지 확인합니다.
    if (playableUsers.length < 2) {
      setOpenModal(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // 선수 목록을 섞어서 랜덤으로 뽑습니다.
      const shuffled = [...playableUsers];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // 랜덤으로 뽑힌 선수 2명을 저장합니다.
      setRandomPlayers(shuffled.slice(0, 2));

      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Box className="mt-5 flex flex-col items-center justify-center gap-5">
        <p className="font-bold text-[2.125rem] text-title">
          [ 대장을 뽑아주세요 ]
        </p>
        <p>체크된 인원 ({playableUsers.length}명)</p>
        <Button
          variant="contained"
          onClick={pickRandomPlayers}
          className="w-44"
          color="secondary"
        >
          뽑기
        </Button>

        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          randomPlayers.length > 0 && (
            <div className="flex gap-3">
              {randomPlayers.map((player) => (
                <div key={player._id} className="font-semibold">
                  {player.name}
                </div>
              ))}
            </div>
          )
        )}
      </Box>
      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <DialogTitle>대장 뽑기에는 최소 2명의 선수가 필요합니다</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Roullete;
