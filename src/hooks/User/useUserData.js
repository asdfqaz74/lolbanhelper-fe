import { useQuery } from "@tanstack/react-query";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useUserData = () => {
  const [userData, setUserData] = useAtom(userDataAtom);

  const { data, status } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await api.get("/user").then((res) => res.data.data);
      return response;
    },
  });

  useEffect(() => {
    if (status === "success" && data) {
      setUserData(data);
    }
  }, [status, data, setUserData]);

  return userData;
};
