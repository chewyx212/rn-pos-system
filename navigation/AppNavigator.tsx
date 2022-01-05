import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import { useAppSelector } from "../app/hooks";
const AppNavigator = () => {
  let isAuth = false;

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isPasscodeVerified = useAppSelector(
    (state) => state.auth.isPasscodeVerified
  );
  console.log(!isLoggedIn || !isPasscodeVerified);
  return (
    <NavigationContainer>
      {/* {(!isLoggedIn || !isPasscodeVerified) && <AuthNavigator />}
      {isLoggedIn && isPasscodeVerified && <ProtectedNavigator />} */}
      {<ProtectedNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
