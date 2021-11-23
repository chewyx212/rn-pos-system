import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchOrder = async () => {
  try {
    const value = await AsyncStorage.getItem("orders");
    console.log(value);
    if (value) {
      const parseValue = JSON.parse(value);
      if (parseValue[0]) {
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