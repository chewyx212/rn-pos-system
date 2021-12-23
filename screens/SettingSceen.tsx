import {
  Heading,
  Stack,
  VStack,
  Flex,
  Button,
  Text,
  FlatList,
  Pressable,
  useColorModeValue,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type SettingScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenProp>();
  const [selectedSetting, setSelectedSetting] = useState<number>(1);
  const toast = useToast();

  const settingList = [
    {
      id: 1,
      name: "Staff",
    },
    {
      id: 2,
      name: "Table",
    },
    {
      id: 3,
      name: "Account",
    },
  ];
  return (
    <Stack
      safeArea
      position="relative"
      h="100%"
      direction="row"
      bg={useColorModeValue("light.100", "muted.800")}
    >
      <VStack h="100%" flex={6} mr="1%" pt={3}>
        <Flex
          direction="row"
          pl={5}
          pb={2}
          w="100%"
          justify="space-between"
          align="center"
        >
          <Heading
            size="lg"
            fontFamily="sf-pro-display-bold"
            fontWeight="600"
            fontSize={{ base: 24, md: 32 }}
          >
            Setting
          </Heading>
        </Flex>
        <Flex direction="row" w="100%" h="100%">
          <Flex flex={1}>
            <FlatList
              keyExtractor={(item, index) => `${item.name}${index}`}
              data={settingList}
              renderItem={({ item }) => (
                <Pressable
                  p={4}
                  bg={item.id === selectedSetting ? "light.300" : "transparent"}
                  onPress={() => {
                    setSelectedSetting(item.id);
                  }}
                >
                  <Text
                    fontFamily="sf-pro-text-medium"
                    fontWeight="600"
                    fontSize={15}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </Flex>
          <Flex flex={3} h="100%">
            <Flex>
              <Flex
                direction="row"
                bg={useColorModeValue("light.400", "dark.50")}
                textAlign="center"
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
                  123{" "}
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
                  <Button mx={10}>View</Button>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                bg={useColorModeValue("light.100", "dark.100")}
                py={4}
              >
                <Text flex={1} textAlign="center">
                  123{" "}
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
                  <Button mx={10}>View</Button>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                bg={useColorModeValue("light.100", "dark.100")}
                py={4}
              >
                <Text flex={1} textAlign="center">
                  123{" "}
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
                  <Button mx={10}>View</Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default SettingScreen;
