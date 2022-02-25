import {
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Flex,
  Icon,
  IconButton,
  Heading,
  Pressable,
  ScrollView,
  FlatList,
  Button,
  Image,
  View,
  useBreakpointValue,
  Box,
  useToast,
} from "native-base";
import React, { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";
import NumberPadInput from "../components/NumberPadInput";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { ItemInCartType, OrderDetailType } from "../types/itemType";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import { setOrder } from "../app/order/orderSlice";
import { useAppDispatch } from "../app/hooks";
import { StockItemType } from "../types/stockType";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentScreenProp = StackNavigationProp<RootStackParamList, "Payment">;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "Payment">;

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<number>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [openSplitAmount, setOpenSplitAmount] = useState<boolean>(false);
  const [openCustomAmount, setOpenCustomAmount] = useState<boolean>(false);
  const [splitAmount, setSplitAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [itemList, setItemList] = useState<ItemInCartType[]>([]);
  const navigation = useNavigation<PaymentScreenProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { order,refresher } = route.params;
  const breakPoint: boolean = useBreakpointValue({
    base: true,
    md: false,
  });
  useEffect(() => {
    if (order && order.length > 0) {
      setItemList(order[0].items);
    } else {
      navigation.goBack();
    }
  }, []);
  const paymentMethods = [
    {
      id: 1,
      name: "Cash",
      img: require("./../assets/cash.png"),
    },
    {
      id: 2,
      name: "e-Wallet",
      img: require("./../assets/ewallet.png"),
    },
    {
      id: 3,
      name: "Credit Card",
      img: require("./../assets/creditcard.png"),
    },
  ];
  const quickPayments = [
    {
      id: 1,
      name: "Exact",
    },
    {
      id: 2,
      name: "50",
    },
    {
      id: 3,
      name: "100",
    },
    {
      id: 4,
      name: "150",
    },

    {
      id: 5,
      name: "200",
    },
  ];

  const subHeadingStyle = {
    fontFamily: "sf-pro-text-bold",
    fontWeight: "700",
    fontSize: "16px",
    color: useColorModeValue("greyColor.600", "greyColor.500"),
  };
  const onOpenSplitAmount = () => {
    setOpenSplitAmount(true);
  };

  const onSplitAmount = (enteredValue: number) => {
    setSplitAmount(enteredValue);
  };

  const onOpenCustomAmount = () => {
    setOpenCustomAmount(true);
  };

  const onCustomAmount = (enteredValue: number) => {
    setSelectedAmount(6);
    setCustomAmount(enteredValue);
  };

  const voidCreatedOrder = async () => {
    const orderValue = await fetchOrder();
    let orderTemp = [...orderValue];
    if (order && order[0]) {
      let orderIndex = order[0]?.orderIndex;
      orderTemp.splice(orderIndex, 1);

      // let tempStockList: StockItemType[] = [...stockList];

      // order[0].items.forEach((item) => {
      //   let index = tempStockList.findIndex((stock) => stock.id === item.id);
      //   if (index >= 0) {
      //     tempStockList[index].in_cart - item.quantity <= 0
      //       ? (tempStockList[index].in_cart = 0)
      //       : (tempStockList[index].in_cart -= item.quantity);
      //   }
      // });
      await storeOrder(orderTemp);
      dispatch(setOrder(orderTemp));
      await toast.closeAll();
      toast.show({
        title: `Payment Success!`,
        status: "success",
        placement: "top",
        isClosable: true,
      });
      navigation.navigate("Table");
      refresher()
      // await AsyncStorage.setItem("stocks", JSON.stringify(tempStockList));
    }
  };

  return (
    <>
      <Stack
        safeAreaBottom
        position="relative"
        h="100%"
        direction="row"
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <VStack h="100%" flex={6} pt={3}>
          <ScrollView scrollEnabled={breakPoint}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              flex={1}
              my={1}
              mx={2}
            >
              <Flex
                flex={1}
                mx={2}
                bg={useColorModeValue("white", "greyColor.900")}
                shadow={5}
                borderRadius="xl"
              >
                <Flex
                  flexBasis="10%"
                  py={4}
                  px={5}
                  w="100%"
                  borderBottomWidth={2}
                  borderBottomColor={useColorModeValue(
                    "greyColor.100",
                    "greyColor.800"
                  )}
                >
                  <Text
                    fontFamily="sf-pro-display-bold"
                    fontWeight="700"
                    fontSize={22}
                  >
                    Order Detail
                  </Text>
                </Flex>
                <Flex
                  flex={1}
                  py={3}
                  px={5}
                  w="100%"
                  borderBottomWidth={2}
                  borderBottomColor={useColorModeValue(
                    "greyColor.100",
                    "greyColor.800"
                  )}
                >
                  {!breakPoint && (
                    <FlatList
                      nestedScrollEnabled
                      keyExtractor={(item, index) => `${item.name}${index}`}
                      data={itemList}
                      renderItem={({ item }) => <CartListItem item={item} />}
                    />
                  )}

                  {breakPoint &&
                    itemList.map((item, index) => {
                      return (
                        <CartListItem
                          key={`${item.name}${index}`}
                          item={item}
                        />
                      );
                    })}
                </Flex>
                <Flex justifyContent="flex-end" py={4} px={5}>
                  <Flex direction="row" align="center" justify="space-between">
                    <Text
                      fontFamily="sf-pro-text-medium"
                      fontWeight="500"
                      fontSize="15px"
                    >
                      Subtotal
                    </Text>
                    <Text
                      fontFamily="sf-pro-text-medium"
                      fontWeight="500"
                      fontSize="15px"
                    >
                      {order[0].detail.subtotal.toFixed(2)}
                    </Text>
                  </Flex>
                  {!(
                    order[0].detail.discountType !== 4 &&
                    order[0].detail.discountAmount === 0
                  ) && (
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                    >
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
                        {order[0].detail.discountType === 1
                          ? `- RM ${order[0].detail.discountAmount.toFixed(2)}`
                          : order[0].detail.discountType === 2
                          ? `- RM ${(
                              order[0].detail.subtotal -
                              order[0].detail.total +
                              order[0].detail.tax
                            ).toFixed(2)} (${order[0].detail.discountAmount}%)`
                          : order[0].detail.discountType === 3
                          ? `- RM ${(
                              order[0].detail.subtotal -
                              order[0].detail.total +
                              order[0].detail.tax
                            ).toFixed(2)}`
                          : "FOC"}
                      </Text>
                    </Flex>
                  )}

                  {order[0].detail.tax > 0 &&
                    order[0].detail.discountType !== 4 && (
                      <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                      >
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
                          {order[0].detail.tax.toFixed(2)}
                        </Text>
                      </Flex>
                    )}
                  <Flex direction="row" align="center" justify="space-between">
                    <Text
                      fontFamily="sf-pro-text-bold"
                      fontWeight="700"
                      fontSize="17px"
                    >
                      Total
                    </Text>
                    <Text
                      fontFamily="sf-pro-text-bold"
                      fontWeight="700"
                      fontSize="17px"
                    >
                      {order[0].detail.total.toFixed(2)}
                    </Text>
                  </Flex>
                  {order[0].detail.paid > 0 && (
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                    >
                      <Text
                        fontFamily="sf-pro-text-bold"
                        fontWeight="700"
                        fontSize="17px"
                      >
                        Paid
                      </Text>
                      <Text
                        fontFamily="sf-pro-text-bold"
                        fontWeight="700"
                        fontSize="17px"
                      >
                        {order[0].detail.paid}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex mt={{ base: 5, md: 0 }} flex={1} mx={2}>
                <Flex direction="row" px={2} pb={1} justify="space-between">
                  <Text {...subHeadingStyle}>Payable Amount</Text>
                  <Pressable onPress={() => onOpenSplitAmount()}>
                    <Text
                      fontFamily="sf-pro-text-medium"
                      color={useColorModeValue(
                        "themeColor.500",
                        "themeColor.500"
                      )}
                    >
                      Split Amount
                    </Text>
                  </Pressable>
                </Flex>
                <Flex
                  flexBasis="17%"
                  borderRadius="lg"
                  w="100%"
                  p={7}
                  bg={useColorModeValue("white", "greyColor.900")}
                  shadow={2}
                  align="center"
                  justify="center"
                >
                  <Text
                    fontFamily="sf-pro-display-bold"
                    fontWeight="700"
                    fontSize="24px"
                  >
                    RM{" "}
                    {splitAmount > 0
                      ? splitAmount.toFixed(2)
                      : order[0].detail.paid > 0
                      ? order[0].detail.total - order[0].detail.paid
                      : order[0].detail.total.toFixed(2)}
                  </Text>
                </Flex>
                <Text px={2} pt={10} pb={1} {...subHeadingStyle}>
                  Choose Payment Method
                </Text>
                <Flex direction="row">
                  {paymentMethods.map((method) => {
                    let backgroundColor = useColorModeValue(
                      "white",
                      "greyColor.900"
                    );
                    let borderColor = useColorModeValue(
                      "themeColor.500",
                      "themeColor.500"
                    );

                    let textColor = useColorModeValue(
                      "greyColor.800",
                      "greyColor.300"
                    );
                    const isActive = method.id === selectedMethod;
                    if (isActive) {
                      backgroundColor = useColorModeValue(
                        "themeColor.50",
                        "themeColor.100"
                      );

                      textColor = useColorModeValue(
                        "greyColor.900",
                        "greyColor.700"
                      );
                    }
                    return (
                      <Pressable
                        key={method.id}
                        flex={1}
                        bg={backgroundColor}
                        shadow={2}
                        borderRadius="lg"
                        borderColor={isActive ? borderColor : "transparent"}
                        borderWidth={1.5}
                        mx={method.id === 2 ? { base: 2, md: 4 } : 0}
                        onPress={() => {
                          setSelectedMethod(method.id);
                        }}
                      >
                        <Flex align="center" py={{ base: 3, md: 6 }}>
                          <Image
                            size="xs"
                            resizeMode={"cover"}
                            borderRadius="md"
                            source={method.img}
                            alt="Alternate Text"
                          />

                          <Text
                            fontFamily="sf-pro-text-medium"
                            fontWeight="600"
                            fontSize="15px"
                            pt={2}
                            color={textColor}
                          >
                            {method.name}
                          </Text>
                        </Flex>
                      </Pressable>
                    );
                  })}
                </Flex>
                <Text px={2} pt={10} pb={1} {...subHeadingStyle}>
                  Quick Payment
                </Text>
                <Flex direction="row" wrap="wrap">
                  {quickPayments.map((payment) => {
                    let backgroundColor = useColorModeValue(
                      "white",
                      "greyColor.900"
                    );
                    let borderColor = useColorModeValue(
                      "themeColor.500",
                      "themeColor.500"
                    );

                    let textColor = useColorModeValue(
                      "greyColor.800",
                      "greyColor.300"
                    );
                    const isActive = payment.id === selectedAmount;
                    if (isActive) {
                      backgroundColor = useColorModeValue(
                        "themeColor.50",
                        "themeColor.100"
                      );

                      textColor = useColorModeValue(
                        "greyColor.900",
                        "greyColor.700"
                      );
                    }
                    return (
                      <Pressable
                        key={payment.id}
                        flexBasis="31%"
                        maxW="31%"
                        flex={1}
                        bg={backgroundColor}
                        shadow={2}
                        borderRadius="md"
                        borderColor={isActive ? borderColor : "transparent"}
                        borderWidth={1}
                        p={5}
                        mx="1%"
                        my={1}
                        onPress={() => {
                          setSelectedAmount(payment.id);
                        }}
                      >
                        <Text
                          textAlign="center"
                          fontFamily="sf-pro-text-medium"
                          fontWeight="600"
                          fontSize="15px"
                          color={textColor}
                        >
                          {payment.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                  <Pressable
                    flexBasis="31%"
                    maxW="31%"
                    flex={1}
                    bg={
                      selectedAmount === 6
                        ? useColorModeValue("themeColor.50", "themeColor.100")
                        : useColorModeValue("white", "greyColor.900")
                    }
                    shadow={2}
                    borderRadius="md"
                    borderColor={
                      selectedAmount === 6
                        ? useColorModeValue("themeColor.500", "themeColor.500")
                        : "transparent"
                    }
                    borderWidth={1}
                    p={5}
                    mx="1%"
                    my={1}
                    onPress={() => {
                      if (customAmount > 0) {
                        setSelectedAmount(6);
                      }
                      onOpenCustomAmount();
                    }}
                  >
                    <Text
                      textAlign="center"
                      fontFamily="sf-pro-text-medium"
                      fontWeight="600"
                      fontSize="15px"
                      color={useColorModeValue(
                        "greyColor.800",
                        "greyColor.300"
                      )}
                    >
                      {customAmount > 0 ? customAmount : "Custom"}
                    </Text>
                  </Pressable>
                </Flex>

                <Button
                  mt="auto"
                  mt={{ base: 5, md: 1 }}
                  mb={1}
                  p={4}
                  bg={useColorModeValue("themeColor.500", "themeColor.600")}
                  _pressed={{
                    bg: useColorModeValue("themeColor.700", "themeColor.700"),
                  }}
                  _text={{
                    color: "textColor.buttonText",
                    fontFamily: "sf-pro-text-medium",
                    fontSize: "15px",
                  }}
                  onPress={voidCreatedOrder}
                >
                  Pay
                </Button>
              </Flex>
            </Flex>
          </ScrollView>
        </VStack>

        {/* <-------------- Custom Quantity Modal when --> */}
        <NumberPadInput
          isOpen={openSplitAmount}
          onClose={() => setOpenSplitAmount(false)}
          headerTitle={`Split Amount`}
          getInput={onSplitAmount}
          isDecimal={true}
          maximumInputLength={12}
          maximumNumber={
            order[0].detail.paid > 0
              ? (order[0].detail.total = order[0].detail.paid)
              : order[0].detail.total
          }
        />
        <NumberPadInput
          isOpen={openCustomAmount}
          onClose={() => setOpenCustomAmount(false)}
          headerTitle={`Custom Amount`}
          getInput={onCustomAmount}
          isDecimal={true}
          maximumInputLength={12}
          maximumNumber={
            splitAmount > 0
              ? splitAmount
              : order[0].detail.paid > 0
              ? (order[0].detail.total = order[0].detail.paid)
              : order[0].detail.total
          }
        />
      </Stack>
    </>
  );
};
interface CartListItemProps {
  item: any;
}

const CartListItem = ({ item }: CartListItemProps) => {
  return (
    <Flex
      w="100%"
      py={1}
      direction="row"
      align="center"
      justify="space-between"
    >
      <Flex direction="row" align="center" flex={3}>
        <Image
          h="55px"
          w="55px"
          resizeMode={"cover"}
          borderRadius="md"
          mr="10px"
          bg={useColorModeValue("dark.500:alpha.20", "dark.300:alpha.20")}
          source={{
            uri: item.imageURL,
          }}
          fallbackSource={require("./../assets/fallback-img.jpg")}
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
            maxW={{ base: "150", md: "110" }}
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
                if (index + 1 === item.addons?.length) {
                  return `${addon.name}`;
                } else {
                  return `${addon.name}, `;
                }
              })}
          </Text>
        </VStack>
      </Flex>
      <View flex={2} pr={2}>
        <Text
          color={
            item.discountType && item.discountAmount !== 0
              ? useColorModeValue("green.400", "green.500")
              : item.orderStatus === 1
              ? useColorModeValue("red.400", "red.500")
              : useColorModeValue("dark.100", "light.100")
          }
          textAlign="right"
        >
          {item.discountType && item.discountType === 1
            ? `RM ${(
                (item.calculatedPrice - item.discountAmount) *
                item.quantity
              ).toFixed(2)}`
            : item.discountType && item.discountType === 2
            ? `RM  ${(
                ((item.calculatedPrice * (100 - item.discountAmount)) / 100) *
                item.quantity
              ).toFixed(2)}`
            : item.discountType && item.discountType === 3
            ? `RM ${(item.discountAmount * item.quantity).toFixed(2)}`
            : item.discountType && item.discountType === 4
            ? "Free"
            : `RM ${item.calculatedPrice * item.quantity.toFixed(2)}`}
        </Text>
      </View>
      <Flex justify="center" align="center">
        <Flex bg="themeColor.500" px={3} py={0.5} borderRadius="xl" ml={2}>
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="12px"
            color="greyColor.50"
          >
            x{item.quantity}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PaymentScreen;
