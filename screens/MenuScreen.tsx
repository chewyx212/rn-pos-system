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

type MenuScreenProp = DrawerNavigationProp<RootStackParamList, "Menu">;
type MenuScreenRouteProp = RouteProp<RootStackParamList, "Menu">;
const MenuScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openNumberPad, setOpenNumberPad] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [isStockCheck, setIsStockCheck] = useState<boolean>(false);
  const [menuList, setMenuList] = useState<ItemType[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<ItemType[]>([]);
  const [selectedEditItem, setSelectedEditItem] = useState<ItemType>();
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<MenuScreenProp>();

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    setIsRefreshing(true);
    // console.log("here");
    // if (restaurantInfo) {
    //   const restaurantId: number = restaurantInfo.id;
    //   const result = await ItemApi.getItem(restaurantId);
    //   if (result.status === 200 && result.data.status === 0) {
    //     if (
    //       result.data.response.item_lists &&
    //       result.data.response.item_lists.length > 0
    //     ) {
    //       mappingAllItem(result.data.response.item_lists);
    //     }
    //   }
    // }
    // console.log("end");
    mappingAllItem(itemData);
    setIsRefreshing(false);
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
    setMenuList(itemList);
    setSelectedMenuList(
      itemList.filter((item) => item.item_category_id === idList[0])
    );
    setSelectedCategoryId(idList[0]);
    setCategoryList(category);
  };

  const onSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedMenuList(
      menuList.filter((item) => item.item_category_id === categoryId)
    );
  };

  const onPressItemHandler = (item: ItemType) => {
    console.log(item);
    setSelectedEditItem(item);
    setIsStockCheck(item.is_stock_check === 0 ? true : false);
    console.log(item.is_stock_check === 0 ? true : false);
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
    // console.log(selectedEditItem);
    console.log(enteredAmount);
    onCloseHandler();
  };

  return (
    <>
      <Stack
        safeArea
        position="relative"
        h="100%"
        direction="row"
        bg={useColorModeValue("light.100", "muted.800")}
      >
        <VStack h="100%" flex={6} mr="1%" pt={3}>
          <Flex direction="row" px={5} mb={3} justify="space-between">
            <Heading
              size="lg"
              fontFamily="sf-pro-display-bold"
              fontWeight="600"
              fontSize={{ base: 22, md: 32 }}
              flex={1}
            >
              Menu
            </Heading>
            <Flex direction="row" flex={1}>
              {/* <Button onPress={() => setOpenModal(true)} mr={3}>
                    Add item
                  </Button> */}
              <Input
                placeholder="Search Item"
                bg="transparent"
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="14"
                _web={{
                  _focus: { borderColor: "muted.300" },
                }}
                InputLeftElement={
                  <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
              />
            </Flex>
          </Flex>
          <Flex direction="row" w="100%" h="100%">
            <Flex
              w="20%"
              bg="transparent"
              borderRightWidth={1}
              borderRightColor="light.200"
            >
              <Flex
                direction="row"
                bg={useColorModeValue("light.200", "dark.50")}
                textAlign="center"
                py={3}
                px={2}
              >
                <Text flex={0.5} textAlign="center">
                  Category
                </Text>
              </Flex>
              <ScrollView>
                {categoryList.map((category: ItemCategoryType) => {
                  let isActive = category.id === selectedCategoryId;
                  return (
                    <Pressable
                      p={4}
                      px={10}
                      key={category.id}
                      bg={isActive ? "light.300" : "transparent"}
                      onPress={() => onSelectCategory(category.id)}
                    >
                      <Text
                        fontFamily="sf-pro-text-medium"
                        fontWeight="600"
                        fontSize={15}
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </Flex>
            <Flex w="80%">
              <Flex
                direction="row"
                bg={useColorModeValue("light.200", "dark.50")}
                textAlign="center"
                py={3}
                px={2}
              >
                <Text flex={0.5} textAlign="center">
                  No.
                </Text>
                <Text flex={0.5} textAlign="center">
                  Id
                </Text>
                <Text flex={1} textAlign="center">
                  Name
                </Text>
                <Text flex={1} textAlign="center">
                  Price
                </Text>
                <Text flex={1} textAlign="center">
                  Category
                </Text>
                <Text flex={1} textAlign="center">
                  Stock
                </Text>
              </Flex>
              {menuList.length > 0 && !isRefreshing ? (
                <FlatList
                  refreshing={isRefreshing}
                  onRefresh={getAllItem}
                  keyExtractor={(item, index) => item.name + index}
                  data={selectedMenuList}
                  renderItem={({ item, index }) => (
                    <MenuListItem
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
                    <Spinner accessibilityLabel="Loading posts" mx={10} />
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
                      No Item Found
                    </Heading>
                  </Flex>
                </PullToRefreshScrollView>
              )}
            </Flex>
          </Flex>
        </VStack>
      </Stack>

      {/* ------------------------------- this is edit stock modalllllllll----------------------------------------------- */}

      <Modal isOpen={openModal} onClose={onCloseHandler}>
        <KeyboardAvoidingView
          w="100%"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal.Content alignSelf="center" maxWidth="600px">
            <Modal.CloseButton />
            <Modal.Header>Edit Item</Modal.Header>
            <Modal.Body _scrollview={{ scrollEnabled: false }}>
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                my={3}
                pr={3}
              >
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={15}
                  py={2}
                >
                  Stock Check
                </Text>
                <Switch
                  isChecked={isStockCheck}
                  onToggle={() => setIsStockCheck((prevState) => !prevState)}
                  size="sm"
                />
              </Flex>
              <Box display={isStockCheck ? "flex" : "none"}>
                <Text
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="600"
                  fontSize={15}
                  py={2}
                >
                  Stock
                </Text>
                <Pressable
                  w="100%"
                  bg="transparent"
                  _pressed={{
                    bg: useColorModeValue("light.200", "dark.200"),
                  }}
                  onPress={() => setOpenNumberPad(true)}
                >
                  <Flex
                    direction="row"
                    justify="space-between"
                    align="center"
                    borderRadius={3}
                    borderWidth={0.5}
                    borderColor={useColorModeValue("light.300", "dark.300")}
                  >
                    <Button
                      flex={1}
                      py={4}
                      borderRadius={0}
                      colorScheme="red"
                      leftIcon={<Icon as={Entypo} name="minus" size="xs" />}
                      onPress={() =>
                        setEnteredAmount((prevState) =>
                          prevState !== 0 ? prevState - 1 : prevState
                        )
                      }
                    ></Button>
                    <Text
                      flex={5}
                      textAlign="center"
                      color={useColorModeValue("light.500", "dark.500")}
                      fontFamily="sf-pro-text-regular"
                      fontWeight="600"
                      fontSize={15}
                    >
                      {enteredAmount}
                    </Text>

                    <Button
                      flex={1}
                      py={4}
                      borderRadius={0}
                      colorScheme="green"
                      leftIcon={<Icon as={Entypo} name="plus" size="xs" />}
                      onPress={() =>
                        setEnteredAmount((prevState) => prevState + 1)
                      }
                    ></Button>
                  </Flex>
                </Pressable>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button
                w="100%"
                h={12}
                _text={{
                  color: "dark.800",
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "17px",
                }}
                onPress={onSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
      <NumberPadInput
        isOpen={openNumberPad}
        onClose={() => setOpenNumberPad(false)}
        headerTitle={`Total Stock`}
        getInput={onEnteredAmount}
        isDecimal={false}
        maximumInputLength={10}
      />
    </>
  );
};

interface MenuListItemProps {
  item: ItemType;
  index: number;
  onPress: Function;
}

const MenuListItem = ({ item, index, onPress }: MenuListItemProps) => {
  return (
    <Pressable
      bg={useColorModeValue("light.100", "dark.100")}
      py={4}
      _pressed={{ bg: useColorModeValue("light.400", "dark.400") }}
      onPress={() => onPress(item)}
    >
      <Flex direction="row">
        <Text flex={0.5} textAlign="center">
          {index + 1}
        </Text>
        <Text flex={0.5} textAlign="center">
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

export default MenuScreen;
