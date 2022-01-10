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
} from "native-base";
import React, { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";
import NumberPadInput from "../components/NumberPadInput";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { ItemInCartType } from "../types/itemType";

type PaymentScreenProp = StackNavigationProp<RootStackParamList, "Payment">;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "Payment">;

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<number>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [itemList, setItemList] = useState<ItemInCartType[]>([]);
  const navigation = useNavigation<PaymentScreenProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { order } = route.params;

  useEffect(() => {
    if (order && order.length > 0) {
      console.log(order);
      console.log("asdasdasdasdasdasdas");
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
    fontSize: "17px",
    color: useColorModeValue("greyColor.700", "greyColor.500"),
  };

  return (
    <>
      <Stack
        safeAreaBottom
        position="relative"
        h="100%"
        direction="row"
        pl={5}
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <VStack h="100%" flex={6} mr="1%" pt={3}>
          <Flex direction="row" flex={1} my={1}>
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
                flexBasis="70%"
                py={4}
                px={5}
                w="100%"
                borderBottomWidth={2}
                borderBottomColor={useColorModeValue(
                  "greyColor.100",
                  "greyColor.800"
                )}
              >
                <FlatList
                  keyExtractor={(item, index) => `${item.name}${index}`}
                  data={itemList}
                  renderItem={({ item }) => <CartListItem item={item} />}
                />
              </Flex>
              <Flex py={4} px={5} flexBasis="20%">
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
                    RM 123.00
                  </Text>
                </Flex>
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
                    - RM 1.00
                  </Text>
                </Flex>
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
                    - RM 1.00
                  </Text>
                </Flex>
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
                    RM 123.00
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex flex={1} mx={2}>
              <Flex direction="row" px={2} pb={1} justify="space-between">
                <Text {...subHeadingStyle}>Payable Amount</Text>
                <Pressable>
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
                bg={useColorModeValue("white", "greyColor.900")}
                shadow={2}
                align="center"
                justify="center"
              >
                <Text
                  fontFamily="sf-pro-display-bold"
                  fontWeight="700"
                  fontSize="26px"
                >
                  RM 50.00
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
                      mx={method.id === 2 ? 5 : 0}
                      onPress={() => {
                        setSelectedMethod(method.id);
                      }}
                    >
                      <Flex align="center" py={6}>
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
                  bg={useColorModeValue("light.50", "dark.100")}
                  shadow={2}
                  borderRadius="md"
                  borderColor="transparent"
                  borderWidth={1}
                  p={5}
                  mx="1%"
                  my={1}
                >
                  <Text
                    textAlign="center"
                    fontFamily="sf-pro-text-medium"
                    fontWeight="600"
                    fontSize="15px"
                    color={useColorModeValue("light.700", "dark.400")}
                  >
                    Custom
                  </Text>
                </Pressable>
              </Flex>

              <Button
                mt="auto"
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
              >
                Pay
              </Button>
            </Flex>
          </Flex>
        </VStack>

        {/* <-------------- Custom Quantity Modal when --> */}
        {/* <NumberPadInput
          isOpen={showCustomQuantity}
          onClose={() => setShowCustomQuantity(false)}
          headerTitle={`Discount Amount`}
          getInput={onSelectAmount}
          isDecimal={selectedDiscountType === 1 || selectedDiscountType === 3}
          maximumInputLength={selectedDiscountType === 2 ? 4 : 8}
        /> */}
      </Stack>
    </>
  );
};
interface CartListItemProps {
  item: any;
  index: number;
}

const CartListItem = ({ item, index }: CartListItemProps) => {
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
                      ((item.calculatedPrice * (100 - item.discountAmount)) /
                        100) *
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
              <Flex
                bg="themeColor.500"
                px={3}
                py={0.5}
                borderRadius="xl"
                ml={2}
              >
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
      }}
    </Pressable>
  );
};

export default PaymentScreen;
