import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import Sidenav from "../components/Sidenav";
const AppNavigator = () => {
  let isAuth = false;
  return (
    <NavigationContainer>
      {!isAuth && <AuthNavigator />}
      {isAuth && <ProtectedNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
