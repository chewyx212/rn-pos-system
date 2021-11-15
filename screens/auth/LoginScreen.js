import { Text, Box } from "native-base";
import React from "react";
import { View } from "react-native";

const LoginScreen = ({ navigation }) => {
  console.log(navigation);

  return (
    <Box safeArea>
      <Text>This is login page</Text>
    </Box>
  );
};

export default LoginScreen;
