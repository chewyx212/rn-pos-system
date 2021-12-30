import { Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../RootStackParams";

type TableSettingScreenProp = DrawerNavigationProp<RootStackParamList, "TableSetting">;
type TableSettingScreenRouteProp = RouteProp<RootStackParamList, "TableSetting">;
const TableSettingScreen = () => {
  const navigation = useNavigation<TableSettingScreenProp>();

  useEffect(() => {}, []);

  return (
    <>
      <Text>ABC</Text>
    </>
  );
};

export default TableSettingScreen;
