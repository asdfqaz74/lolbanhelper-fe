import { useQuery } from "@tanstack/react-query";
import { oneProcessedMatchAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useOneProcessed = () => {
  const [, setOneProcessed] = useAtom(oneProcessedMatchAtom);

  const { data, status } = useQuery({
    queryKey: ["oneProcessedMatch"],
    queryFn: async () => {
      const response = await api.get("/match/one").then((res) => {
        return res.data.data.statsJson;
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (data) {
      setOneProcessed(data || null);
    }
  }, [data, status, setOneProcessed]);

  return { data, status };
};
