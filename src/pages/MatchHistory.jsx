import { History, ReadyToHistory } from "components/MatchHistory";
import { useChampionData, useOneProcessed, useUserDatas } from "hooks/Data";
import { useUserDataMap } from "hooks/Data/User/useUserDataMap";

const MatchHistory = () => {
  useChampionData();
  useUserDatas();
  const { data, status } = useOneProcessed();
  const userMap = useUserDataMap();

  return (
    <div className="md:mx-36">
      <History status={status} oneProcessed={data} />
      <ReadyToHistory userMap={userMap} />
    </div>
  );
};

export default MatchHistory;
