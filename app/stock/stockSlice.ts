import AsyncStorage from "@react-native-async-storage/async-storage";
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
    setStockItems: (state, action) => {
      state.stockItems = [...action.payload.items];
    },
    updateStockItems: (state, action) => {
      action.payload.items.forEach((item: { id: number; quantity: number }) => {
        const findIndex = state.stockItems.findIndex(
          (stock) => stock.id === item.id
        );
        if (state.stockItems.length > 0 && findIndex && findIndex >= 0) {
          if (item.quantity === 0) {
            state.stockItems.splice(findIndex, 1);
          } else {
            state.stockItems[findIndex] = {
              ...state.stockItems[findIndex],
              in_cart: item.quantity,
            };
          }
        } else {
          state.stockItems.push({
            id: item.id,
            in_cart: item.quantity,
          });
        }
      });

      AsyncStorage.setItem("stocks", JSON.stringify(state.stockItems));
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
  setStockItems,
} = stockSlice.actions;
export default stockSlice.reducer;
