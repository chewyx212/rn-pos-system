import axios from "../utils/axios/AxiosHandler";

export const StaffApi = {
  createStaff: async (data) => {
    return axios.post("/api/pos/store-staff", data);
  },
  getStaff: async (restaurant_id: number) => {
    return axios.get(`/api/pos/get-staff/${restaurant_id}`);
  },
};
