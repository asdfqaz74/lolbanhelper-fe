import { useQuery } from "@tanstack/react-query";
import { userDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import api from "utils/api";

export const useUserData = () => {
  const [userData, setUserData] = useAtom(userDataAtom);

  useQuery({
    queryKey: ["userData"],
    queryFn: () => api.get("/user"),
    onSuccess: (data) => {
      setUserData(data);
    },
  });

  return userData;
};
