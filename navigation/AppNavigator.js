import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/OrderScreen";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import Sidenav from "../components/Sidenav";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  let isAuth = false;
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
