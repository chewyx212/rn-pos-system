import { Image, Box, KeyboardAvoidingView, useToast } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import PasscodeInput from "../../components/PasscodeInput";
import { useAppDispatch } from "../../app/hooks";
import { verifyPasscode } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthApi } from "../../api/AuthApi";

type passcodeScreenProp = StackNavigationProp<RootStackParamList, "Passcode">;
const PasscodeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<passcodeScreenProp>();
  const toast = useToast();

  const submitHandler = async (passcode: string) => {
    const result = await AuthApi.counterLogin({ pos_password: passcode });
    console.log(result.data)
    if (parseInt(passcode) === 1234) {
      await AsyncStorage.setItem("passcode", passcode);
      dispatch(verifyPasscode());
    } else {
      await toast.closeAll();
      toast.show({
        title: "Wrong passcode!",
        status: "error",
        placement: "top",
      });
    }
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
          title={"Enter Passcode to Login"}
          submitHandler={submitHandler}
          canBack={false}
          backFunction={() => {}}
        />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default PasscodeScreen;
