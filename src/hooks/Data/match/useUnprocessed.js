import { useQuery } from "@tanstack/react-query";
import { unprocessedMatchAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useUnprocessed = () => {
  const [unprocessed, setUnprocessed] = useAtom(unprocessedMatchAtom);

  const { data, status } = useQuery({
    queryKey: ["unprocessedMatch"],
    queryFn: async () => {
      const response = await api.get("/match").then((res) => res.data.data);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (status === "success" && data) {
      setUnprocessed(data || null);
    }
  }, [data, setUnprocessed, status]);

  return { unprocessed, status };
};
