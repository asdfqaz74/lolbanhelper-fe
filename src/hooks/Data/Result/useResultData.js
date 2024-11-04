import { useQuery } from "@tanstack/react-query";
import { resultDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useResultData = () => {
  const [resultData, setResultData] = useAtom(resultDataAtom);

  const { data, status } = useQuery({
    queryKey: ["resultData"],
    queryFn: async () => {
      const response = await api.get("/result").then((res) => res.data.data);
      return response;
    },
    placeholderData: resultData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (status === "success" && data && data !== resultData) {
      setResultData(data);
    }
  }, [data, setResultData, status, resultData]);

  return resultData;
};
