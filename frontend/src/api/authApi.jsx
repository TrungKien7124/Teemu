import axiosClient from "./axiosClient";

const authApi = {
  signIn: (data) => axiosClient.post("/auth/login", data),
  signUp: (data) => axiosClient.post("/auth/register", data),
  me: (data) => axiosClient.get("/auth/me", data),
};

export default authApi;
