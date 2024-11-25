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
        console.log(res.data.data.statsJson);
        return res.data.data.statsJson;
      });
      console.log("status1", status);
      console.log("response", response);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  console.log("status2", status);
  console.log("data", data);

  useEffect(() => {
    console.log("useEffect status", status);
    console.log("data2", data);
    if (data) {
      setOneProcessed(data || null);
    }
  }, [data, status]);

  return { data, status };
};
