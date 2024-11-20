import { useUnprocessed } from "hooks/Data";

const ReadyToHistory = () => {
  const { unprocessed, status } = useUnprocessed();

  if (status === "loading") {
    return <div>로딩중...</div>;
  }

  if (!unprocessed || unprocessed.length === 0) {
    return <div>처리되지 않은 매치가 없습니다.</div>;
  }

  const blueTeam = unprocessed.filter((data) => data?.team === "BLUE");
  const redTeam = unprocessed.filter((data) => data?.team === "RED");

  console.log("처리되지 않은 매치", unprocessed);
  // console.log("블루팀", blueTeam);

  return (
    <div className="">
      <p>아이디를 넣어주세요</p>
      <p>블루팀</p>
      {blueTeam.map((data, index) => (
        <div key={index}>
          {data.map((user, userIndex) => (
            <p key={userIndex}>{user.champion}</p>
          ))}
        </div>
      ))}
      <p>레드팀</p>
      {redTeam.map((data, index) => (
        <div key={index}>
          {data.map((user, userIndex) => (
            <p key={userIndex}>{user.champion}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReadyToHistory;
