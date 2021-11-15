import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/OrderScreen";
import TableScreen from "../screens/TableScreen";

const Stack = createNativeStackNavigator();

const ProtectedNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={OrderScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
