import {
  Flex,
  Heading,
  Text,
  Input,
  Icon,
  Button,
  useColorModeValue,
  Modal,
  useToast,
  KeyboardAvoidingView,
  FlatList,
  HStack,
  Box,
  Spinner,
  Stack,
  VStack,
  Pressable,
  ScrollView,
  Switch,
} from "native-base";
import React, { useEffect, useState } from "react";
import { MaterialIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "./RootStackParams";
import { Platform, RefreshControl } from "react-native";
import { useAppSelector } from "../app/hooks";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

type ReportScreenProp = DrawerNavigationProp<RootStackParamList, "Transaction">;
type ReportScreenRouteProp = RouteProp<RootStackParamList, "Transaction">;
const ReportScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<ReportScreenProp>();

  useEffect(() => {
    getStatistic();
  }, []);

  const getStatistic = async () => {
    setIsRefreshing(true);
    if (restaurantInfo) {
    }
    setIsRefreshing(false);
    // mappingAllItem(itemData);
  };

  const mappingAllItem = (response: any[]) => {};
  return (
    <>
      <VStack
        safeAreaBottom
        position="relative"
        pt={6}
        pb={4}
        px={6}
        h="100%"
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <Flex direction="row">
          <Flex
            borderRadius="xl"
            bg={useColorModeValue("white", "greyColor.1000")}
          >
            <VictoryChart width={600} theme={VictoryTheme.material}>
              <VictoryAxis tickCount={8} />
              <VictoryBar
                style={{
                  data: {
                    fill: "#3433f4",
                  },
                }}
              />
            </VictoryChart>
          </Flex>
          <Flex
            ml={3}
            flex={1}
            borderRadius="xl"
            bg={useColorModeValue("white", "greyColor.1000")}
          ></Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default ReportScreen;
