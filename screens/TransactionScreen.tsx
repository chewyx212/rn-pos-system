import { Text } from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type TransactionScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const TransactionScreen = () => {
  const navigation = useNavigation<TransactionScreenProp>();

  return <Text>TransactionScreen</Text>;
};

export default TransactionScreen;
