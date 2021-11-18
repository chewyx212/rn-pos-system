import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};
const item = {
  id: "",
  name: "",
  price: "",
  stock: "",
  restaurant_id: "",
  item_category_id: "",
  image: {},
  item_category: {},
  addons: [],
  quantity: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      addItem: (state, action) => {
          const payloadItem = action.payload.item
          if (state.cartItem.length > 0) {
          let isExisted = state.cartItem.find(item => item.id ===payloadItem.id)
      } else {
        state.cartItem.push(payloadItem);
      }
    },
  },
});

export const { addItem, logout, updateUserInfo } = cartSlice.actions;
export default cartSlice.reducer;
