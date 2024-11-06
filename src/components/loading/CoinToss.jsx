import Lottie from "react-lottie";
import animationData from "./cointoss.json";
import { Button, Dialog } from "@mui/material";
import { useState } from "react";

const CoinToss = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClick = () => {
    setOpenModal(true);
    setShowResult(false);
    setResult("");

    setTimeout(() => {
      const randomResult = Math.random() > 0.5 ? "팀 A" : "팀 B";
      setResult(randomResult);
      setShowResult(true);
    }, 1500);
  };

  return (
    <>
      <div className="flex flex-col gap-10 p-4 items-center">
        <p className="font-bold text-xl text-title text-center">팀 정하기</p>
        <Button variant="contained" onClick={handleClick} sx={{ width: 150 }}>
          동전 던지기
        </Button>
      </div>
      <div className="flex justify-center"></div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex flex-col items-center gap-4 p-4">
          {!showResult ? (
            <Lottie options={defaultOptions} height={300} width={300} />
          ) : (
            <>
              <div className="flex flex-col gap-5 justify-center items-center">
                <p className="text-xl font-bold">동전 던지기 결과</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
              <Button onClick={() => setOpenModal(false)}>확인</Button>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CoinToss;
