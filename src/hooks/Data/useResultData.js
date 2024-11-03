import { useQuery } from "@tanstack/react-query";
import { resultDataAtom } from "atoms/dataAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import api from "utils/api";

export const useResultData = () => {
  const [resultData, setUserData] = useAtom(resultDataAtom);

  const { data, status } = useQuery({
    queryKey: ["resultData"],
    queryFn: async () => {
      const response = await api.get("/result").then((res) => res.data.data);
      return response;
    },
  });

  useEffect(() => {
    if (status === "success" && data) {
      setUserData(data);
    }
  }, [data, setUserData, status]);

  return resultData;
};
