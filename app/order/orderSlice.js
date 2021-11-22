import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder: async (state, action) => {
      const actionOrder = action.payload.order;
      try {
        const value = await AsyncStorage.getItem("orders");
        console.log(value);
        if (value) {
          console.log(JSON.parse(value));
          state.orders = JSON.parse(value);
        }
        state.orders.push(actionOrder);
        const jsonValue = JSON.stringify(state.orders);
        await AsyncStorage.setItem("orders", jsonValue);
      } catch (e) {
        // saving error
      }
    },
    fetchOrder: async (state, action) => {
      state.orders = [];
      try {
        const value = await AsyncStorage.getItem("orders");
        console.log(value);
        if (value) {
          console.log(JSON.parse(value));
          state.orders = JSON.parse(value);
        }
      } catch (e) {
        // saving error
      }
    },
  },
});

export const { saveOrder, fetchOrder } = orderSlice.actions;
export default orderSlice.reducer;
