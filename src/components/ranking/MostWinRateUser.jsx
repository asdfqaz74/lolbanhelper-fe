export const MostWinRateUser = ({ mostUserWinRateData, userList }) => {
  const rankImages = ["1st.png", "2nd.png", "3rd.png"];

  return !mostUserWinRateData ? (
    <p>loading...</p>
  ) : (
    <div className="bg-light flex flex-col border px-2 py-3 min-w-60 md:min-w-96">
      <p className="text-base md:text-2xl font-semibold text-center mb-5 text-dark">
        승률 베스트 5 플레이어
      </p>
      <div className="flex flex-col gap-3 mb-3">
        {mostUserWinRateData.slice(0, 3).map((data, index) => {
          const userName = userList.find((user) => user._id === data._id).name;

          return (
            <div key={index} className="flex items-center gap-3">
              <img
                src={`/images/${rankImages[index]}`}
                alt=""
                className="w-10"
              />
              <div>
                <p className="text-lg font-semibold">{userName}</p>
                <div className="flex gap-2">
                  <p>{data.total}게임</p>
                  <p>{(data.winRate * 100).toFixed(2)}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
        {mostUserWinRateData.slice(3).map((data, index) => {
          const userName = userList.find((user) => user._id === data._id).name;

          return (
            <div key={index + 3}>
              <p className="font-semibold text-lg text-primary text-center">
                {index + 4}위
              </p>
              <p className="text-center">{userName}</p>
              <div className="flex gap-2 text-sm">
                <p>{data.total}게임</p>
                <p>{(data.winRate * 100).toFixed(2)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
