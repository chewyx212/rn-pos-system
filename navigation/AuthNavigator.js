import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/auth/LandingScreen";
import PasscodeScreen from "../screens/auth/PasscodeScreen";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = (props) => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Passcode" component={PasscodeScreen} />
      </Stack.Navigator>
  );
};

export default AuthNavigator;
