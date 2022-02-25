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
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  Box,
  useColorModeValue,
  useColorMode,
} from "native-base";
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
        cardShadowEnabled: true,
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
  let routeName = getFocusedRouteNameFromRoute(route) ?? title;
  return (
    <Flex
      direction="row"
      bg={useColorModeValue("white", "greyColor.1000")}
      shadow={1}
      justify="space-between"
      align="center"
      px={{ base: 4, md: 6 }}
      pb={1}
      safeAreaTop
    >
      <Flex direction="row" align="center">
        {routeName === "Payment" ? (
          <IconButton
            _icon={{
              color: "primary.500",
              size: "8",
            }}
            py={4}
            colorScheme="primary"
            icon={<Icon as={Ionicons} name="arrow-back" size="sm" />}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Image
            w={{ base: 12, md: 16 }}
            h={{ base: 12, md: 16 }}
            alt="bg image"
            source={require("./../assets/logo-min-1.png")}
          />
        )}
        <Heading
          fontFamily="sf-pro-display-bold"
          fontWeight={800}
          fontSize={{ base: 24, md: 30 }}
          pl={{ base: 3, md: 8 }}
        >
          {routeName}
        </Heading>
      </Flex>
      <Flex direction="row" align="center">
        <IconButton
          _pressed={{
            bg: "greyColor.50",
          }}
          icon={
            <Icon
              as={Ionicons}
              name="sync-outline"
              size="sm"
              color={useColorModeValue(
                "iconColor.lightGrey",
                "iconColor.darkGrey"
              )}
            />
          }
          onPress={useColorMode().toggleColorMode}
        />
        {/* <IconButton
          ml={{ base: 2, md: 6 }}
          _pressed={{
            bg: useColorModeValue("greyColor.50", "greyColor.800"),
          }}
          icon={
            <Icon
              as={Ionicons}
              name="settings-outline"
              size="sm"
              color={useColorModeValue(
                "iconColor.lightGrey",
                "iconColor.darkGrey"
              )}
            />
          }
          onPress={() => navigation.navigate("Home", { screen: "Setting" })}
        /> */}
      </Flex>
    </Flex>
  );
};

export default ProtectedNavigator;
