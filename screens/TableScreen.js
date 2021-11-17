import { Text, Stack, useColorModeValue } from "native-base";
import React from "react";

const TableScreen = ({ navigation }) => {
  console.log(navigation);

  return (
    <Stack h="100%" bg={useColorModeValue("muted.100", "muted.800")}>
      <Text>This is table page</Text>
    </Stack>
  );
};

export default TableScreen;
