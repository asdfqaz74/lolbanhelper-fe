import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ChampionStats = ({ userResult, championDatas }) => {
  const createData = (name, rateBar, gameCounts, winRate) => {
    return { name, rateBar, gameCounts, winRate };
  };

  const seenChampions = {};

  const row = [
    userResult
      .reduce((acc, res) => {
        // championList에서 해당 챔피언의 이름을 찾아서 반환
        const championData = championDatas.find(
          (champion) => champion._id === res.champion
        );

        // 중복 체크: 이미 처리된 챔피언이라면 건너뜀
        if (!championData || seenChampions[championData.name]) {
          return acc;
        }

        // 유저의 해당 챔피언 전적 필터링
        const userChampionResult = userResult.filter(
          (result) => result.champion === res.champion
        );

        // 해당 챔피언의 전적 중 승리한 게임 수
        const winCounts = userChampionResult.filter(
          (result) => result.victoryordefeat === "win"
        ).length;

        // 해당 챔피언의 전적 중 패배한 게임 수
        const loseCounts = userChampionResult.filter(
          (result) => result.victoryordefeat === "lose"
        ).length;

        // 해당 챔피언의 전적 중 총 게임 수
        const gameCounts = userChampionResult.length;

        // 승률 계산
        const winRate = ((winCounts / gameCounts) * 100).toFixed(2);

        // 해당 챔피언을 처리 목록에 추가
        seenChampions[championData.name] = true;

        // 데이터 생성 후 acc 배열에 추가
        acc.push(
          createData(
            championData.name,
            `${winCounts}승 ${loseCounts}패`,
            gameCounts,
            `${winRate}%`
          )
        );

        return acc;
      }, [])
      .sort((a, b) => {
        if (a.gameCounts > b.gameCounts) return -1;
        if (a.gameCounts < b.gameCounts) return 1;

        const winRateA = parseFloat(a.winRate);
        const winRateB = parseFloat(b.winRate);

        if (winRateA > winRateB) return -1;
        if (winRateA < winRateB) return 1;

        return 0;
      }),
  ];

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 500, maxHeight: 400 }}>
      <Table size="small" aria-label="경기 기록" stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#8fa0ff" }}>
            <TableCell sx={{ fontWeight: 900, fontSize: 18 }}>챔피언</TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              W / L
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              게임 수
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, fontSize: 18 }}>
              승률
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row[0].map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.rateBar}</TableCell>
              <TableCell align="center">{row.gameCounts}</TableCell>
              <TableCell align="center">{row.winRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChampionStats;
