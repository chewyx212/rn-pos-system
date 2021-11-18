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
  Flex,
  Image,
  Pressable,
  View,
} from "native-base";
import React, { useState } from "react";
import { itemData } from "../assets/DUMMY";

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
  return (
    <Stack
      h="100%"
      direction="row"
      pl={5}
      bg={useColorModeValue("muted.100", "muted.800")}
    >
      <VStack h="100%" flex={5} mr="1%" pt={3}>
        <Heading size="lg">Orders</Heading>
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
        px={3}
        borderLeftWidth="2"
        borderLeftColor={useColorModeValue("light.200", "dark.200")}
      >
        <Flex direction="row" justify="space-between" alignItems="center">
          <Heading size="md"> Current Order</Heading>
          <Button
            variant="unstyled"
            _text={{ color: useColorModeValue("primary.500", "primary.600") }}
            _pressed={{
              _text: { color: useColorModeValue("primary.900", "primary.800") },
            }}
          >
            Clear All
          </Button>
        </Flex>

        <View w="100%">
          <ScrollView
            _contentContainerStyle={{
              mt: "5",
              w: "65%",
              h: "40%",
            }}
          >
            <HStack w="100%">
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
              <Flex
                direction="row"
                w="100%"
                align="center"
                justify="space-between"
              >
                <VStack>
                  <Text>A12</Text>
                  <Text>Happy Meal</Text>
                </VStack>
                <Text>RM12</Text>
              </Flex>
            </HStack>
            
          </ScrollView>
        </View>
        <Text>Bill</Text>
      </VStack>
    </Stack>
  );
};

export default OrderScreen;
