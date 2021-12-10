import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import OrderScreen from "../screens/OrderScreen";
import TableScreen from "../screens/TableScreen";
import CameraScreen from "../screens/CameraScreen";
import PrinterScreen from "../screens/PrinterScreen";
import TableListScreen from "../screens/TableListScreen";
import TableTabNavigator from "./TableTabNaivgator";
import { useWindowDimensions } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Flex, Icon, Text, Pressable } from "native-base";

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
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Printer" component={PrinterScreen} />
    </Drawer.Navigator>
  );
};
const CustomDrawerContent = (props) => {
  console.log(props);
  return (
    <Flex align="center" pt={12}>
      <Pressable my={3} onPress={() => props.navigation.navigate("Table")}>
        {({ isFocused, isPressed, isHovered }) => (
          <Flex align="center" justify="center" p={0} textAlign="center">
            <Icon
              as={Foundation}
              textAlign="center"
              color="primary.500"
              size="lg"
              name="clipboard-notes"
            />
            <Text py={1} color="dark.400">Order</Text>
          </Flex>
        )}
      </Pressable>
      <Pressable my={3} onPress={() => props.navigation.navigate("Table")}>
        {({ isFocused, isPressed, isHovered }) => (
          <Flex align="center" justify="center" p={0} textAlign="center">
            <Icon
              as={Foundation}
              textAlign="center"
              color="primary.500"
              size="lg"
              name="clipboard-notes"
            />
            <Text py={1} color="dark.400">Order</Text>
          </Flex>
        )}
      </Pressable>
      <Pressable my={3} onPress={() => props.navigation.navigate("Table")}>
        {({ isFocused, isPressed, isHovered }) => (
          <Flex align="center" justify="center" p={0} textAlign="center">
            <Icon
              as={Foundation}
              textAlign="center"
              color="primary.500"
              size="lg"
              name="clipboard-notes"
            />
            <Text py={1} color="dark.400">Order</Text>
          </Flex>
        )}
      </Pressable>
    </Flex>
  );
};

export default DrawerNavigator;
