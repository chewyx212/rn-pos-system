import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrderScreen from "../screens/OrderScreen";
import TableScreen from "../screens/TableScreen";

const Stack = createStackNavigator();

const ProtectedNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="Order"
    >
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Menu" component={TableScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
