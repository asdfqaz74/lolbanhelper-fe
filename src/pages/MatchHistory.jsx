import { History, ReadyToHistory } from "components/MatchHistory";
import { useChampionData, useUserDatas } from "hooks/Data";

const MatchHistory = () => {
  useChampionData();
  useUserDatas();
  return (
    <div className="md:mx-36">
      <History />
      <ReadyToHistory />
    </div>
  );
};

export default MatchHistory;
