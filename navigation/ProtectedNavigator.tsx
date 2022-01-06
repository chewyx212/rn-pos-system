import * as React from "react";
import {
  createStackNavigator,
  StackHeaderProps,
  TransitionPresets,
} from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import OrderScreen from "../screens/OrderScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import DrawerNavigator from "./DrawerNavigator";
import PaymentScreen from "../screens/PaymentScreen";
import { Flex, Heading, Icon, IconButton, Image, Text, useColorModeValue } from "native-base";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const ProtectedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        presentation: "card",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
      initialRouteName="StaffSetting"
    >
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Printer" component={PrinterScreen} />
    </Stack.Navigator>
  );
};

const CustomHeader = ({ navigation, route, options }: StackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  // const state = navigation.getState();
  // const state = useNavigationState();
  let routeName = getFocusedRouteNameFromRoute(route) ?? "Order";
  // let actualRoute = state.routes[state.index];

  // while (actualRoute.state) {
  //   actualRoute = actualRoute.state.routes[actualRoute.state.index];
  // }
  return (
    <Flex
      direction="row"
      bg="white"
      shadow={1}
      justify="space-between"
      align="center"
      px={6}
      pb={1}
      mb={1}
      safeAreaTop
    >
      <Flex direction="row" align="center">
        <Image
          w={16}
          h={16}
          alt="bg image"
          source={require("./../assets/logo-min-1.png")}
        />
        <Heading
          fontFamily="sf-pro-display-bold"
          fontWeight={700}
          fontSize={30}
          pl={9}
        >
          {routeName}
        </Heading>
      </Flex>
      <Flex direction="row">
        <IconButton
          _pressed={{
            bg: "bgLightColor.50",
          }}
          icon={
            <Icon
              as={Ionicons}
              name="sync-outline"
              size="sm"
              color="iconColor.grey"
            />
          }
          onPress={() => navigation.navigate("Home", { screen: "Setting" })}
        />
        <IconButton
          ml={6}
          _pressed={{
            bg: useColorModeValue("bgLightColor.50","bgLightCoor.800")
          }}
          icon={
            <Icon
              as={Ionicons}
              name="settings-outline"
              size="sm"
              color="iconColor.grey"
            />
          }
          onPress={() => navigation.navigate("Home", { screen: "Setting" })}
        />
      </Flex>
    </Flex>
  );
};

export default ProtectedNavigator;
