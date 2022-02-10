import { ItemInCartType } from "../../types/itemType";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [] as ItemInCartType[],
};

const findSameItemInArray = (cartItemSlice, payloadItem) => {
  return cartItemSlice.findIndex(
    (item) =>
      item.id === payloadItem.id &&
      item.addons.length === payloadItem.addons.length &&
      item.addons.filter(
        (arr1) => !payloadItem.addons.find((arr2) => arr1.id === arr2.id)
      ).length === 0
  );
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCart: (state, action) => {
      const payloadItem = action.payload.item;
      // let itemIndex = findSameItemInArray(state.cartItem, payloadItem);
      // if (itemIndex >= 0) {
      //   state.cartItem[itemIndex].quantity += action.payload.quantity;
      // } else {
      //   state.cartItem.push({
      //     ...payloadItem,
      //     quantity: action.payload.quantity,
      //   });
      // }
      state.cartItem.push({
        ...payloadItem,
        quantity: action.payload.quantity,
        orderStatus: 1,
      });
    },
    setCart: (state, action) => {
      state.cartItem = action.payload.item;
    },
    updateCartItem: (state, action) => {
      const payloadItem = action.payload.item;
      state.cartItem.splice(action.payload.index, 1, payloadItem);
    },
    deleteCartItem: (state, action) => {
      state.cartItem.splice(action.payload.index, 1);
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  changeCart,
  setCart,
  clearCart,
  deleteCartItem,
  updateCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
