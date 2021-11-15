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
} from "native-base";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Sidenav = (props) => {
  const navigation = useNavigation();
    console.log(navigation);
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
        px="3"
        pt="5"
        bg="#fff"
        shadow={5}
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
        {drawerItem.map((item) => (
            <Button
                key={item.name}
            variant="ghost"
            display="flex"
            direction="column"
            align="center"
            justify="center"
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon my="2" as={item.library} name={item.icon} size="md" />
            <Text>{item.name}</Text>
          </Button>
        ))}
      </VStack>
      <VStack flex={{ base: 1, md: 10 }} bg="gray.100">
        {props.children}
      </VStack>
    </Stack>
  );
};

export default Sidenav;
