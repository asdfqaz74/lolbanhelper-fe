import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../utils/api";

const Rock = () => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [result, setResult] = useState(null);

  // 각 팀 가위바위보 모달창 열기
  const handleTeamA = async () => {
    setResult(false);
    await api.post("/game/cancel");
    setOpenA(true);
  };
  const handleTeamB = async () => {
    setResult(false);
    await api.post("/game/cancel");
    setOpenB(true);
  };

  // 결과 확인
  const handleResult = () => {
    setOpenResult(true);
  };

  useEffect(() => {}, []);

  // 결과 확인 모달창 확인 버튼
  const handleConfirm = async () => {
    try {
      const response = await api.post("/game/finalize");
      const resultResponse = await api.get("/game/result");

      if (response.status === 200) {
        setResult({
          choiceA: resultResponse.data.choiceA,
          choiceB: resultResponse.data.choiceB,
          outcome: resultResponse.data.data,
        });
        setOpenResult(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 각 팀 가위바위보 선택
  // A팀
  const handleTeamAScissors = async () => {
    try {
      const response = await api.put("/game", {
        team: "A",
        team_choice: "Scissors",
      });

      if (response.status === 200) {
        setOpenA(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleTeamARock = async () => {
    try {
      const response = await api.put("/game", {
        team: "A",
        team_choice: "Rock",
      });

      if (response.status === 200) {
        setOpenA(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleTeamAPaper = async () => {
    try {
      const response = await api.put("/game", {
        team: "A",
        team_choice: "Paper",
      });

      if (response.status === 200) {
        setOpenA(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // B팀
  const handleTeamBScissors = async () => {
    try {
      const response = await api.put("/game", {
        team: "B",
        team_choice: "Scissors",
      });

      if (response.status === 200) {
        setOpenB(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleTeamBRock = async () => {
    try {
      const response = await api.put("/game", {
        team: "B",
        team_choice: "Rock",
      });

      if (response.status === 200) {
        setOpenB(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleTeamBPaper = async () => {
    try {
      const response = await api.put("/game", {
        team: "B",
        team_choice: "Paper",
      });

      if (response.status === 200) {
        setOpenB(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl text-title text-center">가위 바위 보</h1>
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Button
            variant="contained"
            color="secondary"
            sx={{ paddingX: 5 }}
            onClick={handleTeamA}
          >
            A팀
          </Button>
          {result ? (
            <img
              src={`images/${result.choiceA}.png`}
              alt=""
              className="h-12 object-contain"
            />
          ) : (
            <div className="h-12"></div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Button
            variant="contained"
            color="secondary"
            sx={{ paddingX: 5 }}
            onClick={handleTeamB}
          >
            B팀
          </Button>
          {result && (
            <img
              src={`images/${result.choiceB}.png`}
              alt=""
              className="h-12 object-contain"
            />
          )}
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        sx={{ paddingX: 5 }}
        onClick={handleResult}
      >
        결과 확인
      </Button>
      {result && <p className="text-center">{result.outcome}</p>}

      {/* 팀A 가위바위보 */}
      <Dialog open={openA} onClose={() => setOpenA(false)}>
        <DialogTitle>A팀 가위바위보</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleTeamAScissors}>
            가위
          </Button>
          <Button color="secondary" onClick={handleTeamARock}>
            바위
          </Button>
          <Button color="secondary" onClick={handleTeamAPaper}>
            보
          </Button>
        </DialogActions>
      </Dialog>

      {/* 팀B 가위바위보 */}
      <Dialog open={openB} onClose={() => setOpenB(false)}>
        <DialogTitle>B팀 가위바위보</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleTeamBScissors}>
            가위
          </Button>
          <Button color="secondary" onClick={handleTeamBRock}>
            바위
          </Button>
          <Button color="secondary" onClick={handleTeamBPaper}>
            보
          </Button>
        </DialogActions>
      </Dialog>

      {/* 결과 확인 모달창 */}
      <Dialog open={openResult} onClose={() => setOpenResult(false)}>
        <DialogTitle>결과를 확인하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleConfirm}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Rock;
