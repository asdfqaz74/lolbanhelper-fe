import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";

const ResultTable = ({ userResult, championDatas }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const createData = (name, kills, deaths, assists, result, id) => {
    return { name, kills, deaths, assists, result, id };
  };

  const rows = [
    userResult.map((res) => {
      const championData = championDatas.find(
        (champion) => champion._id === res.champion
      );

      return createData(
        championData.name,
        res.kills,
        res.deaths,
        res.assists,
        res.victoryordefeat,
        res._id
      );
    }),
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: isMobile ? 300 : 500,
        maxHeight: 400,
        whiteSpace: "nowrap",
      }}
    >
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
              key={row.id}
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
