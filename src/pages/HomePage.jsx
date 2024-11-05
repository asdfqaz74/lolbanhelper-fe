import { useChampionData, useResultData, useUserDatas } from "hooks/Data";

const HomePage = () => {
  useChampionData();
  useUserDatas();
  useResultData();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
