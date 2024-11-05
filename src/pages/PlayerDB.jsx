import UserFolder from "components/UserData/userFolder";
import { useChampionData, useResultData, useUserDatas } from "hooks/Data";

const PlayerDB = () => {
  const userList = useUserDatas();
  const resultData = useResultData();
  useChampionData();

  return (
    <div className="flex flex-col mt-5 py-10 px-6 bg-white shadow-2xl justify-between rounded-b-lg mx-4">
      <UserFolder userList={userList} resultData={resultData} />
    </div>
  );
};

export default PlayerDB;
