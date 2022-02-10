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
      safeAreaBottom
      position="relative"
      h="100%"
      direction="row"
      bg={useColorModeValue("greyColor.50", "greyColor.1000")}
    >
        
        <Flex direction="row" w="100%" h="100%">
          {children}
        </Flex>
    </Stack>
  );
};

export default SettingScreen;
