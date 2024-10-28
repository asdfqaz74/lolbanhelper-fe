import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";

const Rock = () => {
  const [openA, setOpenA] = useState(false);

  const handleTeamA = () => {
    setOpenA(true);
  };

  const handleTeamB = () => {
    console.log("B팀");
  };

  const handleResult = () => {
    console.log("결과 확인");
  };

  const handleTeamAScissors = () => {
    console.log("A팀 가위");
    setOpenA(false);
  };

  const handleTeamARock = () => {
    console.log("A팀 바위");
    setOpenA(false);
  };

  const handleTeamAPaper = () => {
    console.log("A팀 보");
    setOpenA(false);
  };

  return (
    <>
      <h1 className="font-bold text-xl text-title text-center">가위 바위 보</h1>
      <div className="flex justify-between">
        <Button
          variant="contained"
          color="secondary"
          sx={{ paddingX: 5 }}
          onClick={handleTeamA}
        >
          A팀
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ paddingX: 5 }}
          onClick={handleTeamB}
        >
          B팀
        </Button>
      </div>
      <Button
        variant="contained"
        color="secondary"
        sx={{ paddingX: 5 }}
        onClick={handleResult}
      >
        결과 확인
      </Button>

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
    </>
  );
};

export default Rock;
