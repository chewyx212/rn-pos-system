import {
  HStack,
  VStack,
  Center,
  Text,
  Box,
  Stack,
  useDisclose,
  Icon,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Switch,
} from "native-base";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Sidenav = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const state = useNavigationState((state) => state);
  let route = "Table";
  if (state?.routeNames[state.index]) {
    route = state.routeNames[state.index];
  }
  const navigation = useNavigation();

  // const { isOpen, onOpen, onClose } = useDisclose();
  const drawerItem = [
    {
      name: "Order",
      library: Ionicons,
      icon: "fast-food-outline",
      route: "Order",
    },
    {
      name: "Table",
      library: MaterialIcons,
      icon: "storefront",
      route: "Table",
    },
    {
      name: "Camera",
      library: Ionicons,
      icon: "ios-camera-outline",
      route: "Camera",
    },
    {
      name: "Printer",
      library: Ionicons,
      icon: "ios-camera-outline",
      route: "Printer",
    },
  ];
  let isOpen = true;
  return (
    <>
      <Stack
        safeAreaTop
        w="100%"
        h="100%"
        direction={{ base: "column", md: "row" }}
        rounded="xl"
      >
        <VStack
          space={{ base: "3", md: "5" }}
          flex={isOpen ? { md: 1 } : { md: 1 }}
          display={{ base: "none", md: "none" }}
          pt="10"
          bg={useColorModeValue("muted.50", "muted.900")}
          borderRightWidth={1}
          borderRightColor={useColorModeValue("muted.200", "muted.800")}
        >
          {/* <Icon
          as={Ionicons}
          name="swap-horizontal-outline"
          size="md"
          onPress={() => {
            if (isOpen) {
              onClose();
            } else {
              onOpen();
            }
          }}
        >
          PRIMARY
        </Icon> */}
          {drawerItem.map((item) => {
            let textColor = useColorModeValue("muted.400", "gray.200");
            let backgroundColor = useColorModeValue(
              "primary.100:alpha.70",
              "primary.600:alpha.70"
            );
            const isActive = item.name === route;
            if (isActive) {
              textColor = useColorModeValue("primary.600", "primary.500");
            }
            return (
              <Button
                key={item.name}
                bg="transparent"
                _text={{
                  color: textColor,
                  fontFamily: "sf-pro-text-medium",
                  fontSize: 10,
                }}
                _hover={{ bg: backgroundColor }}
                _pressed={{ bg: backgroundColor }}
                onPress={() => navigation.navigate(item.route)}
              >
                <Icon
                  color={textColor}
                  my="2"
                  as={item.library}
                  name={item.icon}
                  size="md"
                />
                {item.name}
              </Button>
            );
          })}
          <HStack space={2} size="sm">
            {/* <Icon as={Ionicons} name="moon-outline" size="sm" /> */}
            <Switch
              size="sm"
              isChecked={colorMode === "light" ? false : true}
              onToggle={toggleColorMode}
              aria-label={
                colorMode === "light"
                  ? "switch to dark mode"
                  : "switch to light mode"
              }
            />
          </HStack>
        </VStack>
        <VStack
          flex={{ base: 1, md: 16 }}
          bg={useColorModeValue("muted.100", "muted.800")}
        >
          {props.children}
        </VStack>
      </Stack>
    </>
  );
};

export default Sidenav;
