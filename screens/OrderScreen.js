import { Text,Stack } from "native-base";
import React from "react";
import { View } from "react-native";
import Sidenav from "../components/Sidenav";


const OrderScreen = ({ navigation }) => {
    console.log(navigation)

    return (
      <Stack safeAreaTop>
          <Text>This is order page</Text>
      </Stack>
    );
}

export default OrderScreen