import React, { useRef } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import { useAppSelector } from "../app/hooks";
import { Box, useColorModeValue } from "native-base";
const AppNavigator = () => {
  let isAuth = false;

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isPasscodeVerified = useAppSelector(
    (state) => state.auth.isPasscodeVerified
  );

  return (
    <NavigationContainer>
      <ProtectedNavigator />
      {/* {(!isLoggedIn || !isPasscodeVerified) && <AuthNavigator />}
      {isLoggedIn && isPasscodeVerified && <ProtectedNavigator />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
