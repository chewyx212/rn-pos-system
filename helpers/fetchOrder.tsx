import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../app/hooks";

export const fetchOrder = async () => {
  try {
    const value = await AsyncStorage.getItem("orders");
    if (value) {
      const parseValue = JSON.parse(value);
      if (parseValue[0]) {
        console.log(JSON.parse(value));
        return JSON.parse(value);
      }
    }
    return [];
  } catch (e) {
    // saving error
    return [];
  }
};

export const storeOrder = async (orders) => {
  try {
    const value = await AsyncStorage.setItem("orders", JSON.stringify(orders));
  } catch (e) {
    // saving error
    return [];
  }
};
