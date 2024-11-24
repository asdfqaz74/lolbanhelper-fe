import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useAddManyResult = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/result/many", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resultData"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
