import { Text } from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type SettingScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenProp>();

  return <Text>SettingScreen</Text>;
};

export default SettingScreen;
