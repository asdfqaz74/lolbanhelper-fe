import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "utils/api";

export const useUserUpdateData = (id) => {
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: (updateData) => api.put(`/user/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });
};
