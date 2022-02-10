import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder: (state, action) => {
      const actionOrder = action.payload.order;
      state.orders.push(actionOrder)
    },
    setOrder: (state, action) => {
      state.orders = action.payload.order
    },
  },
});

export const { saveOrder, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
