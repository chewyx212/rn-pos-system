import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import Sidenav from "../components/Sidenav";
const AppNavigator = () => {
  let isAuth = true;
  return (
    <NavigationContainer>
      {!isAuth && <AuthNavigator />}
      {isAuth && (
        <Sidenav>
          <ProtectedNavigator />
        </Sidenav>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
