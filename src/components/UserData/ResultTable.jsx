import { Paper, Table, TableContainer, TableHead } from "@mui/material";

// {userResult.map((res) => {
//   const championData = championList.find(
//     (champion) => champion._id === res.champion
//   );

//   // 해당 챔피언의 승리 횟수
//   const winCount = userResult.filter(
//     (result) =>
//       result.champion === res.champion &&
//       result.victoryordefeat === "win"
//   ).length;

//   // 해당 챔피언의 패배 횟수
//   const loseCount = userResult.filter(
//     (result) =>
//       result.champion === res.champion &&
//       result.victoryordefeat === "lose"
//   ).length;

//   // 해당 챔피언의 게임 수
//   const totalCount = winCount + loseCount;

//   // 해당 챔피언의 승률
//   const winRate = Math.round((winCount / totalCount) * 100);
//   return (
//     <>
//       <div key={championData._id}>
//         <span className="font-bold">
//           챔피언{championData.name}
//         </span>
//         <span className="font-bold">킬{res.kills}</span>
//         <span className="font-bold">데스{res.deaths}</span>
//         <span className="font-bold">
//           어시스트
//           {res.assists}
//         </span>
//         <span>승패 {res.victoryordefeat}</span>
//       </div>
//     </>
//   );
// })}

const ResultTable = ({ userResult }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="경기 기록">
        <TableHead></TableHead>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
