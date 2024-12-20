import { useQuery } from "@tanstack/react-query";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useUserDatas = () => {
  const [userData, setUserData] = useAtom(userDataAtom);

  const { data, status } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await api.get("/user").then((res) => res.data.data);
      const sortedData = response.sort((a, b) =>
        a.name.localeCompare(b.name, "ko-KR")
      );
      return sortedData;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (status === "success" && data) {
      setUserData(data);
    }
  }, [data, setUserData, status]);

  return userData;
};
