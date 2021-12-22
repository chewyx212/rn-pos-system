// import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "../utils/axios/AxiosHandler";

export const AuthApi = {
  merchantLogin: async (data: { input: string; password: string }) => {
    return axios.post("/api/pos/login", data);
  },
  counterLogin: async (payload: { pos_password: string }) => {
    return axios.post("/api/pos/login-counter", payload);
  },
  updatePasscode: async (payload: {
    user_id: string;
    pos_password: string;
  }) => {
    return axios.post("/api/pos/update-password", payload);
  },
};
