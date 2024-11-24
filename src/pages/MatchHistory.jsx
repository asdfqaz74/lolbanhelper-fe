import { History, ReadyToHistory } from "components/MatchHistory";
import { useChampionData, useUserDatas } from "hooks/Data";
import { useUserDataMap } from "hooks/Data/User/useUserDataMap";

const MatchHistory = () => {
  useChampionData();
  useUserDatas();
  const userMap = useUserDataMap();

  return (
    <div className="md:mx-36">
      <History />
      <ReadyToHistory userMap={userMap} />
    </div>
  );
};

export default MatchHistory;
