
import axios from "../utils/axios/AxiosHandler";

export const ItemApi = {
  getItem: async (restaurant_id: number) => {
    return axios.get(`api/pos/get-restaurant-item/${restaurant_id}`);
  },
};
