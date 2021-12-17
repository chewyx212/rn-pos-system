import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/auth/LandingScreen";
import PasscodeScreen from "../screens/auth/PasscodeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { useAppSelector } from "../app/hooks";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? 'Passcode' : 'Login'}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Passcode" component={PasscodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
