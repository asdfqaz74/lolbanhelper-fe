import { useQuery } from "@tanstack/react-query";
import api from "utils/api";

export const useUserDetail = (userId) => {
  const { data, status } = useQuery({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      const response = await api
        .get(`/user/detail/${userId}`)
        .then((res) => res.data.data);
      return response;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });

  return { data, status };
};
