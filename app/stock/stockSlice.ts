import { createSlice } from "@reduxjs/toolkit";
import { StockItemType } from "../../types/stockType";

const initialState = {
  stockItems: [] as StockItemType[],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addStockItem: (state, action) => {
      const findIndex = state.stockItems.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (state.stockItems.length > 0 && findIndex && findIndex >= 0) {
        state.stockItems[findIndex] = {
          ...state.stockItems[findIndex],
          in_cart:
            state.stockItems[findIndex].in_cart + action.payload.quantity,
          in_kitchen:
            action.payload.status === 2
              ? state.stockItems[findIndex].in_kitchen + action.payload.quantity
              : state.stockItems[findIndex].in_kitchen,
          on_hold:
            action.payload.status === 1
              ? state.stockItems[findIndex].on_hold + action.payload.quantity
              : state.stockItems[findIndex].on_hold,
        };
      } else {
        state.stockItems.push({
          id: action.payload.id,
          in_cart: action.payload.quantity,
          in_kitchen: action.payload.status === 2 ? action.payload.quantity : 0,
          on_hold: action.payload.status === 1 ? action.payload.quantity : 0,
        });
      }
    },
    minusStockItem: (state, action) => {
      const findIndex = state.stockItems.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (state.stockItems.length > 0 && findIndex && findIndex >= 0) {
        if (
          state.stockItems[findIndex].in_cart - action.payload.quantity ===
          0
        ) {
          state.stockItems.splice(findIndex, 1);
        } else {
          state.stockItems[findIndex] = {
            ...state.stockItems[findIndex],
            in_cart:
              state.stockItems[findIndex].in_cart - action.payload.quantity,
            in_kitchen:
              action.payload.status === 2
                ? state.stockItems[findIndex].in_kitchen -
                  action.payload.quantity
                : state.stockItems[findIndex].in_kitchen,
            on_hold:
              action.payload.status === 1
                ? state.stockItems[findIndex].on_hold - action.payload.quantity
                : state.stockItems[findIndex].on_hold,
          };
        }
      }
    },
    updateStockItems: (state, action) => {
      const findIndex = state.stockItems.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (state.stockItems.length > 0 && findIndex && findIndex >= 0) {
        if (action.payload.quantity === 0) {
          state.stockItems.splice(findIndex, 1);
        } else {
          state.stockItems[findIndex] = {
            ...state.stockItems[findIndex],
            in_cart: action.payload.quantity,
            in_kitchen:
              action.payload.status === 2 ? action.payload.quantity : 0,
            on_hold: action.payload.status === 1 ? action.payload.quantity : 0,
          };
        }
      }
    },
    clearStockItems: (state) => {
      state.stockItems = [];
    },
  },
});

export const {
  addStockItem,
  minusStockItem,
  updateStockItems,
  clearStockItems,
} = stockSlice.actions;
export default stockSlice.reducer;
