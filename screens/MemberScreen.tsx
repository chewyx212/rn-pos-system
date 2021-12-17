import { Text } from "native-base";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";

type Inputs = {
  email: string;
  password: string;
};
type MemberScreenProp = StackNavigationProp<RootStackParamList, "Member">;
const MemberScreen = () => {
  const navigation = useNavigation<MemberScreenProp>();

  return <Text>MemberScreen</Text>;
};

export default MemberScreen;
