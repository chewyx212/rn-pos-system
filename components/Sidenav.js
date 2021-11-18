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
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  console.log(
    "this is statethis is statethis is statethis is statethis is statethis is statethis is statethis is statethis is statethis is state"
  );
  let route = "Order";
  if (state?.routeNames[state.index]) {
    route = state.routeNames[state.index];
  }
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
      name: "Menu",
      library: Ionicons,
      icon: "ios-book-outline",
      route: "Menu",
    },
  ];
  let isOpen = true;
  return (
    <>
      <HStack
        safeAreaTop
        w="100%"
        bg="dark.50"
        justify="space-between"
      ></HStack>
      <Stack
        w="100%"
        h="100%"
        direction={{ base: "column", md: "row" }}
        rounded="xl"
      >
        <VStack
          space={{ base: "3", md: "5" }}
          flex={isOpen ? { md: 1 } : { md: 1 }}
          display={{ base: "none", md: "flex" }}
          pt="10"
          bg={useColorModeValue("muted.50", "muted.900")}
          borderRightWidth={1}
          borderRightColor={useColorModeValue("muted.200", "muted.800")}
          align="center"
          justify="center"
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
                eCol
                disabled={isActive}
                _text={{ color: textColor }}
                _hover={{ bg: backgroundColor }}
                _pressed={{ bg: backgroundColor }}
                display="flex"
                direction="column"
                align="center"
                justify="center"
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
          <HStack space={2} align="center" justify="center" size="sm">
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
          flex={{ base: 1, md: 13 }}
          bg={useColorModeValue("muted.100", "muted.800")}
        >
          {props.children}
        </VStack>
      </Stack>
    </>
  );
};

export default Sidenav;
