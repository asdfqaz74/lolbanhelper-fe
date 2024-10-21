import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    return request;
  },
  function (e) {
    console.log("Request Error: ", e);
    return Promise.reject(e);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("Response Error: ", error);
    return Promise.reject(error);
  }
);

export default api;
