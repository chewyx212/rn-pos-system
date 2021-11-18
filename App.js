import React, { useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";

import NativeBaseIcon from "./components/NativeBaseIcon";
import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Define the config
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export const theme = extendTheme({
  colors: {
    // Add new color
    myPrimary: {
      50: "#FF9671",
      100: "#d16f4d",
      200: "#cc5f39",
      300: "#FF9671",
      400: "#a74b2b",
      500: "#934226",
      600: "#7e3921",
      700: "#7e3921",
      800: "#6a301b",
      900: "#550000",
    },
    primaryButton: {
      lightBg: "#2563eb",
      darkBg: "#1e40af",
      lightPressBg: "#1d4ed8",
      darkPressBg: "#1e3a8a",
      lightText: "#fafafa",
      darkText: "#e7e5e4",
      lightPressText: "#fafaf9",
      darkPressText: "#f5f5f4",
    },
    secondaryButton: {
      lightBg: "#2563eb",
      darkBg: "#1e40af",
      lightPressBg: "#1d4ed8",
      darkPressBg: "#1e3a8a",
      lightText: "#fafafa",
      darkText: "#e7e5e4",
      lightPressText: "#fafaf9",
      darkPressText: "#f5f5f4",
    },
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
    dependencies: {
      "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
  },
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}

// Color Switch Component
