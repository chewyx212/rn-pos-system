import {
  Flex,
  Heading,
  Text,
  Input,
  Icon,
  Button,
  useColorModeValue,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../RootStackParams";

type StaffSettingScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "StaffSetting"
>;
type StaffSettingScreenRouteProp = RouteProp<
  RootStackParamList,
  "StaffSetting"
>;
const StaffSettingScreen = () => {
  const navigation = useNavigation<StaffSettingScreenProp>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  useEffect(() => {}, []);

  return (
    <Flex>
      <Flex direction="row" px={5} justify="space-between">
        <Heading
          size="lg"
          fontFamily="sf-pro-display-bold"
          fontWeight="600"
          fontSize={{ base: 22, md: 32 }}
        >
          Staff
        </Heading>
        <Input
          placeholder="Search Staff"
          bg="transparent"
          width="30%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          _web={{
            _focus: { borderColor: "muted.300" },
          }}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </Flex>
      <Flex
        direction="row"
        bg={useColorModeValue("light.200", "dark.50")}
        textAlign="center"
        mt={5}
        py={3}
        px={2}
      >
        <Text flex={1} textAlign="center">
          Id
        </Text>
        <Text flex={1} textAlign="center">
          Name
        </Text>
        <Text flex={1} textAlign="center">
          Phone
        </Text>
        <Text flex={1} textAlign="center">
          Email
        </Text>
        <Text flex={1} textAlign="center">
          Action
        </Text>
      </Flex>
      <Flex
        direction="row"
        bg={useColorModeValue("light.100", "dark.100")}
        py={4}
      >
        <Text flex={1} textAlign="center">
          123
        </Text>
        <Text flex={1} textAlign="center">
          Chew Yx
        </Text>
        <Text flex={1} textAlign="center">
          +60197902102
        </Text>
        <Text flex={1} textAlign="center">
          chewingyx212@gmail.com
        </Text>
        <Flex flex={1} textAlign="center">
          <Button colorScheme="gray" variant="outline" mx={10}>
            Edit
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        bg={useColorModeValue("light.100", "dark.100")}
        py={4}
      >
        <Text flex={1} textAlign="center">
          123
        </Text>
        <Text flex={1} textAlign="center">
          Chew Yx
        </Text>
        <Text flex={1} textAlign="center">
          +60197902102
        </Text>
        <Text flex={1} textAlign="center">
          chewingyx212@gmail.com
        </Text>
        <Flex flex={1} textAlign="center">
          <Button colorScheme="gray" variant="outline" mx={10}>
            Edit
          </Button>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        bg={useColorModeValue("light.100", "dark.100")}
        py={4}
      >
        <Text flex={1} textAlign="center">
          123
        </Text>
        <Text flex={1} textAlign="center">
          Chew Yx
        </Text>
        <Text flex={1} textAlign="center">
          +60197902102
        </Text>
        <Text flex={1} textAlign="center">
          chewingyx212@gmail.com
        </Text>
        <Flex flex={1} textAlign="center">
          <Button colorScheme="gray" variant="outline" mx={10}>
            Edit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StaffSettingScreen;
