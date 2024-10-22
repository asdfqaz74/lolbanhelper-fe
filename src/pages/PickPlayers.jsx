import { useEffect, useState } from "react";
import Roster from "../components/roster";
import Roullete from "../components/roulette";
import api from "../utils/api";

const PickPlayers = () => {
  // 유저 정보를 저장할 상태값을 설정합니다.
  const [nameList, setNameList] = useState([]);

  // getUser 함수를 정의합니다.
  // getUser : 유저 정보를 가져오는 함수
  const getUser = async () => {
    const response = await api.get("/user");
    setNameList(response.data.data);
  };

  // useEffect 훅을 사용하여 getUser 함수를 호출합니다.
  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <Roster userList={nameList} getUser={getUser} />
      <Roullete userList={nameList} />
    </div>
  );
};

export default PickPlayers;
