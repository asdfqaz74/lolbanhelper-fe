import { SearchBar } from "components/UserData/SearchBar";
import UserFolder from "components/UserData/userFolder";
import { useChampionData, useResultData, useUserDatas } from "hooks/Data";

const PlayerDB = () => {
  const userList = useUserDatas();
  const resultData = useResultData();
  useChampionData();

  return (
    <div className="flex flex-col my-5 py-10 px-6 justify-between rounded-b-lg mx-4">
      <SearchBar />
      <UserFolder userList={userList} resultData={resultData} />
    </div>
  );
};

export default PlayerDB;
