import { Box, Button } from "@mui/material";
import { useState } from "react";

const Roullete = ({ userList }) => {
  // 랜덤으로 뽑힌 선수를 저장할 상태값을 설정합니다.
  const [randomPlayers, setRandomPlayers] = useState([]);

  const playableUsers = userList.filter((user) => user.today_player);

  // pickRandomPlayers 함수를 정의합니다.
  // pickRandomPlayers : 선수를 랜덤으로 뽑는 함수
  const pickRandomPlayers = () => {
    // 선수가 2명 이상인지 확인합니다.
    if (playableUsers.length < 2) {
      alert("2명 이상의 선수가 필요합니다.");
      return;
    }

    // 선수 목록을 섞어서 랜덤으로 뽑습니다.
    const shuffled = [...playableUsers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 랜덤으로 뽑힌 선수 2명을 저장합니다.
    setRandomPlayers(shuffled.slice(0, 2));
  };

  return (
    <Box className="mt-5 flex flex-col items-center justify-center gap-5">
      <p className="font-bold text-[2.125rem] text-[#46505A]">
        [ 대장을 뽑아주세요 ]
      </p>
      <p>체크된 인원 ({playableUsers.length}명)</p>
      <Button variant="contained" onClick={pickRandomPlayers} className="w-44">
        뽑기
      </Button>

      {randomPlayers.length > 0 && (
        <div>
          {randomPlayers.map((player) => (
            <div key={player._id}>{player.name}</div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Roullete;
