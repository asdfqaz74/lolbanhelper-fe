import { useEffect, useState } from "react";
import api from "../utils/api";
import { Container } from "react-bootstrap";

const Roster = () => {
  // 상태값을 설정합니다.
  const [nameList, setNameList] = useState([]);
  const [nameValue, setNameValue] = useState("");

  // getUsers 함수를 정의합니다.
  // getUsers : 선수 정보를 가져오는 함수
  const getUsers = async () => {
    const response = await api.get("/user");
    setNameList(response.data);
    console.log(response.data);
    console.log(response.data.data[0].name);
  };

  // useEffect 훅을 사용하여 getUsers 함수를 호출합니다.
  useEffect(() => {
    getUsers();
  }, []);

  // addUser 함수를 정의합니다.
  // addUser : 선수 정보를 추가하는 함수
  const addUser = async () => {
    try {
      const response = await api.post("/user", { name: nameValue });
      if (response.status === 200) {
        getUsers();
      }
    } catch (e) {}
  };

  // JSX를 반환합니다.
  return (
    <>
      <p>선수 명단</p>

      {nameList.length > 0 ? (
        nameList.map((data) => {
          return <div key={data.data._id}>{data.data.name}</div>;
        })
      ) : (
        <p>선수 목록이 없습니다.</p>
      )}

      <Container>
        <input
          type="text"
          placeholder="선수 이름을 입력해주세요"
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
        />
        <button onClick={addUser}>선수 추가</button>
      </Container>
    </>
  );
};

export default Roster;
