import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../screens/OrderScreen";
import TableScreen from "../screens/TableScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import TableListScreen from "../screens/TableListScreen";
import TableTabNavigator from "./TableTabNaivgator";
import { useWindowDimensions } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { Flex, Icon, Text, Pressable, useColorModeValue } from "native-base";
import MenuScreen from "../screens/MenuScreen";
import MemberScreen from "../screens/MemberScreen";
import TransactionScreen from "../screens/TransactionScreen";
import SettingScreen from "../screens/SettingSceen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: !isLargeScreen,
        drawerType: isLargeScreen ? "permanent" : "front",
        drawerHideStatusBarOnOpen: true,
        drawerStyle: isLargeScreen ? { width: "10%" } : { width: "100%" },
      }}
      drawerContent={CustomDrawerContent}
      initialRouteName="Table"
    >
      <Drawer.Screen name="Table" component={TableScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Member" component={MemberScreen} />
      <Drawer.Screen name="Transaction" component={TransactionScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
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
    {
      name: "Setting",
      display: "Setting",
      icon: Ionicons,
      iconName: "settings-outline",
      activeIcon: "settings",
    },
  ];
  return (
    <Flex align="center" pt={12} px={3}>
      {drawerItems.map((item) => {
        let isActive = item.name === currentRoute;
        return (
          <Pressable
            my={3}
            onPress={() => props.navigation.navigate(item.name)}
            _light={{ bg: isActive ? "primary.500" : "transparent" }}
            _dark={{ bg: isActive ? "primary.400" : "transparent" }}
            borderRadius="lg"
            w={{ base: "300px", md: "100%" }}
            h="90px"
          >
            {({ isFocused, isPressed, isHovered }) => (
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
                  _light={{ color: isActive ? "light.100" : "primary.500" }}
                  _dark={{ color: isActive ? "light.300" : "primary.400" }}
                  size="md"
                  name={isActive ? item.activeIcon : item.iconName}
                />
                <Text
                  py={1}
                  _light={{ color: isActive ? "light.100" : "dark.400" }}
                  _dark={{ color: isActive ? "light.300" : "primary.400" }}
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={13}
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
