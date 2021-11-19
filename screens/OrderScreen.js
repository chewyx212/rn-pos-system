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
  IconButton,
  Radio,
} from "native-base";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCart, clearCart } from "../app/cart/cartSlice";

const mappingItemCategory = () => {
  let category = [];
  let idList = [];
  itemData.forEach((item) => {
    if (!idList.includes(item.item_category.id)) {
      idList.push(item.item_category.id);
      category.push(item.item_category);
    }
  });
  return category;
};

const mappingAddon = (addons) => {
  let temp = [];
  let addonCategory = [];
  addons.forEach((addon) => {
    if (!temp.includes(addon.addon_category_id)) {
      temp.push(addon.addon_category_id);
      addonCategory.push({ ...addon.addon_category, data: [addon] });
      console.log(addon.addon_category_id);
    } else {
      addonCategory
        .find((category) => category.id === addon.addon_category_id)
        .data.push(addon);
    }
  });
  // return addonCategory.map((category) => {
  //   return (
  //     <>
  //       <Text fontFamily="sf-pro-text-semibold" fontSize={17}>{category.name}</Text>
  //       {category.addons.map((addon) => {
  //         return <Text>{addon.name}</Text>;
  //       })}
  //     </>
  //   );
  // });
  return (
    <FlatList
      data={addonCategory}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        return (
          <>
            <Text Text py="3" fontFamily="sf-pro-text-semibold" fontSize="15">
              {item.name}
            </Text>
            {parseInt(item.type) === 1 && (<></>)}
            {parseInt(item.type) === 2 && (
              <Radio.Group name={item.name} accessibilityLabel={item.name}>
                {item.data.map((addon) => {
                  return (
                    <Radio key={addon.id} value={addon.name} my={1.5} size="lg">
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
  );
};

const OrderScreen = ({ navigation }) => {
  const [itemList, setItemList] = useState(itemData);
  const [categoryList, setCategoryList] = useState(mappingItemCategory());
  const [selectedCategory, setSelectedCategory] = useState(
    mappingItemCategory()[0].id
  );
  const [selectedItem, setSelectedItem] = useState();
  const [openAddon, setOpenAddon] = useState(false);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.cartItem);
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

  const onClearCartHandler = () => {
    dispatch(clearCart());
  };

  const onOpenAddonHandler = (item) => {
    setSelectedItem(item);
    setOpenAddon(true);
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
              let bgColor = useColorModeValue("muted.100", "transparent");
              let textColor = useColorModeValue("muted.700", "muted.400");
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
                    _text: { color: textColor },
                  }}
                  _hover={{
                    bg: bgColor,
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
                    flexBasis="23%"
                    h="100%"
                    borderRadius="lg"
                    m="1%"
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
            keyExtractor={(item, index) => index}
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
                        <HStack flex={3} align="center">
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
                            <Text>Coke, Fries, Burger</Text>
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
            colorScheme="warmGray"
            leftIcon={
              <Icon as={Entypo} name="dots-three-horizontal" size="xs" />
            }
            onPress={onClearCartHandler}
          ></Button>
          <PrimaryButton
            style={{ flex: 9 }}
            onPress={() => {
              console.log("hi");
            }}
          >
            Checkout
          </PrimaryButton>
        </HStack>
        <SlideFromRight isOpen={openAddon} my={5} mx={3}>
          <VStack h="100%" bg={useColorModeValue("light.100", "muted.800")}>
            <Pressable
              bg="transparent"
              leftIcon={
                <Icon
                  as={Entypo}
                  size="md"
                  name="chevron-left"
                  color={useColorModeValue("light.600", "muted.200")}
                />
              }
              onPress={() => {
                setSelectedItem();
                setOpenAddon(false);
              }}
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
                  uri: "https://images.unsplash.com/photo-1502899576159-f224dc2349fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
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
            <View pt={3}>
              {selectedItem?.addons.length > 0 &&
                mappingAddon(selectedItem.addons)}
            </View>
          </VStack>
        </SlideFromRight>
      </VStack>
    </Stack>
  );
};

export default OrderScreen;
