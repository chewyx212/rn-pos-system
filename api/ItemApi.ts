// import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "../utils/axios/AxiosHandler";

export const ItemApi = {
  getItem: async (restaurant_id) => {
    return axios.post(`api/pos/get-restaurant-item/${restaurant_id}`);
  },
};
