import {
  Flex,
  Image,
  Box,
  Text,
  KeyboardAvoidingView,
  Heading,
  Circle,
  Icon,
  HStack,
  Button,
} from "native-base";
import React, { useState } from "react";
import { Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import PasscodeInput from "../../components/PasscodeInput";

type passcodeScreenProp = StackNavigationProp<RootStackParamList, "Passcode">;
const PasscodeScreen = () => {
  const navigation = useNavigation<passcodeScreenProp>();

  const submitHandler = (passcode) => {
    console.log(passcode);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box position="relative" w="100%" h="100%">
        <Image
          w="100%"
          h="100%"
          alt="bg image"
          source={require("./../../assets/gradient.jpg")}
        />
        <PasscodeInput
          title={'Enter Passcode to Login'}
          submitHandler={submitHandler}
          canBack={false}
          backFunction={() => {}}
        />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default PasscodeScreen;
