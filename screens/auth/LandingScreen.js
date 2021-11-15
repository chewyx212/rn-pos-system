import { Text, Box } from "native-base";
import React from "react";
import { View } from "react-native";

const LandingScreen = ({ navigation }) => {
  console.log(navigation);

  return (
    <Box safeArea>
      <Text>This is landing page</Text>
    </Box>
  );
};

export default LandingScreen;
