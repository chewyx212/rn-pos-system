import { Text, Box } from "native-base";
import React from "react";
import { View } from "react-native";

const PasscodeScreen = ({ navigation }) => {
  console.log(navigation);

  return (
    <Box safeArea>
      <Text>This is passcode page</Text>
    </Box>
  );
};

export default PasscodeScreen;
