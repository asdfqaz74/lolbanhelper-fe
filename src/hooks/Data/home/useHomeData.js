import { useQuery } from "@tanstack/react-query";
import {
  leastWinChampion,
  mostChampion,
  mostUserWinRate,
  mostWinChampion,
} from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useHomeData = () => {
  const [mostChampionData, setMostChampionData] = useAtom(mostChampion);
  const [mostWinChampionData, setMostWinChampionData] =
    useAtom(mostWinChampion);
  const [leastWinChampionData, setLeastWinChampionData] =
    useAtom(leastWinChampion);
  const [mostUserWinRateData, setMostUserWinRateData] =
    useAtom(mostUserWinRate);

  const { data, status } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const response = await api
        .get("/result/ranking")
        .then((res) => res.data.data);
      return response;
    },
    placeholderData: {
      mostChampion: mostChampionData,
      mostWinChampion: mostWinChampionData,
      leastWinChampion: leastWinChampionData,
      mostUserWinRate: mostUserWinRateData,
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (data && status === "success") {
      setMostChampionData(data.mostChampion);
      setMostWinChampionData(data.mostWinRate);
      setLeastWinChampionData(data.leastChampion);
      setMostUserWinRateData(data.mostUserWinRate);
    }
  }, [
    data,
    setMostChampionData,
    setMostWinChampionData,
    setLeastWinChampionData,
    setMostUserWinRateData,
    status,
  ]);

  return {
    mostChampionData,
    mostWinChampionData,
    leastWinChampionData,
    mostUserWinRateData,
  };
};
