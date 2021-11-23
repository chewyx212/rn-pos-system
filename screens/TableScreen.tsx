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
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { changeCart, clearCart } from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import { useNavigation } from "@react-navigation/native";

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
type tableScreenProp = StackNavigationProp<RootStackParamList, "Table">;
const TableScreen = () => {
  const navigation = useNavigation<tableScreenProp>();
  const [itemList, setItemList] = useState(itemData);
  const [categoryList, setCategoryList] = useState(mappingItemCategory());
  const [selectedCategory, setSelectedCategory] = useState(
    mappingItemCategory()[0].id
  );
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
          Table
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
                  shadow={isActive ? 4 : 1}
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
                    aspectRatio={1}
                    onPress={() => {}}
                  >
                    {({ isHovered, isFocused, isPressed }) => {
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
                              bg="red.500"
                              w="9%"
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
                              <Text
                                fontFamily="sf-pro-text-regular"
                                fontSize="11px"
                              >
                                #OR123131
                              </Text>
                              <Flex
                                justify="space-between"
                                align="flex-end"
                                pr={5}
                              >
                                <Text
                                  fontFamily="sf-pro-display-bold"
                                  fontSize="22px"
                                >
                                  01
                                </Text>

                                <Flex
                                  direction="row"
                                  align="center"
                                  justify="center"
                                >
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
                                    2
                                  </Text>
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
                onPress={() => {}}
                ref={cancelRef}
              >
                Hold Order
              </Button>
              <Button colorScheme="success" onPress={() => {}}>
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
  );
};

export default TableScreen;
