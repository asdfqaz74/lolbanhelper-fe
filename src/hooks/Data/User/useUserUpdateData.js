import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useUserUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updateData }) =>
      await api.put(`/user/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};
