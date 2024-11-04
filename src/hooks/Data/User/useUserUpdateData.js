import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useUserUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updateData }) =>
      await api.put(`/user/${id}`, updateData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({
        queryKey: ["oneUserData", variables.id],
      });
    },
  });
};
