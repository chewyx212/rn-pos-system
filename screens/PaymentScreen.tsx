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
} from "native-base";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";
import NumberPadInput from "../components/NumberPadInput";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";

type PaymentScreenProp = StackNavigationProp<RootStackParamList, "Payment">;
const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<number>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const navigation = useNavigation<PaymentScreenProp>();

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
            <Flex direction="row">
              <IconButton
                _icon={{
                  color: "primary.500",
                  size: "md",
                }}
                colorScheme="primary"
                icon={<Icon as={Ionicons} name="arrow-back" size="sm" />}
                mr={5}
                onPress={() => navigation.goBack()}
              />
              <Heading
                size="lg"
                fontFamily="sf-pro-display-bold"
                fontWeight="600"
                fontSize={{ base: 24, md: 32 }}
              >
                Payment
              </Heading>
            </Flex>
            <IconButton
              display={{ md: "none" }}
              icon={<Icon as={AntDesign} name="shoppingcart" size="sm" />}
              mr={5}
            />
          </Flex>
          <Flex direction="row" flex={1} my={1}>
            <Flex flex={1} mx={2} bg="light.50" shadow={5} borderRadius="xl">
              <Flex
                flexBasis="10%"
                py={4}
                px={5}
                w="100%"
                borderBottomWidth={2}
                borderBottomColor="light.200"
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
                borderBottomColor="light.200"
              >
                {/* <FlatList
                keyExtractor={(item, index) => `${item.name}${index}`}
                data={order.items}
                renderItem={({ item }) => <CartListItem item={item} />}
              /> */}
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
              <Flex direction="row" px={2} justify="space-between">
                <Text
                  fontFamily="sf-pro-text-bold"
                  fontWeight="700"
                  fontSize="17px"
                  color={useColorModeValue("light.500", "dark.400")}
                >
                  Payable Amount
                </Text>
                <Button variant="ghost">Split Amount</Button>
              </Flex>
              <Flex
                flexBasis="17%"
                borderRadius="lg"
                w="100%"
                bg="light.50"
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
              <Text
                px={2}
                pt={10}
                py={3}
                fontFamily="sf-pro-text-bold"
                fontWeight="700"
                fontSize="17px"
                color={useColorModeValue("light.500", "dark.400")}
              >
                Choose Payment Method
              </Text>
              <Flex direction="row">
                {paymentMethods.map((method) => {
                  let backgroundColor = useColorModeValue(
                    "light.50",
                    "dark.100"
                  );
                  let borderColor = useColorModeValue(
                    "primary.400",
                    "primary.400"
                  );
                  const isActive = method.id === selectedMethod;
                  if (isActive) {
                    backgroundColor = useColorModeValue(
                      "primary.50",
                      "primary.50"
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
                      borderWidth={1}
                      mx={method.id === 2 ? 5 : 0}
                      onPress={() => {
                        setSelectedMethod(method.id);
                      }}
                    >
                      <Flex align="center" py={7}>
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
                          color={useColorModeValue("light.700", "dark.400")}
                        >
                          {method.name}
                        </Text>
                      </Flex>
                    </Pressable>
                  );
                })}
              </Flex>
              <Text
                px={2}
                pt={10}
                py={3}
                fontFamily="sf-pro-text-bold"
                fontWeight="700"
                fontSize="17px"
                color={useColorModeValue("light.500", "dark.400")}
              >
                Quick Payment
              </Text>
              <Flex direction="row" wrap="wrap">
                {quickPayments.map((payment) => {
                  let backgroundColor = useColorModeValue(
                    "light.50",
                    "dark.100"
                  );
                  let borderColor = useColorModeValue(
                    "primary.400",
                    "primary.400"
                  );
                  const isActive = payment.id === selectedAmount;
                  if (isActive) {
                    backgroundColor = useColorModeValue(
                      "primary.50",
                      "primary.50"
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
                        color={useColorModeValue("light.700", "dark.400")}
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

              <Button mt="auto" mb={1} align="flex-end" p={4}>
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

export default PaymentScreen;
