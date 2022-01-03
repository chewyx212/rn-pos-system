import { Image, Box, KeyboardAvoidingView, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";
import PasscodeInput from "../../components/PasscodeInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLoginPass, verifyPasscode } from "../../app/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthApi } from "../../api/AuthApi";

type passcodeScreenProp = StackNavigationProp<RootStackParamList, "Passcode">;
const PasscodeScreen = () => {
  const [isLoginPass, setIsLoginPass] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loginpass = useAppSelector((state) => state.auth.loginpass);
  const navigation = useNavigation<passcodeScreenProp>();
  const toast = useToast();

  useEffect(() => {
    checkPasscode();
  }, []);

  const checkPasscode = async () => {
    console.log(loginpass);
    console.log("aaas");
    if (loginpass) {
      setIsLoginPass(true);
    } else {
      setIsLoginPass(false);
    }
  };

  const submitHandler = async (passcode: string) => {
    const result = await AuthApi.counterLogin({ pos_password: passcode });
    console.log(result)
    if (result.data.status === 711) {
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

  const updatePasscode = async (passcode: string) => {
    const result = await AuthApi.updatePasscode({
      user_id: user.id,
      pos_password: passcode,
    });
    if (result.data.status === 801) {
      toast.show({
        title: "Users POS Password Update Successfully",
        status: "success",
        placement: "top",
      });

      setIsLoginPass(true);
      await AsyncStorage.setItem("loginpass", 'true');
      dispatch(setLoginPass({ loginpass: true }));
    } else if (result.data.status === 710) {
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
          title={
            isLoginPass
              ? "Enter Passcode to Login"
              : "Set up your passcode now!"
          }
          submitHandler={isLoginPass ? submitHandler : updatePasscode}
          canBack={false}
          backFunction={() => {}}
        />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default PasscodeScreen;
