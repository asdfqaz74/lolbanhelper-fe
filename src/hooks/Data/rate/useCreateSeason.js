import api from "utils/api";

export const useCreateSeason = async (userID) => {
  try {
    const response = await api.post("/rate", { userID });
    console.log("시즌 종료 성공: ", response.data);
  } catch (e) {
    console.log("시즌 종료 실패: ", e);
  }
};
