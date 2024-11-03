import { useQuery } from "@tanstack/react-query";
import api from "utils/api";

export const useOneUserData = (userId) => {
  return useQuery({
    queryKey: ["oneUserData", userId],
    queryFn: async () => {
      const response = await api.get(`/user/${userId}`);
      return response.data.data[0];
    },
    staleTime: 1000 * 60 * 5,
  });
};
