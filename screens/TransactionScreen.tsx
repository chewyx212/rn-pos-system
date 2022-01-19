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
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import { ItemApi } from "../api/ItemApi";
import {
  AddonType,
  EditItemForm,
  ItemCategoryType,
  ItemType,
} from "../types/itemType";
import NumberPadInput from "../components/NumberPadInput";
import PullToRefreshScrollView from "../components/PullToRefreshScrollView";
import { itemData } from "../assets/DUMMY";

type TransactionScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "Transaction"
>;
type TransactionScreenRouteProp = RouteProp<RootStackParamList, "Transaction">;
const TransactionScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openNumberPad, setOpenNumberPad] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [isStockCheck, setIsStockCheck] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<ItemType[]>([]);
  const [selectedtransactionList, setSelectedtransactionList] = useState<
    ItemType[]
  >([]);
  const [selectedEditItem, setSelectedEditItem] = useState<ItemType>();
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<TransactionScreenProp>();

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    setIsRefreshing(true);
    if (restaurantInfo) {
      const restaurantId: number = restaurantInfo.id;
      const result = await ItemApi.getItem(restaurantId);
      if (result.status === 200 && result.data.status === 0) {
        if (
          result.data.response.item_lists &&
          result.data.response.item_lists.length > 0
        ) {
          mappingAllItem(result.data.response.item_lists);
        }
      }
    }
    setIsRefreshing(false);
    // mappingAllItem(itemData);
  };

  const mappingAllItem = (response: any[]) => {
    let category: ItemCategoryType[] = [];
    let itemList: ItemType[] = [];
    let idList: number[] = [];
    response.forEach((item) => {
      if (item.addons && item.addons > 0) {
        let addons: AddonType[] = [];
        item.addons.forEach((addon: any) => {
          addons.push({
            ...addon,
            price: parseFloat(addon.price),
          });
        });
      } else {
        itemList.push({
          ...item,
          price: parseFloat(item.price),
        });
      }
      if (!idList.includes(item.item_category_id)) {
        idList.push(item.item_category_id);
        category.push({
          id: item.item_category_id,
          name: item.item_category_name,
          is_enabled: true,
        });
      }
    });
    setTransactionList(itemList);
    setSelectedtransactionList(
      itemList.filter((item) => item.item_category_id === idList[0])
    );
    setSelectedCategoryId(idList[0]);
    setCategoryList(category);
  };

  const onSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedtransactionList(
      transactionList.filter((item) => item.item_category_id === categoryId)
    );
  };

  const onPressItemHandler = (item: ItemType) => {
    setSelectedEditItem(item);
    setIsStockCheck(item.is_stock_check === 0 ? true : false);
    setEnteredAmount(item.stock ? item.stock : 0);
    setOpenModal(true);
  };

  const onCloseHandler = () => {
    setSelectedEditItem(undefined);
    setEnteredAmount(0);
    setOpenModal(false);
    setOpenNumberPad(false);
    setIsStockCheck(false);
  };

  const onEnteredAmount = (amount: number) => {
    setEnteredAmount(amount);
    setOpenNumberPad(false);
  };

  const onSubmit = () => {
    console.log(isStockCheck);
    console.log(enteredAmount);
    onCloseHandler();
  };

  return (
    <>
      <Stack
        safeAreaBottom
        position="relative"
        pt={6}
        pb={4}
        px={6}
        h="100%"
        direction="row"
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <VStack
          h="100%"
          flex={6}
          bg={useColorModeValue("white", "greyColor.900")}
          borderRadius="xl"
          direction="row"
          w="100%"
        >
          <Flex w="100%">
            <Flex
              direction="row"
              textAlign="center"
              py={3}
              px={2}
              borderBottomWidth={1}
              borderBottomColor={useColorModeValue(
                "greyColor.100",
                "greyColor.800"
              )}
            >
              <Text flex={1} textAlign="center">
                Order Id
              </Text>
              <Text flex={1} textAlign="center">
                Total
              </Text>
              <Text flex={1} textAlign="center">
                Customer
              </Text>
              <Text flex={1} textAlign="center">
                Date
              </Text>
              <Text flex={1} textAlign="center">
                Status
              </Text>
            </Flex>
            {transactionList.length > 0 && !isRefreshing ? (
              <FlatList
                refreshing={isRefreshing}
                onRefresh={getAllItem}
                keyExtractor={(item, index) => item.name + index}
                data={selectedtransactionList}
                renderItem={({ item, index }) => (
                  <TransactionListItem
                    item={item}
                    index={index}
                    onPress={onPressItemHandler}
                  />
                )}
              />
            ) : isRefreshing ? (
              <PullToRefreshScrollView
                isRefreshing={isRefreshing}
                onRefresh={getAllItem}
              >
                <Flex
                  direction="row"
                  justify="center"
                  alignItems="center"
                  m={5}
                >
                  <Spinner accessibilityLabel="Loading transaction" mx={10} />
                  <Heading fontSize="md">Loading</Heading>
                </Flex>
              </PullToRefreshScrollView>
            ) : (
              <PullToRefreshScrollView
                isRefreshing={isRefreshing}
                onRefresh={getAllItem}
              >
                <Flex
                  direction="row"
                  justify="center"
                  alignItems="center"
                  m={5}
                >
                  <Heading fontSize="md" ml={-10}>
                    No Transaction Found
                  </Heading>
                </Flex>
              </PullToRefreshScrollView>
            )}
          </Flex>
        </VStack>
      </Stack>

    </>
  );
};

interface TransactionListItemProps {
  item: ItemType;
  index: number;
  onPress: Function;
}

const TransactionListItem = ({
  item,
  index,
  onPress,
}: TransactionListItemProps) => {
  return (
    <Pressable
      py={4}
      _pressed={{ bg: useColorModeValue("light.400", "dark.400") }}
      onPress={() => onPress(item)}
    >
      <Flex direction="row">
        <Text flex={1} textAlign="center">
          {item.id}
        </Text>
        <Text flex={1} textAlign="center">
          {item.name}
        </Text>
        <Text flex={1} textAlign="center">
          {item.price.toFixed(2)}
        </Text>
        <Text flex={1} textAlign="center">
          {item.item_category_name}
        </Text>
        <Text flex={1} textAlign="center">
          {item.is_stock_check ? (item.stock ? item.stock : 0) : "-"}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default TransactionScreen;
