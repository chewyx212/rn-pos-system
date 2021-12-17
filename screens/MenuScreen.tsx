import { Text } from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type MenuScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const MenuScreen = () => {
  const navigation = useNavigation<MenuScreenProp>();

  return <Text>MenuScreen</Text>;
};

export default MenuScreen;
