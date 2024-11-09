export const MostWinRateUser = ({ mostUserWinRateData, userList }) => {
  return !mostUserWinRateData ? (
    <p>loading...</p>
  ) : (
    <div>
      {mostUserWinRateData.map((data, index) => {
        const userName = userList.find((user) => user._id === data._id).name;

        return (
          <div key={index}>
            <p>{userName}</p>
            <p>{data.winRate.toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};
