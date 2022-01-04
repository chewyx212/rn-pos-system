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
        };
      } else {
        state.stockItems.push({
          id: action.payload.id,
          in_cart: action.payload.quantity,
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
