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
} from "native-base";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SecondaryButton from "../components/Ui/SecondaryButton";

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

const OrderScreen = ({ navigation }) => {
  const [itemList, setItemList] = useState(itemData);
  const [categoryList, setCategoryList] = useState(mappingItemCategory());
  const [selectedCategory, setSelectedCategory] = useState(
    mappingItemCategory()[0].id
  );
  const cartArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  return (
    <Stack
      h="100%"
      direction="row"
      pl={5}
      bg={useColorModeValue("light.100", "muted.800")}
    >
      <VStack h="100%" flex={5} mr="1%" pt={3}>
        <Heading size="lg">Order</Heading>
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
                  _text={{ color: textColor }}
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
        flex={2}
        pt={3}
        pb={10}
        px={3}
        bg="light.100"
        borderLeftWidth="2"
        borderLeftColor={useColorModeValue("light.100", "dark.200")}
      >
        <View w="100%" flex={14}>
          <Heading size="md" py={2}>
            {" "}
            Current Order
          </Heading>
          <FlatList
            data={cartArray}
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
                        <HStack flex={5} align="center">
                          <Image
                            size="sm"
                            resizeMode={"contain"}
                            borderRadius="md"
                            mr="10px"
                            source={{
                              uri: "https://wallpaperaccess.com/full/317501.jpg",
                            }}
                            alt="Alternate Text"
                          />
                          <VStack>
                            <Text>{item.id}</Text>
                            <Text>Happy Meal</Text>
                            <Text>Coke, Fries, Burger</Text>
                          </VStack>
                        </HStack>
                        <View flex={1}>
                          <Text>RM12</Text>
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
            leftIcon={<Icon as={Entypo} name="dots-three-horizontal" size="xs" />}
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
      </VStack>
    </Stack>
  );
};

export default OrderScreen;
