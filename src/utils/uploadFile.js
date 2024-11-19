import axios from "axios";

const BACK_END_API = process.env.REACT_APP_BACKEND_URL;

export const uploadRoflFile = async (file) => {
  const formData = new FormData();
  formData.append("roflFile", file);

  try {
    const response = await axios.post(
      `${BACK_END_API}/api/match/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
