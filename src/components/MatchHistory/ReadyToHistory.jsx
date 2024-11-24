import { championDataAtom } from "atoms/dataAtoms";
import { useUnprocessed } from "hooks/Data";
import { useAtom } from "jotai";

const sortedPosition = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

const ReadyToHistory = () => {
  const { unprocessed, status } = useUnprocessed();
  const [championList] = useAtom(championDataAtom);

  // unprocessed를 sortedPosition에 따라 정렬
  const sortedUnprocessed = unprocessed.sort((a, b) => {
    return (
      sortedPosition.indexOf(a.position) - sortedPosition.indexOf(b.position)
    );
  });

  // 블루팀, 레드팀으로 나누기
  const blueTeam = sortedUnprocessed.filter((data) => data.team === "BLUE");
  const redTeam = sortedUnprocessed.filter((data) => data.team === "RED");

  console.log(blueTeam);

  console.log(unprocessed);
  console.log(championList);
  return (
    <div className="flex justify-center items-center h-96">
      <div className="text-2xl text-gray-400">준비중입니다.</div>
    </div>
  );
};

export default ReadyToHistory;
