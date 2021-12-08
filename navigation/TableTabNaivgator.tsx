import * as React from "react";
import { Heading, Box, Button, Flex } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TableListScreen from "../screens/TableListScreen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/RootStackParams";

const Tab = createMaterialTopTabNavigator();

type TableEditScreenProp = StackNavigationProp<RootStackParamList, "TableEdit">;

const TableTabNavigator = () => {
  const navigation = useNavigation<TableEditScreenProp>();
  return (
    <>
      <Flex direction="row" w="100%" justify="space-between" align="center">
        <Button
          onPress={() => {
            navigation.navigate("Table");
          }}
        >
          Back
        </Button>
              <Heading
                  size="lg"
          fontFamily="sf-pro-display-bold"
          fontWeight="600"
          fontSize={{ base: 24, md: 32 }}
        >
          Table
        </Heading>
        <Box></Box>
      </Flex>
      <Tab.Navigator>
        <Tab.Screen
          name="TableList"
          options={{
            title: "Table",
          }}
          component={TableListScreen}
        />
        <Tab.Screen
          name="TableCategoryList"
          options={{
            title: "Table Category",
          }}
          component={TableListScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default TableTabNavigator;
