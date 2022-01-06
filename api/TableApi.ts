import axios from "../utils/axios/AxiosHandler";

export const TableApi = {
  //   createStaff: async (data) => {
  //     return axios.post("/api/pos/store-staff", data);
  //   },
  getTable: async (restaurant_id: number) => {
    return axios.get(`/api/pos/get-restaurant-table-list/${restaurant_id}`);
  },
  editTable: async (restaurant_id: number) => {
    //{
    //  "id" : 1 ,
    //  "name" : "table 123" ,
    //  "table_categories" : [2,3]
    // }
    return axios.get(`/api/pos/update-restaurant-table-list/`);
  },
  getTableCategory: async (restaurant_id: number) => {
    return axios.get(`/api/pos/get-restaurant-table-list/${restaurant_id}`);
  },
};
