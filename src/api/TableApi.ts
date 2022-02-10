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
    return axios.get(
      `/api/pos/table-categories?restaurant_id=${restaurant_id}`
    );
  },
  createTableCategory: async (payload: {
    name: string;
    restaurant_id: number;
  }) => {
    return axios.post("/api/pos/table-categories", payload);
  },
  deleteTableCategory: async (table_category_id: number) => {
    return axios.delete(`/api/pos/table-categories/${table_category_id}`);
  },
};
