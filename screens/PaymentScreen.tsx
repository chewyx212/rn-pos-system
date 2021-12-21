import { Text } from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type PaymentScreenProp = StackNavigationProp<RootStackParamList, "Payment">;
const PaymentScreen = () => {
  const navigation = useNavigation<PaymentScreenProp>();

  return <Text>PaymentScreen</Text>;
};

export default PaymentScreen;
