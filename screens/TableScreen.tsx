import {
  Text,
  Stack,
  HStack,
  useColorModeValue,
  Heading,
  Box,
  Button,
  VStack,
  ScrollView,
  FlatList,
  Flex,
  Image,
  Pressable,
  View,
  Icon,
  AlertDialog,
  Modal,
  IconButton,
  useToast,
  Menu,
  useContrastText,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { tableData, tableCategoryData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import NumberPadInput from "../components/NumberPadInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TableCategoryType, TableDataType } from "../types/tableType";

const mappingItemCategory = () => {
  // let category: TableCategoryType[] = [];
  // let idList: number[] = [];
  // tableData.forEach((table: TableDataType) => {
  //   if (!idList.includes(table.table_category.id)) {
  //     idList.push(table.table_category.id);
  //     category.push(table.table_category);
  //   }
  // });
  // return category;
  return tableCategoryData;
};

type TableScreenProp = StackNavigationProp<RootStackParamList, "Table">;
type TableScreenRouteProp = RouteProp<RootStackParamList, "Table">;
const TableScreen = () => {
  const [tableList, setTableList] = useState<TableDataType[]>([]);
  const [categoryList, setCategoryList] = useState<TableCategoryType[]>(
    mappingItemCategory()
  );
  const [isAllCategory, setIsAllCategory] = useState<boolean>(true);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [showCustomQuantityModal, setShowCustomQuantityModal] =
    useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<TableDataType>({});
  const [showTableOrder, setShowTableOrder] = useState<TableDataType>({});
  const [selectedCategory, setSelectedCategory] = useState<number>(
    mappingItemCategory()[0].id
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const orderItem = useAppSelector((state) => state.order.orders);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<TableScreenProp>();

  useEffect(() => {
    orderItemMapping();
  }, []);
  useEffect(() => {
    orderItemMapping();
  }, [orderItem]);

  const orderRefresher = () => {
    setOpenCart(false);
    orderItemMapping();
  };
  const orderItemMapping = async () => {
    const orderValue = await fetchOrder();
    let temp: number[] = [];
    let orderTemp = [...orderValue];
    orderTemp.forEach((order, index) => {
      if (order.orderType === 1) {
        temp.push(order.tableId);
      }
      console.log(index);
      console.log("this is indexxxxxxxxxxxxxxxxxxxxxx");
      order.orderIndex = index;
      order.detail = calculateOrderPrice(order.items);
    });
    let tableTemp: TableDataType[] = [];

    tableData.forEach((table) => {
      {
        /* <-------------- This code got huge problem :)---------------------------------> */
      }
      // if (temp.includes(ta ble.id)) {
      //   table.status = 1;
      //   table.pax = orderTemp.find((order) => order?.tableId === table.id).pax;
      //   table.order = orderTemp.filter((order) => order.tableId === table.id);
      //   let tempPrice = 0;
      //   table.order.forEach((order) => {
      //     tempPrice += order.detail.total;
      //   });
      //   table.total = tempPrice;
      // }

      if (temp.includes(table.id)) {
        let tempOrder = orderTemp.filter((order) => order.tableId === table.id);
        tempOrder.forEach((ord) => {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          console.log(ord.orderIndex);
        });
        tableTemp.push({
          ...table,
          order: tempOrder,
        });
      } else {
        tableTemp.push({ ...table, status: 0 });
      }
    });
    tableTemp.forEach((temp) => {
      if (temp.order && temp.order.length > 0) {
        temp.total = "0";
        let tempStatus = temp.order[0].orderStatus;
        temp.order.forEach((order) => {
          temp.total += parseFloat(order.detail.total);
          if (order.orderStatus < tempStatus) {
            tempStatus = order.orderStatus;
          }
        });

        temp.status = tempStatus;
      }
    });
    setTableList(tableTemp);
  };

  const calculateOrderPrice = (items) => {
    let detail = {
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };

    items.forEach((item) => {
      console.log(item.discountType);
      if (item.discountType && item.discountType === 1) {
        detail.subtotal +=
          (parseFloat(item.calculatedPrice) - item.discountAmount) *
          item.quantity;
      } else if (item.discountType && item.discountType === 2) {
        detail.subtotal +=
          ((parseFloat(item.calculatedPrice) * (100 - item.discountAmount)) /
            100) *
          item.quantity;
      } else if (item.discountType && item.discountType === 3) {
        detail.subtotal += item.discountAmount;
      } else if (item.discountType && item.discountType === 4) {
      } else {
        detail.subtotal += parseFloat(item.calculatedPrice) * item.quantity;
      }
    });
    detail.subtotal = parseFloat(detail.subtotal.toFixed(2));

    detail.total = parseFloat(detail.subtotal.toFixed(2));

    return detail;
  };

  const onSelectShowOrder = (table: TableDataType) => {
    console.log(table.order[0].items.length);
    setShowTableOrder(table);
    setOpenCart(true);
  };
  const onSelectQuantity = (quantity: number) => {
    navigation.navigate("Order", {
      orderType: 1,
      tableId: selectedTable?.id,
      pax: quantity,
      orders: [],
      refresher: orderRefresher,
    });
    setShowQuantityModal(false);
    setShowCustomQuantityModal(false);
  };

  const editOrder = (items) => {
    navigation.navigate("Order", {
      orderType: items[0].orderType,
      tableId: items[0].tableId,
      pax: items[0].pax,
      orders: items,
      refresher: orderRefresher,
    });
  };

  const onCloseConfirm = () => setIsConfirm(false);

  return (
    <>
      <Stack
        safeArea
        position="relative"
        h="100%"
        direction="row"
        pl={5}
        bg={useColorModeValue("light.100", "muted.800")}
      >
        <VStack h="100%" flex={6} mr="1%" pt={3}>
          <Flex direction="row" w="100%" justify="space-between" align="center">
            <Heading
              size="lg"
              fontFamily="sf-pro-display-bold"
              fontWeight="600"
              fontSize={{ base: 24, md: 32 }}
            >
              Table & Order
              {/* <Button
                variant="outline"
                onPress={() => {
                  navigation.navigate("TableEdit");
                }}
              >
                Edit Table
              </Button> */}
            </Heading>

            <Menu
              mr={5}
              pr={5}
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Button size="lg" {...triggerProps}>
                    Start Order
                  </Button>
                );
              }}
              placement="bottom right"
            >
              <Menu.Item>Take Away</Menu.Item>
              <Menu.Item>Delivery</Menu.Item>
              <Menu.Item>Counter</Menu.Item>
            </Menu>
          </Flex>
          <Stack maxH={{ md: "12%" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              overflow="scroll"
              _contentContainerStyle={{
                m: "1%",
                py: "10px",
              }}
            >
              {(() => {
                let bgColor = useColorModeValue("transparent", "transparent");
                let textColor = useColorModeValue("muted.500", "muted.400");
                if (isAllCategory) {
                  bgColor = useColorModeValue("primary.500", "primary.700");
                  textColor = useColorModeValue("light.50", "light.50");
                }
                return (
                  <Button
                    bg={bgColor}
                    _text={{
                      color: textColor,
                      fontFamily: "sf-pro-text-medium",
                      fontSize: { base: 17, md: 15 },
                    }}
                    _pressed={{
                      bg: bgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: textColor },
                    }}
                    _hover={{
                      bg: bgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: textColor },
                    }}
                    disabled={isAllCategory}
                    borderRadius="2xl"
                    mx={1}
                    onPress={() => {
                      setIsAllCategory(true);
                    }}
                  >
                    All
                  </Button>
                );
              })()}
              {categoryList.map((category) => {
                let isActive =
                  category.id === selectedCategory && !isAllCategory;
                let bgColor = useColorModeValue("transparent", "transparent");
                let textColor = useColorModeValue("muted.500", "muted.400");
                if (isActive) {
                  bgColor = useColorModeValue("primary.500", "primary.700");
                  textColor = useColorModeValue("light.50", "light.50");
                }
                return (
                  <Button
                    key={category.id}
                    bg={bgColor}
                    _text={{
                      color: textColor,
                      fontFamily: "sf-pro-text-medium",
                      fontSize: { base: 17, md: 15 },
                    }}
                    _pressed={{
                      bg: bgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: textColor },
                    }}
                    _hover={{
                      bg: bgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: textColor },
                    }}
                    disabled={isActive}
                    borderRadius="2xl"
                    mx={1}
                    onPress={() => {
                      setSelectedCategory(category.id);
                      setIsAllCategory(false);
                    }}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </ScrollView>
          </Stack>

          <ScrollView
            _contentContainerStyle={{
              px: "5px",
            }}
          >
            <Flex flex="1" direction="row" wrap="wrap" justify="flex-start">
              {tableList
                .filter(
                  (table) =>
                    table.table_category_id === selectedCategory ||
                    isAllCategory
                )
                .map((table) => {
                  let statusBgColor = useColorModeValue(
                    "green.500",
                    "green.700"
                  );
                  if (table.status === 1) {
                    statusBgColor = useColorModeValue("amber.500", "amber.700");
                  }
                  if (table.status === 2) {
                    statusBgColor = useColorModeValue("blue.500", "blue.700");
                  }
                  if (table.status === 3) {
                    statusBgColor = useColorModeValue("red.500", "red.700");
                  }

                  return (
                    <Pressable
                      key={table.id}
                      flexBasis={{ base: "46%", lg: "18%" }}
                      h={{ base: "150px", md: "165px" }}
                      borderRadius="lg"
                      mx={{ base: "2%", md: "1.5", lg: "1%" }}
                      my={{ base: "2%", md: "1.5", lg: "1%" }}
                      onPress={() => {
                        if (table.status === 0) {
                          setSelectedTable(table);
                          setShowQuantityModal(true);
                        } else {
                          onSelectShowOrder(table);
                        }
                      }}
                    >
                      <Flex
                        w="100%"
                        h="100%"
                        bg={useColorModeValue("white", "dark.200")}
                        shadow={2}
                        borderRadius="lg"
                        justify="space-between"
                        direction="row"
                      >
                        <Box
                          borderLeftRadius="lg"
                          bg={statusBgColor}
                          w={{ base: "7%", md: "5%", lg: "9%" }}
                          h="100%"
                        ></Box>

                        <Flex
                          borderRightRadius="lg"
                          w="90%"
                          h="100%"
                          direction="row"
                          justify="space-between"
                          py={2}
                          pl={1}
                        >
                          <Flex h="100%" justify="space-between" pl={2}>
                            <Text
                              fontFamily="sf-pro-display-bold"
                              fontSize="22px"
                            >
                              {table.name}
                            </Text>

                            <Flex>
                              {table.order && parseFloat(table.total) > 0 && (
                                <Text
                                  fontFamily="sf-pro-text-semibold"
                                  fontSize="15px"
                                >
                                  RM
                                  {parseFloat(table.total).toFixed(2)}
                                </Text>
                              )}
                              <Flex direction="row" align="center">
                                {table.order &&
                                  table.order.length > 0 &&
                                  parseInt(table.order[0].pax) > 0 && (
                                    <>
                                      <Icon
                                        as={Ionicons}
                                        name="people"
                                        size="sm"
                                        mr={2}
                                        color={useColorModeValue(
                                          "muted.400",
                                          "muted.400"
                                        )}
                                      />
                                      <Text
                                        fontFamily="sf-pro-text-medium"
                                        fontSize="19px"
                                        textAlign="center"
                                        color={useColorModeValue(
                                          "muted.400",
                                          "muted.400"
                                        )}
                                      >
                                        {table.order[0].pax}
                                      </Text>
                                    </>
                                  )}
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Pressable>
                  );
                })}
            </Flex>
          </ScrollView>
        </VStack>

        {/* <-------------- Quantity Modal when order on table--> */}

        <Modal
          isOpen={showQuantityModal}
          onClose={() => setShowQuantityModal(false)}
        >
          <Modal.Content maxW={{ base: "320px", md: "400px" }} w="100%">
            <Modal.CloseButton />
            <Modal.Header>Number of customer</Modal.Header>
            <Modal.Body>
              <Flex direction="row" w="100%" align="flex-start" wrap="wrap">
                {[...Array(7)].map((elementInArray, index) => (
                  <Button
                    key={index}
                    flex={1}
                    borderColor="light.400"
                    borderWidth={0.5}
                    bg="transparent"
                    _text={{ color: "light.400" }}
                    _pressed={{
                      bg: useColorModeValue("light.200", "dark.200"),
                    }}
                    flexBasis="23%"
                    mx="1%"
                    my="3%"
                    maxW="23%"
                    h={16}
                    onPress={() => onSelectQuantity(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  flex={1}
                  borderColor="light.400"
                  borderWidth={0.5}
                  bg="transparent"
                  _text={{ color: "light.400" }}
                  _pressed={{
                    bg: useColorModeValue("light.200", "dark.200"),
                  }}
                  flexBasis="23%"
                  mx="1%"
                  my="3%"
                  maxW="23%"
                  h={16}
                  onPress={() => setShowCustomQuantityModal(true)}
                >
                  Custom
                </Button>
              </Flex>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        {/* <-------------- Custom Quantity Modal when --> */}
        <NumberPadInput
          isOpen={showCustomQuantityModal}
          onClose={() => setShowCustomQuantityModal(false)}
          headerTitle={`Number of customer`}
          getInput={onSelectQuantity}
          isDecimal={false}
          maximumInputLength={4}
        />

        {/* <-------------- Confirmation Modal when checkout--> */}
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isConfirm}
          onClose={onCloseConfirm}
          closeOnOverlayClick={true}
          size="md"
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Place Order</AlertDialog.Header>
            <AlertDialog.Body>
              Your order will be send to kitchen and start prepare.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  ref={cancelRef}
                >
                  Hold Order
                </Button>
                <Button colorScheme="success">Send to Kitchen</Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Stack>
      {openCart && (
        <Pressable
          position="absolute"
          w="100%"
          h="100%"
          bg={useColorModeValue("muted.600:alpha.40", "muted.800")}
          onPress={() => setOpenCart(false)}
        ></Pressable>
      )}
      <SlideFromRight
        isOpen={openCart}
        w={{ base: "100%", md: "50%" }}
        top="0"
        right="0"
        bottom="0"
        h="100%"
      >
        <VStack h="100%" bg={useColorModeValue("light.100", "muted.800")}>
          <View w="100%" flex={14} px={3} h="100%">
            <Flex direction="row" justify="space-between" align="center" py={4}>
              <Flex direction="row">
                <Text
                  fontFamily="sf-pro-text-bold"
                  fontWeight="600"
                  fontSize={17}
                >
                  Current Order
                </Text>
                <Icon
                  as={Ionicons}
                  name="people"
                  size="sm"
                  mx={3}
                  color={useColorModeValue("muted.400", "muted.400")}
                />
                <Text
                  fontFamily="sf-pro-text-medium"
                  fontWeight="500"
                  fontSize={15}
                >
                  {showTableOrder.order?.[0].pax}
                </Text>
              </Flex>
              <IconButton
                icon={<Icon as={AntDesign} name="close" size="sm" />}
                onPress={() => setOpenCart(false)}
              />
            </Flex>
            {showTableOrder.order &&
              showTableOrder.order.length > 0 &&
              showTableOrder.order.map((order) => (
                <FlatList
                  key={order}
                  keyExtractor={(item, index) => `${item.name}${index}`}
                  data={order.items}
                  renderItem={({ item }) => <CartListItem item={item} />}
                />
              ))}
          </View>
          <OrderDetailComponent
            setIsConfirm={setIsConfirm}
            cartItem={showTableOrder?.order}
            editOrder={editOrder}
          />
        </VStack>
      </SlideFromRight>
    </>
  );
};

const CartListItem = ({ item }) => {
  return (
    <Pressable>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Flex
            w="100%"
            py={1}
            bg={isPressed || isHovered ? "dark.100:alpha.30" : "transparent"}
            direction="row"
            align="center"
            justify="space-between"
          >
            <HStack flex={3}>
              <Image
                size="sm"
                resizeMode={"cover"}
                borderRadius="md"
                mr="10px"
                bg={useColorModeValue("dark.500:alpha.20", "dark.300:alpha.20")}
                source={{
                  uri: item.image?.url,
                }}
                alt="Alternate Text"
              />
              <VStack>
                <Text
                  color={
                    item.orderStatus === 1
                      ? useColorModeValue("red.400", "red.500")
                      : useColorModeValue("dark.100", "light.100")
                  }
                  fontFamily="sf-pro-text-semibold"
                  fontWeight="400"
                  fontSize={15}
                  isTruncated
                  noOfLines={2}
                  maxW={{ base: "150", md: "120" }}
                >
                  {item.id}. {item.name}
                </Text>
                <Text
                  color={
                    item.orderStatus === 1
                      ? useColorModeValue("red.400", "red.500")
                      : useColorModeValue("dark.100", "light.100")
                  }
                  fontFamily="sf-pro-text-regular"
                  fontWeight="400"
                  fontSize={{ base: 14, md: 12 }}
                  isTruncated
                  noOfLines={2}
                  maxW={{ base: "150", md: "120" }}
                >
                  {item.addons?.length > 0 &&
                    item.addons.map((addon, index) => {
                      if (index + 1 === item.addons.length) {
                        return `${addon.name}`;
                      } else {
                        return `${addon.name}, `;
                      }
                    })}
                </Text>
              </VStack>
            </HStack>
            <View flex={2}>
              <Text
                textAlign="right"
                color={
                  item.orderStatus === 1
                    ? useColorModeValue("red.400", "red.500")
                    : useColorModeValue("dark.100", "light.100")
                }
              >
                {item.discountType && item.discountType === 1
                  ? `RM ${(item.calculatedPrice - item.discountAmount).toFixed(
                      2
                    )} x ${item.quantity}`
                  : item.discountType && item.discountType === 2
                  ? `RM  ${(
                      (item.calculatedPrice * (100 - item.discountAmount)) /
                      100
                    ).toFixed(2)} x ${item.quantity}`
                  : item.discountType && item.discountType === 3
                  ? `RM ${item.discountAmount.toFixed(2)} x ${item.quantity}`
                  : item.discountType && item.discountType === 4
                  ? `Free x ${item.quantity}`
                  : `RM ${item.calculatedPrice.toFixed(2)} x ${item.quantity}`}
              </Text>
            </View>
          </Flex>
        );
      }}
    </Pressable>
  );
};

const OrderDetailComponent = ({ cartItem, setIsConfirm, editOrder }) => {
  let detail = {
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  };
  cartItem.forEach((item) => {
    detail.subtotal += item.detail.subtotal;
    detail.discount += item.detail.discount;
    detail.total += item.detail.total;
  });
  return (
    <Flex
      justify="flex-end"
      pt={4}
      pb={{ base: 10, md: 5 }}
      mb={{ md: 5 }}
      px={3}
      mx={3}
      borderRadius={{ base: undefined, md: "xl" }}
      bg={useColorModeValue("white", "black")}
    >
      <Flex direction="row" align="center" justify="space-between">
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          Subtotal
        </Text>
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          {detail.subtotal.toFixed(2)}
        </Text>
      </Flex>
      {parseFloat(detail.discount) > 0 && (
        <Flex direction="row" align="center" justify="space-between">
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            Discount
          </Text>
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            {detail.discount.toFixed(2)}
          </Text>
        </Flex>
      )}

      {parseFloat(detail.tax) > 0 && (
        <Flex direction="row" align="center" justify="space-between">
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            Tax
          </Text>
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            {detail.tax.toFixed(2)}
          </Text>
        </Flex>
      )}
      <Flex direction="row" align="center" justify="space-between">
        <Text
          fontFamily="sf-pro-text-semibold"
          fontWeight="500"
          fontSize="17px"
        >
          Total
        </Text>
        <Text
          fontFamily="sf-pro-text-semibold"
          fontWeight="500"
          fontSize="17px"
        >
          {detail.total.toFixed(2)}
        </Text>
      </Flex>

      <HStack space={2} pt={3}>
        <Button
          flex={1}
          variant="outline"
          colorScheme="warmGray"
          onPress={() => editOrder(cartItem)}
        >
          Edit
        </Button>
        <PrimaryButton
          flex={{ base: 11, lg: 9 }}
          disabled={cartItem.length < 1}
          onPress={() => {
            if (cartItem.length > 0) setIsConfirm(true);
          }}
        >
          Checkout
        </PrimaryButton>
      </HStack>
    </Flex>
  );
};

export default TableScreen;
