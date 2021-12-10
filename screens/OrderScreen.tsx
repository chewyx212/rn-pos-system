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
  Checkbox,
  Radio,
  AlertDialog,
  Modal,
  IconButton,
  useToast,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

const mappingItemCategory = () => {
  let category = [];
  let idList: number[] = [];
  itemData.forEach((item) => {
    if (!idList.includes(item.item_category.id)) {
      idList.push(item.item_category.id);
      category.push(item.item_category);
    }
  });
  return category;
};

type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Order"
>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;
const OrderScreen = () => {
  const [itemList, setItemList] = useState(itemData);
  const [categoryList, setCategoryList] = useState(mappingItemCategory());
  const [selectedCategory, setSelectedCategory] = useState(
    mappingItemCategory()[0].id
  );
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(1);
  const [selectedItemAddon, setSelectedItemAddon] = useState({});
  const [selectedAllAddon, setSelectedAllAddon] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [openSelectionModal, setOpenSelectionModal] = useState(false);
  const [isEditCartMode, setIsEditCartMode] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [addonForm, setAddonForm] = useState({});
  const [openAddon, setOpenAddon] = useState(false);
  const [orderDetail, setOrderDetail] = useState({
    subtotal: 0.0,
    total: 0.0,
    discount: 0.0,
    tax: 0.0,
  });
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.cartItem);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const route = useRoute<OrderScreenRouteProp>();
  const { orderType, tableId, pax, refresher, orders } = route.params;
  const selectionButtonGroup = [
    {
      name: "Add Customer",
      icon: AntDesign,
      iconName: "adduser",
      function: () => {
        setOpenSelectionModal(false);
      },
    },
    {
      name: "Add Promotion",
      icon: Feather,
      iconName: "percent",
      function: () => {
        setOpenSelectionModal(false);
      },
    },
    {
      name: "Hold Order",
      icon: AntDesign,
      iconName: "shoppingcart",
      function: () => {
        setOpenSelectionModal(false);
      },
    },
    {
      name: "Clear Cart",
      icon: Entypo,
      iconName: "trash",
      function: () => {
        onClearCartHandler();
        setOpenSelectionModal(false);
      },
    },
  ];

  useEffect(() => {
    calculateOrderPrice(cartItem);
  }, [cartItem]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setIsEditCartMode(true);
    }
  }, []);

  const calculateOrderPrice = (items) => {
    let detail = {
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };

    items.forEach((item) => {
      detail.subtotal += parseFloat(item.calculatedPrice) * item.quantity;
    });
    detail.subtotal = parseFloat(detail.subtotal.toFixed(2));

    detail.total = parseFloat(detail.subtotal.toFixed(2));

    setOrderDetail(detail);
  };

  const onCloseConfirm = () => setIsConfirm(false);

  const sendCartHandler = (item, quantity) => {
    dispatch(
      changeCart({
        item: {
          ...item,
          calculatedPrice: parseFloat(item.price),
        },
        quantity,
      })
    );
    toast.show({
      description: `${item.name} added into cart.`,
      background: "emerald.500",
      placement: "top",
    });
  };

  const onSubmitOrder = async () => {
    if (cartItem.length > 0) {
      const orderValue = await fetchOrder();
      orderValue.push({
        id: orderValue.length + 1,
        orderType,
        tableId,
        pax,
        items: cartItem,
      });
      await storeOrder(orderValue);
      dispatch(setOrder(orderValue));
      setOpenCart(false);
      onCloseConfirm();
      onClearCartHandler();
      refresher();
      navigation.navigate("Table");
    }
  };

  const onRadioChange = (key: string, addonId: number) => {
    const addon = selectedAllAddon.find((item) => item.id == addonId);
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
  };

  const onCheckChange = (key: string, values: any[]) => {
    let addon = values.map((value) => {
      return selectedAllAddon.find((item) => item.id == value);
    });
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
  };

  const onAddAddon = () => {
    let addonsPayload = [];
    Object.values(addonForm).forEach((item) => {
      if (item.length > 0) {
        addonsPayload = [...addonsPayload, ...item];
      } else {
        addonsPayload.push(item);
      }
    });
    let payload = {
      ...selectedItem,
      calculatedPrice: parseFloat(selectedItem.price),
      addons: addonsPayload,
    };
    if (payload.addons.length > 0) {
      payload.addons.forEach((addon) => {
        (payload.calculatedPrice += parseFloat(addon.price)).toFixed(2);
      });
    }

    dispatch(
      changeCart({
        item: {
          ...payload,
        },
        quantity: selectedItemQuantity,
      })
    );

    toast.show({
      background: "emerald.500",
      description: `${payload.name} added into cart.`,
      placement: "top",
    });
    onCloseModalHandler();
  };

  const mappingAddon = (addons: any[]) => {
    let temp = [];
    let addonCategory = [];
    let allAddon = [];
    addons.forEach((addon) => {
      allAddon.push(addon);
      if (!temp.includes(addon.addon_category_id)) {
        temp.push(addon.addon_category_id);
        addonCategory.push({ ...addon.addon_category, data: [addon] });
        if (parseInt(addon.addon_category.type) === 2) {
          setAddonForm((prevState) => ({
            ...prevState,
            [addon.addon_category.name]: addon,
          }));
        }
      } else {
        addonCategory
          .find((category) => category.id === addon.addon_category_id)
          .data.push(addon);
      }
    });
    setSelectedAllAddon(allAddon);
    setSelectedItemAddon(addonCategory);
  };

  const onOpenAddonHandler = (item) => {
    setSelectedItem(item);
    setSelectedItemQuantity(1);
    setAddonForm({});
    setOpenAddon(true);
    mappingAddon(item.addons);
  };

  const onCloseModalHandler = () => {
    setSelectedAllAddon([]);
    setSelectedItemAddon({});
    setSelectedItemQuantity(1);
    setSelectedItem({});
    setAddonForm({});
    setOpenAddon(false);
  };

  const onClearCartHandler = () => {
    dispatch(clearCart());
  };

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
                Order
              </Heading>
            </Flex>
            <IconButton
              display={{ md: "none" }}
              icon={<Icon as={AntDesign} name="shoppingcart" size="sm" />}
              mr={5}
              onPress={() => setOpenCart(true)}
            />
          </Flex>
          <Stack maxH={{ md: "9%" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              overflow="scroll"
              _contentContainerStyle={{
                m: "1%",
                py: "10px",
              }}
            >
              {categoryList.map((category) => {
                let isActive = category.id === selectedCategory;
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
                      fontSize: { base: 15, md: 13 },
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
              {itemList
                .filter((item) => item.item_category_id === selectedCategory)
                .map((item) => {
                  let textColor = useColorModeValue("light.100", "light.100");
                  let hoverTextColor = useColorModeValue(
                    "light.50",
                    "light.50"
                  );
                  let hoverBgColor = useColorModeValue(
                    "dark.400:alpha.40",
                    "dark.200:alpha.60"
                  );
                  let gradientColor = useColorModeValue(
                    "dark.400:alpha.50",
                    "dark.300:alpha.40"
                  );
                  return (
                    <Pressable
                      key={item.id}
                      flexBasis={{ base: "47%", lg: "22%" }}
                      h={{ base: "150px", md: "165px" }}
                      borderRadius="lg"
                      mx={{ base: "1%", lg: "1.5%" }}
                      my={{ base: "2%", lg: "1.5%" }}
                      onPress={() =>
                        item.addons?.length === 0
                          ? sendCartHandler(item, 1)
                          : onOpenAddonHandler(item)
                      }
                    >
                      {({ isHovered, isFocused, isPressed }) => {
                        return (
                          <>
                            <Image
                              h="100%"
                              w="100%"
                              borderRadius="lg"
                              source={{
                                uri: item.image?.url,
                              }}
                              fallbackSource={require("./../assets/fallback-img.jpg")}
                              alt={item.name}
                            />
                            <Flex
                              bg={
                                isPressed || isHovered
                                  ? hoverBgColor
                                  : gradientColor
                              }
                              h="100%"
                              w="100%"
                              pl={2}
                              pb={2}
                              borderRadius="lg"
                              position="absolute"
                              justify="space-between"
                              align="flex-start"
                            >
                              <Text
                                color={
                                  isPressed || isHovered
                                    ? hoverTextColor
                                    : textColor
                                }
                                fontFamily="sf-pro-text-medium"
                                fontWeight="400"
                                fontSize={{ base: 17, md: 18 }}
                              >
                                RM {item.price}
                              </Text>
                              <Flex>
                                <Text
                                  color={
                                    isPressed || isHovered
                                      ? hoverTextColor
                                      : textColor
                                  }
                                  fontFamily="sf-pro-display-bold"
                                  fontWeight="600"
                                  fontSize={{ base: 17, md: 22 }}
                                >
                                  {item.id}
                                </Text>
                                <Text
                                  color={
                                    isPressed || isHovered
                                      ? hoverTextColor
                                      : textColor
                                  }
                                  fontFamily="sf-pro-text-semibold"
                                  fontWeight="600"
                                  fontSize={{ base: 17, md: 20 }}
                                >
                                  {item.name}
                                </Text>
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
        <Box
          h="100%"
          display={{ base: "none", sm: "none", md: "flex" }}
          flex={{ md: 4, lg: 2.5 }}
          pt={{ base: 0, sm: 0, md: 3 }}
          px={{ base: 0, sm: 0, md: 3 }}
          bg={useColorModeValue("light.100", "muted.800")}
          borderLeftWidth="2"
          borderLeftColor={useColorModeValue("light.200", "dark.200")}
        >
          <View w="100%" flex={{ base: 20, lg: 14 }}>
            <Flex direction="row" justify="space-between" align="center" py="2">
              <Heading size="md" fontFamily="sf-pro-text-bold" fontSize={17}>
                Current Order
              </Heading>
              <Text fontFamily="sf-pro-text-regular" fontSize={13}>
                {orderType === 1 && `Table Number: ${tableId}`}
                {orderType === 2 && "Take  Away"}
                {orderType === 3 && "Delivery"}
                {orderType === 4 && "Counter"}
              </Text>
            </Flex>
            <FlatList
              keyExtractor={(item, index) => item.name + index}
              data={cartItem}
              renderItem={({ item }) => <CartListItem item={item} />}
            />
          </View>
          <OrderDetailComponent
            setOpenSelectionModal={setOpenSelectionModal}
            setIsConfirm={setIsConfirm}
            cartItem={cartItem}
            order={orderDetail}
          />
        </Box>

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
                  onPress={onSubmitOrder}
                  ref={cancelRef}
                >
                  Hold Order
                </Button>
                <Button colorScheme="success" onPress={onSubmitOrder}>
                  Send to Kitchen
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>

        {/* <---------- Cart Function Selection Modal -----------------> */}
        <Modal
          isOpen={openSelectionModal}
          onClose={() => setOpenSelectionModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>More Actions</Modal.Header>
            <Modal.Body>
              <ScrollView>
                {selectionButtonGroup.map((button) => (
                  <Button
                    key={button.name}
                    my={2}
                    flex={1}
                    variant="ghost"
                    colorScheme="warmGray"
                    _text={{
                      ml: 1,
                      fontFamily: "sf-pro-text-medium",
                      fontSize: "15px",
                    }}
                    _stack={{
                      w: "100%",
                    }}
                    leftIcon={
                      <Icon as={button.icon} name={button.iconName} size="sm" />
                    }
                    onPress={button.function}
                  >
                    {button.name}
                  </Button>
                ))}
              </ScrollView>
            </Modal.Body>
          </Modal.Content>
        </Modal>
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
            setOpenSelectionModal={setOpenSelectionModal}
            setIsConfirm={setIsConfirm}
            cartItem={cartItem}
            order={orderDetail}
          />
        </VStack>
      </SlideFromRight>
      <SlideFromRight
        isOpen={openAddon}
        h="100%"
        w={{ base: "100%", lg: "30%" }}
        right="0 "
      >
        <VStack
          h="100%"
          bg={useColorModeValue("light.100", "muted.800")}
          py={5}
          px={2}
        >
          <Pressable bg="transparent" onPress={onCloseModalHandler}>
            <Flex direction="row" align="center">
              <Icon
                color="primary.500"
                as={Entypo}
                name="chevron-left"
                size="xs"
              />
              <Text color="primary.500">Cancel</Text>
            </Flex>
          </Pressable>

          <HStack pt={4}>
            <Image
              size="md"
              resizeMode={"cover"}
              borderRadius="md"
              mr="10px"
              bg={useColorModeValue("dark.500:alpha.20", "dark.300:alpha.20")}
              source={{
                uri: selectedItem.image?.url,
              }}
              fallbackSource={require("./../assets/fallback-img.jpg")}
              alt="Alternate Text"
            />
            <VStack>
              <Text fontSize="md">{selectedItem?.id}</Text>
              <Text fontSize="md">{selectedItem?.name}</Text>
              <Text pt={1} color="primary.500" fontSize="lg" bold>
                RM {selectedItem?.price}
              </Text>
            </VStack>
          </HStack>
          <View pt={3} flex={1}>
            {selectedItem?.addons?.length > 0 && (
              <FlatList
                data={selectedItemAddon}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                  return (
                    <>
                      <Text
                        py="3"
                        fontFamily="sf-pro-text-semibold"
                        fontSize="15"
                      >
                        {item.name}
                      </Text>
                      {parseInt(item.type) === 1 && (
                        <>
                          <Checkbox.Group
                            onChange={(nextValue) =>
                              onCheckChange(item.name, nextValue)
                            }
                            accessibilityLabel="choose addon"
                          >
                            {item.data.map((addon) => {
                              return (
                                <Checkbox
                                  key={addon.id}
                                  value={addon.id}
                                  my={2}
                                  size="md"
                                >
                                  <Text
                                    px={2}
                                    fontFamily="sf-pro-text-regular"
                                    fontSize="13"
                                  >
                                    {addon.name} RM{addon.price}
                                  </Text>
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
                        </>
                      )}
                      {parseInt(item.type) === 2 && (
                        <Radio.Group
                          name={item.name}
                          accessibilityLabel={item.name}
                          value={addonForm[item.name].id}
                          onChange={(nextValue) =>
                            onRadioChange(item.name, nextValue)
                          }
                        >
                          {item.data.map((addon) => {
                            return (
                              <Radio
                                key={addon.id}
                                value={addon.id}
                                my={1.5}
                                size="lg"
                              >
                                <Text
                                  px={2}
                                  fontFamily="sf-pro-text-regular"
                                  fontSize="13"
                                >
                                  {addon.name} RM{addon.price}
                                </Text>
                              </Radio>
                            );
                          })}
                        </Radio.Group>
                      )}
                    </>
                  );
                }}
              />
            )}
            <HStack py={2}>
              <Button
                flex={1}
                colorScheme="red"
                leftIcon={
                  selectedItemQuantity === 0 ? (
                    <Icon as={Entypo} name="trash" size="xs" />
                  ) : (
                    <Icon as={Entypo} name="minus" size="xs" />
                  )
                }
                onPress={() => {
                  if (selectedItemQuantity === 0) {
                    onCloseModalHandler();
                  } else {
                    setSelectedItemQuantity((prevState) => {
                      if (prevState > 0) {
                        return prevState - 1;
                      }
                      return prevState;
                    });
                  }
                }}
              ></Button>
              <Text flex={1} alignSelf="center" textAlign="center">
                {selectedItemQuantity}
              </Text>
              <Button
                flex={1}
                colorScheme="green"
                py={3}
                leftIcon={<Icon as={Entypo} name="plus" size="xs" />}
                onPress={() =>
                  setSelectedItemQuantity((prevState) => prevState + 1)
                }
              ></Button>
            </HStack>
            <PrimaryButton
              mt="auto"
              mb={1}
              align="flex-end"
              p={3}
              onPress={onAddAddon}
              disabled={selectedItemQuantity === 0}
            >
              Add
            </PrimaryButton>
          </View>
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
                fallbackSource={require("./../assets/fallback-img.jpg")}
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

const OrderDetailComponent = ({
  cartItem,
  order,
  setOpenSelectionModal,
  setIsConfirm,
}) => {
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
        <Button
          flex={1}
          variant="outline"
          colorScheme="warmGray"
          leftIcon={<Icon as={Entypo} name="dots-three-horizontal" size="xs" />}
          onPress={() => setOpenSelectionModal(true)}
        ></Button>
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

export default OrderScreen;
