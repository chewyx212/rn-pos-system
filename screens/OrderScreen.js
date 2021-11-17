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

  return (
    <Box
      h="100%"
      px={5}
      py={3}
      bg={useColorModeValue("muted.100", "muted.800")}
    >
      <VStack
        h="100%"
        w="70%"
      >
        <Heading size="lg">Orders</Heading>
        <ScrollView
          mt="2"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          maxW="100%"
          overflow="scroll"
          maxH="9"
        >
          {categoryList.map((category) => {
            return (
              <Button borderRadius="2xl" mx={1} shadow={5}>
                {category.name}
              </Button>
            );
          })}
          <Box w="100%" h="100%" bg="green">
            
          </Box>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default OrderScreen;
