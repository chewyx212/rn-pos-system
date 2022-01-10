import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import {
  Flex,
  Icon,
  Text,
  Pressable,
  useColorModeValue,
  FlatList,
} from "native-base";
import SettingScreen from "../screens/SettingSceen";
import StaffSettingScreen from "../screens/setting/StaffSettingScreen";
import TableSettingScreen from "../screens/setting/TableSettingScreen";
import GlobalSettingScreen from "../screens/setting/GlobalSettingScreen";
import AccountSettingScreen from "../screens/setting/AccountSettingScreen";

const Drawer = createDrawerNavigator();

const SettingNavigator = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <SettingScreen>
      <Drawer.Navigator
        screenOptions={{
          headerShown: !isLargeScreen,
          drawerType: isLargeScreen ? "permanent" : "front",
          drawerHideStatusBarOnOpen: true,
          drawerStyle: isLargeScreen
            ? { width: "21%", backgroundColor: "transparent" }
            : { width: "100%", backgroundColor: "transparent" },
        }}
        drawerContent={CustomDrawerContent}
        initialRouteName="StaffSetting"
      >
        <Drawer.Screen name="StaffSetting" component={StaffSettingScreen} />
        <Drawer.Screen name="TableSetting" component={TableSettingScreen} />
        <Drawer.Screen name="AccountSetting" component={AccountSettingScreen} />
        <Drawer.Screen name="GlobalSetting" component={GlobalSettingScreen} />
      </Drawer.Navigator>
    </SettingScreen>
  );
};
const CustomDrawerContent = (props) => {
  const currentRoute = props.state.routeNames[props.state.index];
  const drawerItems = [
    {
      name: "StaffSetting",
      display: "Staff",
      icon: Foundation,
      iconName: "clipboard-notes",
      activeIcon: "clipboard-pencil",
    },
    {
      name: "TableSetting",
      display: "Table",
      icon: Ionicons,
      iconName: "book-outline",
      activeIcon: "book",
    },
    {
      name: "AccountSetting",
      display: "Account",
      icon: Ionicons,
      iconName: "people-outline",
      activeIcon: "people",
    },
    {
      name: "GlobalSetting",
      display: "Global Setting",
      icon: Ionicons,
      iconName: "settings-outline",
      activeIcon: "settings",
    },
  ];
  return (
    <Flex h="100%" pl={6} pt={6} pb={3}>
      <Flex
        h="100%"
        w="100%"
        borderBottomLeftRadius="xl"
        borderLeftRadius="xl"
        _light={{
          bg: "white",
        }}
        _dark={{ bg: "greyColor.900" }}
      >
        <Flex
          direction="row"
          justify="center"
          py={3}
          px={2}
          borderBottomWidth={1}
          _light={{ borderBottomColor: "greyColor.100" }}
          _dark={{ borderBottomColor: "greyColor.800" }}
        >
          <Text textAlign="center">Settings</Text>
        </Flex>
        {drawerItems.map((item) => {
          let isActive = item.name === currentRoute;
          return (
            <Pressable
              p={4}
              px={10}
              bg={isActive ? "light.300" : "transparent"}
              onPress={() => props.navigation.navigate(item.name)}
            >
              <Text
                fontFamily="sf-pro-text-medium"
                fontWeight="600"
                fontSize={15}
              >
                {item.display}
              </Text>
            </Pressable>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default SettingNavigator;
