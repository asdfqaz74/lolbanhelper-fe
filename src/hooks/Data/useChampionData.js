import { useQuery } from "@tanstack/react-query";
import { championDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useChampionData = () => {
  const [championData, setChampionData] = useAtom(championDataAtom);

  const { data, status } = useQuery({
    queryKey: ["championData"],
    queryFn: async () => {
      const response = await api
        .get("/result/champion")
        .then((res) => res.data.data);
      return response;
    },
  });

  useEffect(() => {
    if (status === "success" && data) {
      setChampionData(data);
    }
  }, [data, setChampionData, status]);

  return championData;
};
