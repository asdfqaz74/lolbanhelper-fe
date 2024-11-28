import { useQuery } from "@tanstack/react-query";
import { processedMatchAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useManyProcessed = () => {
  const [, setProcessedMatch] = useAtom(processedMatchAtom);

  const { data, status } = useQuery({
    queryKey: ["processedMatch"],
    queryFn: async () => {
      const response = await api.get("/match/many").then((res) => {
        return res.data.data;
      });

      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (data) {
      setProcessedMatch(data || null);
    }
  }, [data, status, setProcessedMatch]);

  return { data, status };
};
