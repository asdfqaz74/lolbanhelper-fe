import { useQuery } from "@tanstack/react-query";
import { recentMatchAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useRecentMatch = () => {
  const [recentMatch, setRecentMatch] = useAtom(recentMatchAtom);

  const { data, status } = useQuery({
    queryKey: ["recentMatch"],
    queryFn: async () => {
      const response = await api
        .get("/result/recent")
        .then((res) => res.data.data);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (status === "success" && data && data !== recentMatch) {
      setRecentMatch(data);
    }
  }, [data, setRecentMatch, status, recentMatch]);

  return { recentMatch, status };
};
