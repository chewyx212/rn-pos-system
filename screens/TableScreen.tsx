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
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { tableData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import { Platform } from "react-native";
import NumberPadInput from "../components/NumberPadInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mappingItemCategory = () => {
  let category = [];
  let idList: number[] = [];
  tableData.forEach((table) => {
    if (!idList.includes(table.table_category.id)) {
      idList.push(table.table_category.id);
      category.push(table.table_category);
    }
  });
  return category;
};

type tableScreenProp = StackNavigationProp<RootStackParamList, "Table">;
const TableScreen = () => {
  const [tableList, setTableList] = useState(tableData);
  const [categoryList, setCategoryList] = useState(mappingItemCategory());
  const [isAllCategory, setIsAllCategory] = useState<boolean>(true);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const [showCustomQuantityModal, setShowCustomQuantityModal] =
    useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState();
  const [orders, setOrders] = useState([]);
  const [tableOrders, setTableOrders] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    mappingItemCategory()[0].id
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState({
    subtotal: 0.0,
    total: 0.0,
    discount: 0.0,
    tax: 0.0,
  });
  const dispatch = useAppDispatch();
  const orderItem = useAppSelector((state) => state.order.orders);
  const cartItem = useAppSelector((state) => state.cart.cartItem);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<tableScreenProp>();

  useEffect(() => {
    calculateOrderPrice(cartItem);
  }, [cartItem]);

  useEffect(() => {
    orderItemMapping();
  }, []);
  useEffect(() => {
    orderItemMapping();
  }, [orderItem]);

  const orderItemMapping = async () => {
    const orderValue = await fetchOrder();
    let temp: number[] = [];
    orderValue.forEach((order) => {
      if (order.orderType === 1) {
        temp.push(order.tableId);
      }
      order.detail = calculateOrderPrice(order.items);
    });
    tableList.forEach((table) => {
      if (tableOrders.includes(table.id)) {
        table.status = 1;
        table.pax = orderValue.find((order) => order?.tableId === table.id).pax;
        table.order = orderValue.filter((order) => order.tableId === table.id);
        table.order.forEach((order) => {
          table.total += order.detail.total;
        });
      }
    });

    setOrders(orderValue);
  };

  const onSelectQuantity = (quantity: number) => {
    navigation.navigate("Order", {
      orderType: 1,
      tableId: selectedTable?.id,
      pax: quantity,
    });
    setShowQuantityModal(false);
    setShowCustomQuantityModal(false);
  };

  const calculateOrderPrice = (items) => {
    let detail = {
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };

    items.forEach((item) => {
      detail.subtotal += parseFloat(item.calculatedPrice);
    });
    detail.subtotal = parseFloat(detail.subtotal.toFixed(2));

    detail.total = parseFloat(detail.subtotal.toFixed(2));

    setOrderDetail(detail);
    return detail;
  };

  const onCloseConfirm = () => setIsConfirm(false);

  return (
    <>
      <Stack
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
                  return (
                    <Pressable
                      key={table.id}
                      flexBasis={{ base: "46%", lg: "18%" }}
                      h={{ base: "150px", md: "165px" }}
                      borderRadius="lg"
                      mx={{ base: "2%", md: "1.5", lg: "1%" }}
                      my={{ base: "2%", md: "1.5", lg: "1%" }}
                      onPress={() => {
                        setSelectedTable(table);
                        setShowQuantityModal(true);
                      }}
                    >
                      {({ isHovered, isFocused, isPressed }) => {
                        let statusBgColor = useColorModeValue(
                          "red.500",
                          "red.700"
                        );
                        if (table.status === 2) {
                          statusBgColor = useColorModeValue(
                            "green.500",
                            "green.700"
                          );
                        }

                        if (table.status === 3) {
                          statusBgColor = useColorModeValue(
                            "blue.500",
                            "blue.700"
                          );
                        }
                        if (table.status === 4) {
                          statusBgColor = useColorModeValue(
                            "amber.500",
                            "amber.700"
                          );
                        }
                        return (
                          <>
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
                                    {table.total > 0 && (
                                      <Text
                                        fontFamily="sf-pro-text-semibold"
                                        fontSize="15px"
                                      >
                                        RM{table.total.toFixed(2)}
                                      </Text>
                                    )}
                                    <Flex direction="row" align="center">
                                      {table.pax > 0 && (
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
                                            {table.pax}
                                          </Text>
                                        </>
                                      )}
                                    </Flex>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Flex>
                          </>
                        );
                      }}
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

      <SlideFromRight
        isOpen={openCart}
        w={{ base: "100%", md: "0%" }}
        right="0"
        h="100%"
      >
        <VStack h="100%" bg={useColorModeValue("light.100", "muted.800")}>
          <View w="100%" flex={14} px={3}>
            <Flex direction="row" justify="space-between" align="center" py={2}>
              <Heading
                size="md"
                fontFamily="sf-pro-text-bold"
                fontWeight="600"
                fontSize={17}
              >
                Current Order
              </Heading>
              <IconButton
                icon={<Icon as={AntDesign} name="close" size="sm" />}
                onPress={() => setOpenCart(false)}
              />
            </Flex>
            <FlatList
              keyExtractor={(item, index) => item.name + index}
              data={cartItem}
              renderItem={({ item }) => <CartListItem item={item} />}
            />
          </View>
          <OrderDetailComponent
            setIsConfirm={setIsConfirm}
            cartItem={cartItem}
            order={orderDetail}
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
                  fontFamily="sf-pro-text-regular"
                  fontWeight="400"
                  fontSize={{ base: 14, md: 12 }}
                  isTruncated
                  noOfLines={2}
                  maxW={{ base: "150", md: "120" }}
                >
                  {item.addons.length > 0 &&
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
              <Text textAlign="right">
                {item.addons.length > 0
                  ? `RM ${item.calculatedPrice} x ${item.quantity}`
                  : `RM ${item.price} x ${item.quantity}`}
              </Text>
            </View>
          </Flex>
        );
      }}
    </Pressable>
  );
};

const OrderDetailComponent = ({ cartItem, order, setIsConfirm }) => {
  return (
    <Flex
      justify="flex-end"
      pt={4}
      pb={{ base: 10, md: 5 }}
      mb={{ md: 5 }}
      px={3}
      borderRadius={{ base: undefined, md: "xl" }}
      bg={useColorModeValue("white", "black")}
    >
      <Flex direction="row" align="center" justify="space-between">
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          Subtotal
        </Text>
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          {order.subtotal}
        </Text>
      </Flex>
      {parseFloat(order.discount) > 0 && (
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
            {order.discount}
          </Text>
        </Flex>
      )}

      {parseFloat(order.tax) > 0 && (
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
            {order.tax}
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
          {order.total}
        </Text>
      </Flex>

      <HStack space={2} pt={3}>
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
