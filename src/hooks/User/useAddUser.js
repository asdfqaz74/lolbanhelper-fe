import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name) => {
      const response = await api.post("/user", { name });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
