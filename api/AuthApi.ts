// import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "../utils/axios/AxiosHandler";

export const authApi = {
  merchantLogin: async (payload: string) => {
    return axios.post("/api/pos/login", payload);
  },
  counterLogin: async (payload: string) => {
    return axios.post("/api/pos/login-counter", payload);
  },
  updatePasscode: async (payload: string) => {
    return axios.post("/api/pos/update-passcode", payload);
  },
};
