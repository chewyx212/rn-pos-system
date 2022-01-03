import {
  Flex,
  Heading,
  Text,
  Input,
  Icon,
  Button,
  useColorModeValue,
  Modal,
  useToast,
  KeyboardAvoidingView,
  FlatList,
  HStack,
  Spinner,
  Stack,
  VStack,
  Pressable,
  ScrollView
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "./RootStackParams";
import { ListRenderItemInfo, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import { ItemApi } from "../api/ItemApi";
import { AddonType, ItemCategoryType, ItemFromApi } from "../types/itemType";
import { AnyMap } from "immer/dist/internal";

type MenuScreenProp = DrawerNavigationProp<RootStackParamList, "Menu">;
type MenuScreenRouteProp = RouteProp<RootStackParamList, "Menu">;
const MenuScreen = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [menuList, setMenuList] = useState<ItemFromApi[]>([]);
  const [selectedMenuList, setSelectedMenuList] = useState<ItemFromApi[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<MenuScreenProp>();

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    setIsRefreshing(true);
    if (restaurantInfo) {
      const restaurantId: number = restaurantInfo.id;
      const result = await ItemApi.getItem(restaurantId);
      if (result.status === 200 && result.data.status === 0) {
        if (
          result.data.response.item_lists &&
          result.data.response.item_lists.length > 0
        ) {
          mappingAllItem(result.data.response.item_lists);
        }
      }
    }
    setIsRefreshing(false);
  };

  const mappingAllItem = (response: any[]) => {
    let category: ItemCategoryType[] = [];
    let itemList: ItemFromApi[] = [];
    let idList: number[] = [];
    response.forEach((item) => {
      if (item.addons && item.addons > 0) {
        let addons: AddonType[] = [];
        item.addons.forEach((addon: any) => {
          addons.push({
            ...addon,
            price: parseFloat(addon.price),
          });
        });
      } else {
        itemList.push({
          ...item,
          price: parseFloat(item.price),
        });
      }
      if (!idList.includes(item.item_category_id)) {
        console.log(item.item_category_id);
        idList.push(item.item_category_id);
        category.push({
          id: item.item_category_id,
          name: item.item_category_name,
          is_enabled: true,
        });
      }
    });
    setMenuList(itemList);
    setSelectedMenuList(
      itemList.filter((item) => item.item_category_id === idList[0])
    );
    setSelectedCategoryId(idList[0]);
    setCategoryList(category);
  };

  const onSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedMenuList(
      menuList.filter((item) => item.item_category_id === categoryId)
    );
  };

  return (
    <>
      <Stack
        safeArea
        position="relative"
        h="100%"
        direction="row"
        bg={useColorModeValue("light.100", "muted.800")}
      >
        <VStack h="100%" flex={6} mr="1%" pt={3}>
          <Flex direction="row" w="100%" h="100%">
            <Flex
              w="20%"
              bg="transparent"
              borderRightWidth={1}
              borderRightColor="light.200"
            >
              <ScrollView>
                {categoryList.map((category: ItemCategoryType) => {
                  let isActive = category.id === selectedCategoryId;
                  return (
                    <Pressable
                      p={4}
                      px={10}
                      key={category.id}
                      bg={isActive ? "light.300" : "transparent"}
                      onPress={() => onSelectCategory(category.id)}
                    >
                      <Text
                        fontFamily="sf-pro-text-medium"
                        fontWeight="600"
                        fontSize={15}
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </Flex>
            <Flex w="80%">
              <Flex direction="row" px={5} justify="space-between">
                <Heading
                  size="lg"
                  fontFamily="sf-pro-display-bold"
                  fontWeight="600"
                  fontSize={{ base: 22, md: 32 }}
                  flex={1}
                >
                  Menu
                </Heading>
                <Flex direction="row" flex={1}>
                  {/* <Button onPress={() => setOpenAddModal(true)} mr={3}>
                    Add item
                  </Button> */}
                  <Input
                    placeholder="Search Item"
                    bg="transparent"
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="1"
                    fontSize="14"
                    _web={{
                      _focus: { borderColor: "muted.300" },
                    }}
                    InputLeftElement={
                      <Icon
                        m="2"
                        ml="3"
                        size="6"
                        color="gray.400"
                        as={<MaterialIcons name="search" />}
                      />
                    }
                  />
                </Flex>
              </Flex>
              <Flex
                direction="row"
                bg={useColorModeValue("light.200", "dark.50")}
                textAlign="center"
                mt={5}
                py={3}
                px={2}
              >
                <Text flex={0.5} textAlign="center">
                  No.
                </Text>
                <Text flex={0.5} textAlign="center">
                  Id
                </Text>
                <Text flex={1} textAlign="center">
                  Name
                </Text>
                <Text flex={1} textAlign="center">
                  Price
                </Text>
                <Text flex={1} textAlign="center">
                  Category
                </Text>
                <Text flex={1} textAlign="center">
                  Action
                </Text>
              </Flex>
              {menuList.length > 0 && !isRefreshing ? (
                <FlatList
                  refreshing={isRefreshing}
                  onRefresh={getAllItem}
                  keyExtractor={(item, index) => item.name + index}
                  data={selectedMenuList}
                  renderItem={({ item, index }) => (
                    <MenuListItem item={item} index={index} />
                  )}
                />
              ) : (
                <Flex
                  direction="row"
                  justify="center"
                  alignItems="center"
                  m={5}
                >
                  <Spinner accessibilityLabel="Loading posts" mx={10} />
                  <Heading fontSize="md">Loading</Heading>
                </Flex>
              )}
            </Flex>
          </Flex>
        </VStack>
      </Stack>
    </>
  );
};

interface MenuListItemProps {
  item: ItemFromApi;
  index: number;
}

const MenuListItem = ({ item, index }: MenuListItemProps) => {
  return (
    <Flex
      direction="row"
      bg={useColorModeValue("light.100", "dark.100")}
      py={4}
    >
      <Text flex={0.5} textAlign="center">
        {index + 1}
      </Text>
      <Text flex={0.5} textAlign="center">
        {item.id}
      </Text>
      <Text flex={1} textAlign="center">
        {item.name}
      </Text>
      <Text flex={1} textAlign="center">
        {item.price.toFixed(2)}
      </Text>
      <Text flex={1} textAlign="center">
        {item.item_category_name}
      </Text>
      <Flex flex={1} textAlign="center">
        <Button colorScheme="gray" variant="outline" mx={10}>
          Edit
        </Button>
      </Flex>
    </Flex>
  );
};

export default MenuScreen;
