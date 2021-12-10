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
import TableTabNavigator from "./TableTabNaivgator";
import { Flex } from "native-base";
import DrawerNavigator from "./DrawerNavigator";
import { useWindowDimensions } from "react-native";

const Stack = createStackNavigator();

const ProtectedNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: isLargeScreen ? false : true,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="Table"
    >
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="TableEdit" component={TableTabNavigator} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Printer" component={PrinterScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedNavigator;
