
import axios from "../utils/axios/AxiosHandler";

export const TableApi = {
//   createStaff: async (data) => {
//     return axios.post("/api/pos/store-staff", data);
//   },
  getTable: async (restaurant_id: number) => {
    return axios.get(`/api/pos/get-restaurant-table-list/${restaurant_id}`);
  },
};
