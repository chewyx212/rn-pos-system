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
const SettingScreen = ({children}:{children: React.ReactNode}) => {
  const navigation = useNavigation<SettingScreenProp>();
  const [selectedSetting, setSelectedSetting] = useState<number>(1);
  const toast = useToast();

  return (
    <Stack
      safeArea
      position="relative"
      h="100%"
      direction="row"
      bg={useColorModeValue("light.100", "muted.800")}
    >
      <VStack h="100%" flex={6} mr="1%" pt={3}>
        
        <Flex direction="row" w="100%" h="100%">
          {children}
        </Flex>
      </VStack>
    </Stack>
  );
};

export default SettingScreen;
