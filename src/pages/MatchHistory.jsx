import { History, ReadyToHistory } from "components/MatchHistory";
import { useChampionData, useOneProcessed, useUserDatas } from "hooks/Data";
import { useUserDataMap } from "hooks/Data/User/useUserDataMap";

const MatchHistory = () => {
  useChampionData();
  useUserDatas();
  const status = useOneProcessed();
  const userMap = useUserDataMap();

  return (
    <div className="md:mx-36">
      <History status={status} />
      <ReadyToHistory userMap={userMap} />
    </div>
  );
};

export default MatchHistory;
