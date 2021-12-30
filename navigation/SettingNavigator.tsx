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
            ? { width: "20%", backgroundColor: "transparent" }
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
    <Flex w="100%">
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
    // <Flex align="center" pt={12} px={3}>
    //   {drawerItems.map((item) => {
    //     let isActive = item.name === currentRoute;
    //     return (
    //       <Pressable
    //         my={3}
    //         onPress={() => props.navigation.navigate(item.name)}
    //         _light={{ bg: isActive ? "primary.500" : "transparent" }}
    //         _dark={{ bg: isActive ? "primary.400" : "transparent" }}
    //         borderRadius="lg"
    //         w={{ base: "300px", md: "100%" }}
    //         h="90px"
    //       >
    //         {() => (
    //           <Flex
    //             direction={{ base: "row", md: "column" }}
    //             w="100%"
    //             h="100%"
    //             align="center"
    //             justify={{ base: "space-between", md: "center" }}
    //             p={{ base: 5, md: 0 }}
    //             textAlign="center"
    //           >
    //             <Icon
    //               as={item.icon}
    //               textAlign="center"
    //               _light={{ color: isActive ? "light.100" : "primary.500" }}
    //               _dark={{ color: isActive ? "light.300" : "primary.400" }}
    //               size="md"
    //               name={isActive ? item.activeIcon : item.iconName}
    //             />
    //             <Text
    //               py={1}
    //               _light={{ color: isActive ? "light.100" : "dark.400" }}
    //               _dark={{ color: isActive ? "light.300" : "primary.400" }}
    //               fontFamily="sf-pro-text-semibold"
    //               fontWeight="600"
    //               fontSize={13}
    //             >
    //               {item.display}
    //             </Text>
    //           </Flex>
    //         )}
    //       </Pressable>
    //     );
    //   })}
    // </Flex>
  );
};

export default SettingNavigator;
