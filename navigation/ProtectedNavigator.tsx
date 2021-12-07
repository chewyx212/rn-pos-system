import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrderScreen from "../screens/OrderScreen";
import TableScreen from "../screens/TableScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import TableListScreen from "../screens/TableListScreen";

const Stack = createStackNavigator();

const ProtectedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="Table"
    >
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="TableList" component={TableListScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Printer" component={PrinterScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
