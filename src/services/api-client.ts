import axios, { CanceledError } from "axios";
import { refresh } from "./user-service";


const backend_url = "https://node76.cs.colman.ac.il/"

export { CanceledError };
const apiClient = axios.create({
  baseURL: backend_url,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      //place your reentry code
      const originalRequest = error.config;
      const currentUser = localStorage.getItem("currentUser");

      if (currentUser) {
        const parsedCurrentUser = JSON.parse(currentUser);
        const res = await refresh(parsedCurrentUser.refreshToken);

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...parsedCurrentUser,
            refreshToken: res.refreshToken,
            accessToken: res.accessToken,
          })
        );

        originalRequest.headers["Authorization"] = `JWT ${res.accessToken}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
