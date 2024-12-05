import { UserTable } from "components/UserData2/UserTable";

const { useRecentMatch } = require("hooks/Data");

const PlayerDB2 = () => {
  const { recentMatch, status } = useRecentMatch();

  return (
    <div className="md:mx-36 flex justify-center">
      <UserTable recentMatch={recentMatch} status={status} />
    </div>
  );
};

export default PlayerDB2;
