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
} from "native-base";
import React, { useRef, useState } from "react";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";

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

const OrderScreen = ({ navigation }) => {
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
  const [addonForm, setAddonForm] = useState({});
  const [openAddon, setOpenAddon] = useState(false);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.cartItem);
  const cancelRef = useRef(null);
  const onCloseConfirm = () => setIsConfirm(false);
  const selectionButtonGroup = [
    {
      name: "Add Customer",
      icon: AntDesign,
      iconName: "adduser",
      function:  () => {
        setOpenSelectionModal(false);
      },
    },
    {
      name: "Add Promotion",
      icon: Feather,
      iconName: "percent",
      function:  () => {
        setOpenSelectionModal(false);
      },
    },
    {
      name: "Hold Order",
      icon: AntDesign,
      iconName: "shoppingcart",
      function:  () => {
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

  const sendCartHandler = (item, quantity) => {
    dispatch(
      changeCart({
        item: {
          ...item,
        },
        quantity,
      })
    );
  };
  const onSubmitOrder = async () => {
    if (cartItem.length > 0) {
      const orderValue = await fetchOrder();
      console.log(orderValue);
      orderValue.push({
        id: orderValue.length + 1,
        items: cartItem,
      });
      await storeOrder(orderValue);
      dispatch(setOrder(orderValue));
      onClearCartHandler();
    }
  };

  const onRadioChange = (key, addonId) => {
    const addon = selectedAllAddon.find((item) => item.id == addonId);
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
  };

  const onCheckChange = (key, values) => {
    let addon = values.map((value) => {
      return selectedAllAddon.find((item) => item.id == value);
    });
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
    console.log(addonForm[key]);
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
    const payload = {
      ...selectedItem,
      addons: addonsPayload,
    };

    dispatch(
      changeCart({
        item: {
          ...payload,
        },
        quantity: selectedItemQuantity,
      })
    );
    onCloseModalHandler();
  };

  const mappingAddon = (addons) => {
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
    <Stack
      position="relative"
      h="100%"
      direction="row"
      pl={5}
      bg={useColorModeValue("light.100", "muted.800")}
    >
      <VStack h="100%" flex={6} mr="1%" pt={3}>
        <Heading size="lg" fontFamily="sf-pro-display-bold" fontSize={32}>
          Order
        </Heading>
        <Stack maxH="9%">
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
                    fontSize: 13,
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
                  shadow={isActive ? 4 : 0}
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
            px: "10px",
          }}
        >
          <Flex flex="1" direction="row" wrap="wrap" justify="flex-start">
            {itemList
              .filter((item) => item.item_category_id === selectedCategory)
              .map((item) => {
                let textColor = useColorModeValue("light.100", "light.100");
                let hoverTextColor = useColorModeValue("light.50", "light.50");
                let hoverBgColor = useColorModeValue(
                  "dark.400:alpha.40",
                  "dark.200:alpha.60"
                );
                let gradientColor = useColorModeValue(
                  "dark.500:alpha.20",
                  "dark.300:alpha.20"
                );
                return (
                  <Pressable
                    key={item.id}
                    flexBasis="22%"
                    h="100%"
                    borderRadius="lg"
                    m="1.5%"
                    // @ts-ignore: Unreachable code error
                    aspectRatio="1"
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
                            alt={item.name}
                          />
                          <Box
                            bg={
                              isPressed || isHovered
                                ? hoverBgColor
                                : gradientColor
                            }
                            h="100%"
                            w="100%"
                            borderRadius="lg"
                            position="absolute"
                          >
                            <Text
                              position="absolute"
                              color={
                                isPressed || isHovered
                                  ? hoverTextColor
                                  : textColor
                              }
                            >
                              {item.name}
                            </Text>
                          </Box>
                        </>
                      );
                    }}
                  </Pressable>
                );
              })}
          </Flex>
        </ScrollView>
      </VStack>
      <VStack
        h="100%"
        flex={3}
        pt={3}
        pb={10}
        px={3}
        bg={useColorModeValue("light.100", "muted.800")}
        borderLeftWidth="2"
        borderLeftColor={useColorModeValue("light.200", "dark.200")}
      >
        <View w="100%" flex={14}>
          <Heading size="md" py={2} fontFamily="sf-pro-text-bold" fontSize={17}>
            Current Order
          </Heading>
          <FlatList
            keyExtractor={(item, index) => item.name + index}
            data={cartItem}
            renderItem={({ item }) => {
              return (
                <Pressable>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Flex
                        w="100%"
                        py={1}
                        bg={
                          isPressed || isHovered
                            ? "dark.100:alpha.30"
                            : "transparent"
                        }
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
                            bg={useColorModeValue(
                              "dark.500:alpha.20",
                              "dark.300:alpha.20"
                            )}
                            source={{
                              uri: item.image?.url,
                            }}
                            alt="Alternate Text"
                          />
                          <VStack>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.addons.length > 0 && "haha"}</Text>
                          </VStack>
                        </HStack>
                        <View flex={2}>
                          <Text textAlign="right">
                            RM {item.price} x {item.quantity}
                          </Text>
                        </View>
                      </Flex>
                    );
                  }}
                </Pressable>
              );
            }}
          />
        </View>
        <HStack flex={1} space={2} pt={3}>
          {/* <SecondaryButton
            style={{
              flex: 1,
            }}
            icon={<Icon as={Entypo} name="dots-three-horizontal" size="xs" />}
          ></SecondaryButton> */}
          <Button
            flex={1}
            variant="outline"
            colorScheme="warmGray"
            leftIcon={
              <Icon as={Entypo} name="dots-three-horizontal" size="xs" />
            }
            onPress={() => setOpenSelectionModal(true)}
          ></Button>
          <PrimaryButton
            flex={9}
            disabled={cartItem.length < 1}
            onPress={() => {
              if (cartItem.length > 0) setIsConfirm(true);
            }}
          >
            Checkout
          </PrimaryButton>
        </HStack>
        <SlideFromRight isOpen={openAddon} my={5} mx={3}>
          <VStack h="100%" bg={useColorModeValue("light.100", "muted.800")}>
            <Pressable
              bg="transparent"
              onPress={onCloseModalHandler}
            >
              <Text color="primary.500">Cancel</Text>
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
            <View pt={3} h="70%">
              {selectedItem?.addons?.length > 0 && (
                <FlatList
                  data={selectedItemAddon}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => {
                    return (
                      <>
                        <Text
                          Text
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
            </View>
            <HStack justify="center" align="center" mt={2}>
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
          </VStack>
        </SlideFromRight>
      </VStack>

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
                    align: "center",
                    justify: "flex-start",
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
  );
};

export default OrderScreen;
