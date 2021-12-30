import { Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../RootStackParams";

type AccountSettingScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "AccountSetting"
>;
type AccountSettingScreenRouteProp = RouteProp<
  RootStackParamList,
  "AccountSetting"
>;
const AccountSettingScreen = () => {
  const navigation = useNavigation<AccountSettingScreenProp>();

  useEffect(() => {}, []);

  return (
    <>
      <Text>ABC</Text>
    </>
  );
};

export default AccountSettingScreen;
