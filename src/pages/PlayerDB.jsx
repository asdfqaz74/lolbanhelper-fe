import UserFolder from "components/UserData/userFolder";
import { useChampionData, useResultData, useUserData } from "hooks/Data";

const PlayerDB = () => {
  const userList = useUserData();
  const resultData = useResultData();
  const championData = useChampionData();

  return (
    <div className="flex flex-col mt-5 py-10 px-6 bg-white shadow-2xl justify-between rounded-b-lg mx-4">
      <UserFolder
        user={userList}
        result={resultData}
        championList={championData}
      />
    </div>
  );
};

export default PlayerDB;
