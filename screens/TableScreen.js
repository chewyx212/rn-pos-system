import { Text, Stack } from "native-base";
import React from "react";

const TableScreen = ({ navigation }) => {
  console.log(navigation);

  return (
    <Stack safeAreaTop>
      <Text>This is table page</Text>
    </Stack>
  );
};

export default TableScreen;
