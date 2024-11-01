import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

const ResultTable = ({ userResult, championList }) => {
  const createData = (name, kills, deaths, assists, result) => {
    return { name, kills, deaths, assists, result };
  };

  const rows = [
    userResult.map((res) => {
      const championData = championList.find(
        (champion) => champion._id === res.champion
      );

      return createData(
        championData.name,
        res.kills,
        res.deaths,
        res.assists,
        res.victoryordefeat
      );
    }),
  ];
  console.log(userResult);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400, maxHeight: 400 }}>
      <Table size="small" aria-label="경기 기록" stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#8fa0ff" }}>
            <TableCell sx={{ fontWeight: 900, fontSize: 18 }}>챔피언</TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              K
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              D
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              A
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              승패
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0].map((row) => (
            <TableRow
              key={row.name}
              sx={{
                backgroundColor: row.result === "win" ? "#e5eefa" : "#faf1f2",
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.kills}</TableCell>
              <TableCell align="center">{row.deaths}</TableCell>
              <TableCell align="center">{row.assists}</TableCell>
              <TableCell
                align="center"
                sx={{ color: row.result === "win" ? "blue" : "red" }}
              >
                {row.result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
