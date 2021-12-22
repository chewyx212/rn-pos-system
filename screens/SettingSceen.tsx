import {
  Heading,
  Stack,
  VStack,
  Flex,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type SettingScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenProp>();
  const toast = useToast();
  return (
    <Stack
      safeArea
      position="relative"
      h="100%"
      direction="row"
      pl={5}
      bg={useColorModeValue("light.100", "muted.800")}
    >
      <VStack h="100%" flex={6} mr="1%" pt={3}>
        <Flex direction="row" w="100%" justify="space-between" align="center">
          <Heading
            size="lg"
            fontFamily="sf-pro-display-bold"
            fontWeight="600"
            fontSize={{ base: 24, md: 32 }}
          >
            Setting
          </Heading>

        </Flex>
      </VStack>
    </Stack>
  );
};

export default SettingScreen;
