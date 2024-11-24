import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useUpdateProcessed = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put("/match", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unprocessedMatch"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
