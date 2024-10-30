import { useEffect, useState } from "react";
import UserFolder from "../components/UserData/userFolder";
import api from "../utils/api";

const PlayerDB = () => {
  const [userList, setUserList] = useState([]);

  const getUser = async () => {
    const response = await api.get("/user");
    setUserList(response.data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col mt-5 py-10 px-6 bg-white shadow-2xl justify-between rounded-b-lg">
      <UserFolder user={userList} />
    </div>
  );
};

export default PlayerDB;
