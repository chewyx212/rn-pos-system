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
  PresenceTransition,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { tableData, tableCategoryData } from "../assets/DUMMY";
import SlideFromRight from "../components/Ui/SlideFromRight";
import PasscodeVerification from "../components/PasscodeVerification";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import NumberPadInput from "../components/NumberPadInput";
import { RootStackParamList } from "./RootStackParams";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  OrderType,
  TableCategoryType,
  TableDataType,
} from "../types/tableType";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setOrder } from "../app/order/orderSlice";
import { LinearGradient } from "expo-linear-gradient";

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

type TableScreenProp = DrawerNavigationProp<RootStackParamList, "Table">;
type TableScreenRouteProp = RouteProp<RootStackParamList, "Table">;
const TableScreen = () => {
  const [tableList, setTableList] = useState<TableDataType[]>([]);
  const [categoryList, setCategoryList] = useState<TableCategoryType[]>(
    mappingItemCategory()
  );
  const [orderList, setOrderList] = useState<any[]>([]);
  const [isAllCategory, setIsAllCategory] = useState<boolean>(true);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [showOrderType, setShowOrderType] = useState<boolean>(false);
  const [showCustomQuantityModal, setShowCustomQuantityModal] =
    useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<TableDataType>({});
  const [showOrder, setShowOrder] = useState<OrderType>({});
  const [showTableOrder, setShowTableOrder] = useState<TableDataType>({});
  const [selectedCategory, setSelectedCategory] = useState<number>(
    mappingItemCategory()[0].id
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openTableCart, setOpenTableCart] = useState<boolean>(false);
  const [togglePasscode, setTogglePasscode] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const orderItem = useAppSelector((state) => state.order.orders);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<TableScreenProp>();

  const orderTypes = [
    {
      id: 2,
      name: "Take Away",
    },
    {
      id: 3,
      name: "Delivery Order",
    },
    {
      id: 4,
      name: "Counter",
    },
  ];

  useEffect(() => {
    orderItemMapping();
  }, []);
  useEffect(() => {
    orderItemMapping();
  }, [orderItem]);

  const orderRefresher = () => {
    setOpenTableCart(false);
    setOpenCart(false);
    orderItemMapping();
  };
  const orderItemMapping = async () => {
    const orderValue = await fetchOrder();
    // await AsyncStorage.removeItem('orders');
    let temp: number[] = [];
    let orderTemp = [...orderValue];
    let otherOrder: any[] = [];
    orderTemp.forEach((order, index) => {
      if (order.orderType === 1) {
        temp.push(order.tableId);
      } else {
        otherOrder.push(order);
      }
      order.orderIndex = index;
    });
    let tableTemp: TableDataType[] = [];
    setOrderList(otherOrder);
    tableData.forEach((table) => {
      if (temp.includes(table.id)) {
        let tempOrder = orderTemp.filter((order) => order.tableId === table.id);
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
        let tempStatus = temp.order[0].orderStatus;
        temp.order.forEach((order) => {
          if (order.orderStatus < tempStatus) {
            tempStatus = order.orderStatus;
          }
        });
        const [orderDetail] = temp.order;
        // orderDetail.detail.subtotal = orderDetail.detail.subtotal;
        // orderDetail.detail.total = orderDetail.detail.total;
        // if (orderDetail.discountDetail) {
        //   orderDetail.detail.discountAmount =
        //     orderDetail.discountDetail.discountAmount;
        //   orderDetail.detail.discountType =
        //     orderDetail.discountDetail.discountType;
        //   orderDetail.detail.reference = orderDetail.discountDetail.reference;
        //   if (orderDetail.detail.discountType === 1) {
        //     orderDetail.detail.total =
        //       orderDetail.detail.total - orderDetail.detail.discountAmount;
        //   } else if (orderDetail.detail.discountType === 2) {
        //     orderDetail.detail.total =
        //       (orderDetail.detail.total *
        //         (100 - orderDetail.detail.discountAmount)) /
        //       100;
        //   } else if (orderDetail.detail.discountType === 3) {
        //     orderDetail.detail.total = orderDetail.detail.discountAmount;
        //   } else if (orderDetail.detail.discountType === 4) {
        //     orderDetail.detail.total = 0;
        //   }
        // }
        temp.total = orderDetail.detail.total;

        temp.status = tempStatus;
        console.log(temp);
      }
    });
    setTableList(tableTemp);
  };

  const onSelectShowOrder = (order: OrderType) => {
    setShowOrder(order);
    setOpenTableCart(false);
    setOpenCart(true);
  };

  const onSelectShowTableOrder = (table: TableDataType) => {
    setShowTableOrder(table);
    setOpenTableCart(true);
    setOpenCart(false);
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

  const openPasscode = () => {
    navigation.setOptions({
      drawerType: "front",
    });
    navigation.closeDrawer();
    setTogglePasscode(true);
  };
  const closePasscode = () => {
    navigation.setOptions({
      drawerType: "permanent",
    });
    setTogglePasscode(false);
  };

  const submitHandler = (result) => {
    console.log("heihei");
  };

  const onSelectStartOrder = () => {
    setShowOrderType(true);
  };
  const onSelectOrderType = (type: number) => {
    setShowOrderType(false);
    navigation.navigate("Order", {
      orderType: type,
      orders: [],
      refresher: orderRefresher,
    });
  };
  const checkoutHandler = () => {
    onCloseConfirm();
    navigation.navigate("Payment");
  }

  const onCloseConfirm = () => setIsConfirm(false);

  return (
    <>
      <Stack
        safeAreaBottom
        position="relative"
        h="100%"
        direction="row"
        pl={2}
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <VStack h="100%" flex={1} mr="1%">
          {/* <Flex direction="row" w="100%" justify="space-between" align="center">
            <Heading
              size="lg"
              fontFamily="sf-pro-display-bold"
              fontWeight="600"
              fontSize={{ base: 24, md: 32 }}
            >
              Table & Order
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
              <Menu.Item onPress={() => onSelectOrderType(2)}>
                Take Away
              </Menu.Item>
              <Menu.Item onPress={() => onSelectOrderType(3)}>
                Delivery
              </Menu.Item>
              <Menu.Item onPress={() => onSelectOrderType(4)}>
                Counter
              </Menu.Item>
            </Menu>
          </Flex> */}
          <Stack maxH={{ md: "12%" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              overflow="scroll"
              _contentContainerStyle={{
                m: "1%",
                py: "5px",
              }}
            >
              {(() => {
                let bgColor = useColorModeValue("transparent", "transparent");
                let textColor = useColorModeValue("muted.500", "muted.400");
                let pressedBgColor = useColorModeValue(
                  "themeColor.50",
                  "themeColoer.50"
                );
                let pressedTextColor = useColorModeValue(
                  "themeColor.900",
                  "themeColoer.900"
                );

                if (isAllCategory) {
                  bgColor = useColorModeValue(
                    "themeColor.500",
                    "themeColor.700"
                  );
                  textColor = useColorModeValue(
                    "textColor.buttonText",
                    "light.50"
                  );
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
                      bg: pressedBgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: pressedTextColor },
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
                let pressedBgColor = useColorModeValue(
                  "themeColor.50",
                  "themeColoer.50"
                );
                let pressedTextColor = useColorModeValue(
                  "themeColor.900",
                  "themeColoer.900"
                );
                if (isActive) {
                  bgColor = useColorModeValue(
                    "themeColor.500",
                    "themeColor.700"
                  );
                  textColor = useColorModeValue(
                    "textColor.buttonText",
                    "light.50"
                  );
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
                      bg: pressedBgColor,
                      // @ts-ignore: Unreachable code error
                      _text: { color: pressedTextColor },
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
              <Pressable
                flexBasis={{ base: "46%", lg: "18%" }}
                h={{ base: "150px", md: "165px" }}
                borderRadius="lg"
                mx={{ base: "2%", md: "1.5", lg: "1%" }}
                my={{ base: "2%", md: "1.5", lg: "1%" }}
                bg={useColorModeValue("greyColor.50", "greyColor.1000")}
                borderStyle="dashed"
                borderWidth={3}
                borderColor="dottedColor.borderColor"
                _pressed={{
                  bg: useColorModeValue("greyColor.300", "bgDarkColor.300"),
                }}
                onPress={() => {
                  onSelectStartOrder();
                }}
              >
                <Flex
                  w="100%"
                  h="100%"
                  borderRadius="lg"
                  justify="center"
                  align="center"
                >
                  <Text
                    fontFamily="sf-pro-text-semibold"
                    fontWeight="600"
                    fontSize={18}
                    color="dottedColor.textColor"
                  >
                    Start Order
                  </Text>
                </Flex>
              </Pressable>
              {isAllCategory &&
                orderList.map((order, index) => {
                  let statusBgColor = "tableStatus.100";
                  if (order.orderStatus === 1) {
                    statusBgColor = "tableStatus.300";
                  }
                  if (order.orderStatus === 2) {
                    statusBgColor = "tableStatus.200";
                  }
                  if (order.orderStatus === 3) {
                    statusBgColor = "tableStatus.400";
                  }

                  return (
                    <Pressable
                      key={order.id}
                      flexBasis={{ base: "46%", lg: "18%" }}
                      h={{ base: "150px", md: "165px" }}
                      borderRadius="lg"
                      mx={{ base: "2%", md: "1.5", lg: "1%" }}
                      my={{ base: "2%", md: "1.5", lg: "1%" }}
                      onPress={() => {
                        onSelectShowOrder(order);
                      }}
                    >
                      {({ isPressed }) => (
                        <Flex
                          w="100%"
                          h="100%"
                          shadow={2}
                          borderRadius="lg"
                          justify="space-between"
                          direction="row"
                          bg={
                            isPressed
                              ? useColorModeValue(
                                  "greyColor.50",
                                  "bgDarkColor.50"
                                )
                              : useColorModeValue("white", "dark.200")
                          }
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
                                {order.name}
                                {order.orderType === 2 && "TA" + 0 + order.id}
                                {order.orderType === 3 && "DO" + 0 + order.id}
                                {order.orderType === 4 && "CO" + 0 + order.id}
                              </Text>

                              <Flex>
                                {order && order.items.length > 0 && (
                                  <Text
                                    fontFamily="sf-pro-text-semibold"
                                    fontSize="15px"
                                  >
                                    RM
                                    {parseFloat(order.detail.total).toFixed(2)}
                                  </Text>
                                )}
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      )}
                    </Pressable>
                  );
                })}
              {tableList
                .filter(
                  (table) =>
                    table.table_category_id === selectedCategory ||
                    isAllCategory
                )
                .map((table) => {
                  let statusBgColor = "tableStatus.100";
                  if (table.status === 1) {
                    statusBgColor = "tableStatus.300";
                  }
                  if (table.status === 2) {
                    statusBgColor = "tableStatus.200";
                  }
                  if (table.status === 3) {
                    statusBgColor = "tableStatus.400";
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
                          onSelectShowTableOrder(table);
                        }
                      }}
                    >
                      {({ isPressed }) => (
                        <Flex
                          w="100%"
                          h="100%"
                          shadow={2}
                          borderRadius="lg"
                          justify="space-between"
                          direction="row"
                          bg={
                            isPressed
                              ? useColorModeValue(
                                  "greyColor.50",
                                  "bgDarkColor.50"
                                )
                              : useColorModeValue("white", "dark.200")
                          }
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
                                {table.order && table.order.length > 0 && (
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
                      )}
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

        <Modal isOpen={showOrderType} onClose={() => setShowOrderType(false)}>
          <Modal.Content maxW={{ base: "320px", md: "600px" }} w="100%">
            <Modal.CloseButton />
            <Modal.Header>Order Type</Modal.Header>
            <Modal.Body>
              <Flex direction="row" w="100%" align="flex-start" wrap="wrap">
                {orderTypes.map((type) => (
                  <Button
                    key={type.id}
                    flex={1}
                    borderColor="light.400"
                    borderWidth={0.5}
                    bg="transparent"
                    _text={{ color: "light.400" }}
                    _pressed={{
                      bg: useColorModeValue("light.200", "dark.200"),
                    }}
                    flexBasis="30%"
                    mx="1.6%"
                    my="3%"
                    maxW="30%"
                    h={40}
                    onPress={() => onSelectOrderType(type.id)}
                  >
                    {type.name}
                  </Button>
                ))}
              </Flex>
            </Modal.Body>
          </Modal.Content>
        </Modal>

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
            <AlertDialog.Body>Ready to checkout?</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  _text={{
                    color: "textColor.buttonText",
                    fontFamily: "sf-pro-text-medium",
                    fontSize: "13px",
                  }}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  onPress={checkoutHandler}
                  colorScheme="themeColor"
                  _text={{
                    color: "textColor.buttonText",
                    fontFamily: "sf-pro-text-medium",
                    fontSize: "13px",
                  }}
                >
                  Proceed to Payment
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Stack>
      {openTableCart && (
        <Pressable
          position="absolute"
          w="100%"
          h="100%"
          bg={useColorModeValue(
            "greyColor.400:alpha.60",
            "greyColor.900:alpha.70"
          )}
          onPress={() => setOpenTableCart(false)}
        ></Pressable>
      )}
      {openCart && (
        <Pressable
          position="absolute"
          w="100%"
          h="100%"
          bg={useColorModeValue(
            "greyColor.400:alpha.60",
            "greyColor.900:alpha.70"
          )}
          onPress={() => setOpenCart(false)}
        ></Pressable>
      )}
      <PasscodeVerification
        isOpen={togglePasscode}
        onClose={closePasscode}
        submitHandler={submitHandler}
        w="100%"
        top="0"
        right="0"
        bottom="0"
        h="100%"
      />

      <SlideFromRight
        isOpen={openTableCart}
        w={{ base: "100%", md: "50%" }}
        top="0"
        right="0"
        bottom="0"
        h="100%"
      >
        <VStack
          h="100%"
          bg={useColorModeValue("greyColor.50", "greyColor.900")}
        >
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
                onPress={() => setOpenTableCart(false)}
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
              </Flex>
              <IconButton
                icon={<Icon as={AntDesign} name="close" size="sm" />}
                onPress={() => setOpenCart(false)}
              />
            </Flex>
            <FlatList
              keyExtractor={(item, index) => `${item.name}${index}`}
              data={showOrder.items}
              renderItem={({ item }) => <CartListItem item={item} />}
            />
          </View>
          <OrderDetailComponent
            setIsConfirm={setIsConfirm}
            cartItem={[showOrder]}
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
                  item.discountType && item.discountAmount !== 0
                    ? useColorModeValue("green.400", "green.500")
                    : item.orderStatus === 1
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
    subtotal: 0.0,
    total: 0.0,
    discountType: 1,
    discountAmount: 0.0,
    reference: "",
    tax: 0.0,
  };
  const [orderDetail] = cartItem;
  detail = orderDetail.detail;
  // if (orderDetail.discountDetail) {
  //   detail.discountAmount = orderDetail.discountDetail.discountAmount;
  //   detail.discountType = orderDetail.discountDetail.discountType;
  //   detail.reference = orderDetail.discountDetail.reference;
  //   if (detail.discountType === 1) {
  //     detail.total = detail.subtotal - detail.discountAmount;
  //   } else if (detail.discountType === 2) {
  //     detail.total = (detail.subtotal * (100 - detail.discountAmount)) / 100;
  //   } else if (detail.discountType === 3) {
  //     detail.total = detail.discountAmount;
  //   } else if (detail.discountType === 4) {
  //     detail.total = 0;
  //   }
  // }

  return (
    <Flex
      justify="flex-end"
      pt={4}
      pb={{ base: 10, md: 5 }}
      mb={{ md: 5 }}
      px={3}
      mx={3}
      borderRadius={{ base: undefined, md: "xl" }}
      bg={useColorModeValue("white", "greyColor.1000")}
    >
      <Flex direction="row" align="center" justify="space-between">
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          Subtotal
        </Text>
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          {detail.subtotal.toFixed(2)}
        </Text>
      </Flex>
      {(detail.discountAmount > 0 || detail.discountType === 4) && (
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
            {detail.discountType === 1
              ? `- RM ${detail.discountAmount.toFixed(2)}`
              : detail.discountType === 2
              ? `- RM ${(detail.subtotal - detail.total + detail.tax).toFixed(
                  2
                )} (${detail.discountAmount}%)`
              : detail.discountType === 3
              ? `- RM ${(detail.subtotal - detail.total + detail.tax).toFixed(
                  2
                )}`
              : "FOC"}
          </Text>
        </Flex>
      )}

      {detail.tax > 0 && detail.discountType !== 4 && (
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
        <Button
          flex={{ base: 11, lg: 9 }}
          disabled={cartItem.length < 1}
          onPress={() => {
            if (cartItem.length > 0) setIsConfirm(true);
          }}
          bg={useColorModeValue("themeColor.500", "themeColor.600")}
          _pressed={{
            bg: useColorModeValue("themeColor.700", "themeColor.700"),
          }}
          _text={{
            color: "textColor.buttonText",
            fontFamily: "sf-pro-text-medium",
            fontSize: "15px",
          }}
        >
          Checkout
        </Button>
      </HStack>
    </Flex>
  );
};

export default TableScreen;
