import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useOnlyPut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (endpoint) => {
      await api.put(endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
