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

// extend the theme
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
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
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

