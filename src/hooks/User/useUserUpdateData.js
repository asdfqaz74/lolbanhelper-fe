import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useUserUpdateData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateData }) => api.put(`/user/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};
