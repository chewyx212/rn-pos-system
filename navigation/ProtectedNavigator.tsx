import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrderScreen from "../screens/OrderScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import DrawerNavigator from "./DrawerNavigator";
import PaymentScreen from "../screens/PaymentScreen";

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
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Printer" component={PrinterScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
