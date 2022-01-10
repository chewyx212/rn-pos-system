import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TableScreen from "../screens/TableScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import { useWindowDimensions } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import {
  Flex,
  Icon,
  Text,
  Pressable,
  useColorModeValue,
  Image,
} from "native-base";
import MenuScreen from "../screens/MenuScreen";
import MemberScreen from "../screens/MemberScreen";
import TransactionScreen from "../screens/TransactionScreen";
import SettingScreen from "../screens/SettingSceen";
import SettingNavigator from "./SettingNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: isLargeScreen ? "permanent" : "front",
        drawerHideStatusBarOnOpen: true,
        drawerStyle: isLargeScreen
          ? { width: "auto", minWidth: "8%", backgroundColor: "#ff0000" }
          : { width: "100%" },
      }}
      drawerContent={CustomDrawerContent}
      initialRouteName="StaffSetting"
    >
      <Drawer.Screen name="Table" component={TableScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Member" component={MemberScreen} />
      <Drawer.Screen name="Transaction" component={TransactionScreen} />
      <Drawer.Screen name="Setting" component={SettingNavigator} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Printer" component={PrinterScreen} />
    </Drawer.Navigator>
  );
};
const CustomDrawerContent = (props) => {
  const currentRoute = props.state.routeNames[props.state.index];
  const drawerItems = [
    {
      name: "Table",
      display: "Order",
      icon: Foundation,
      iconName: "clipboard-notes",
      activeIcon: "clipboard-pencil",
    },
    {
      name: "Menu",
      display: "Menu",
      icon: Ionicons,
      iconName: "book-outline",
      activeIcon: "book",
    },
    {
      name: "Member",
      display: "Member",
      icon: Ionicons,
      iconName: "people-outline",
      activeIcon: "people",
    },
    {
      name: "Transaction",
      display: "Transaction",
      icon: Ionicons,
      iconName: "stats-chart-outline",
      activeIcon: "stats-chart",
    },
  ];
  return (
    <Flex
      align="center"
      h="100%"
      py={3}
      px={2}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "greyColor.1000",
      }}
    >
      {drawerItems.map((item) => {
        let isActive = item.name === currentRoute;
        return (
          <Pressable
            key={item.name}
            my={2}
            onPress={() => props.navigation.navigate(item.name)}
            _light={{
              bg: isActive ? "themeColor.500" : "transparent",
              _pressed: {
                bg: isActive ? "themeColor.500" : "themeColor.50",
              },
            }}
            _dark={{
              bg: isActive ? "themeColor.400" : "transparent",
              _pressed: {
                bg: isActive ? "themeColor.400" : "themeColor.200",
              },
            }}
            borderRadius="lg"
            w={{ base: "300px", md: "100%" }}
            h="75px"
          >
            {() => (
              <Flex
                direction={{ base: "row", md: "column" }}
                w="100%"
                h="100%"
                align="center"
                justify={{ base: "space-between", md: "center" }}
                p={{ base: 5, md: 0 }}
                textAlign="center"
              >
                <Icon
                  as={item.icon}
                  textAlign="center"
                  _light={{
                    color: isActive ? "light.100" : "themeColor.500:alpha.50",
                  }}
                  _dark={{ color: isActive ? "light.300" : "themeColor.200" }}
                  size={7}
                  name={isActive ? item.activeIcon : item.iconName}
                />
                <Text
                  py={1}
                  _light={{ color: isActive ? "light.100" : "dark.400" }}
                  _dark={{ color: isActive ? "light.300" : "themeColor.200" }}
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={12}
                >
                  {item.display}
                </Text>
              </Flex>
            )}
          </Pressable>
        );
      })}
    </Flex>
  );
};

export default DrawerNavigator;
