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
  Box,
  Spinner,
  Stack,
  VStack,
  Pressable,
  ScrollView,
  Switch,
} from "native-base";
import React, { useEffect, useState } from "react";
import { MaterialIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "./RootStackParams";
import { Platform, RefreshControl } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import { ItemApi } from "../api/ItemApi";
import {
  AddonType,
  EditItemForm,
  ItemCategoryType,
  ItemType,
} from "../types/itemType";
import NumberPadInput from "../components/NumberPadInput";
import PullToRefreshScrollView from "../components/PullToRefreshScrollView";
import { itemData } from "../assets/DUMMY";
import { CreateStaffType } from "../types/staffType";
type CreateMemberType = {
  name: string;
  mobile: string;
  email: string;
  address: string;
};
type FormInputType = "name" | "mobile" | "email" | "address";
type FormItemType = {
  display: string;
  form: FormInputType;
  placeholder: string;
}
type MemberScreenProp = DrawerNavigationProp<RootStackParamList, "Transaction">;
type MemberScreenRouteProp = RouteProp<RootStackParamList, "Member">;
const MemberScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMemberType>();
  const formList: FormItemType[] = [
    { display: "Name", form: "name", placeholder: "Full Name" },
    { display: "Mobile No.", form: "mobile", placeholder: "+601x-1234xxx" },
    { display: "Email", form: "email", placeholder: "example@email.com" },
    { display: "Address", form: "address", placeholder: "Delivery Address" },
  ];
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openNumberPad, setOpenNumberPad] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [isStockCheck, setIsStockCheck] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<ItemType[]>([]);
  const [selectedMemberList, setSelectedMemberList] = useState<ItemType[]>([]);
  const [selectedEditItem, setSelectedEditItem] = useState<ItemType>();
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<MemberScreenProp>();

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
    // mappingAllItem(itemData);
  };

  const mappingAllItem = (response: any[]) => {
    let category: ItemCategoryType[] = [];
    let itemList: ItemType[] = [];
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
        idList.push(item.item_category_id);
        category.push({
          id: item.item_category_id,
          name: item.item_category_name,
          is_enabled: true,
        });
      }
    });
    setMemberList(itemList);
    setSelectedMemberList(
      itemList.filter((item) => item.item_category_id === idList[0])
    );
    setSelectedCategoryId(idList[0]);
    setCategoryList(category);
  };

  const onSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedMemberList(
      memberList.filter((item) => item.item_category_id === categoryId)
    );
  };

  const onSubmit = (field: any) => {
    console.log(field);
  };

  return (
    <>
      <VStack
        safeAreaBottom
        position="relative"
        pt={6}
        pb={4}
        px={6}
        h="100%"
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
      >
        <Flex direction="row" justify="space-between">
          <Input
            placeholder="Search"
            borderRadius="4"
            w="25%"
            py="3"
            px="1"
            fontSize="14"
            _web={{
              _focus: {
                borderColor: "greyColor.200",
              },
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="greyColor.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
          <Button
            bg={useColorModeValue("themeColor.500", "themeColor.600")}
            _pressed={{
              bg: useColorModeValue("themeColor.700", "themeColor.700"),
            }}
            onPress={() => setOpenAddModal(true)}
            _text={{
              color: "textColor.buttonText",
              fontFamily: "sf-pro-text-medium",
              fontSize: "15px",
            }}
          >
            Add Member
          </Button>
        </Flex>
        <VStack
          h="100%"
          w="100%"
          flex={6}
          bg={useColorModeValue("white", "greyColor.900")}
          borderRadius="xl"
          mt={3}
        >
          <Flex w="100%">
            <Flex
              direction="row"
              textAlign="center"
              py={3}
              px={2}
              borderBottomWidth={1}
              borderBottomColor={useColorModeValue(
                "greyColor.100",
                "greyColor.800"
              )}
            >
              <Text flex={1} textAlign="center">
                Id
              </Text>
              <Text flex={1} textAlign="center">
                Name
              </Text>
              <Text flex={1} textAlign="center">
                Mobile
              </Text>
              <Text flex={1} textAlign="center">
                Email
              </Text>
              <Text flex={1} textAlign="center">
                Address
              </Text>
              <Text flex={1} textAlign="center">
                Joined since
              </Text>
              <Text flex={1} textAlign="center">
                Action
              </Text>
            </Flex>
            {memberList.length > 0 && !isRefreshing ? (
              <FlatList
                refreshing={isRefreshing}
                onRefresh={getAllItem}
                keyExtractor={(item, index) => item.name + index}
                data={selectedMemberList}
                renderItem={({ item, index }) => (
                  <MemberListItem item={item} onPress={onPressItemHandler} />
                )}
              />
            ) : isRefreshing ? (
              <PullToRefreshScrollView
                isRefreshing={isRefreshing}
                onRefresh={getAllItem}
              >
                <Flex
                  direction="row"
                  justify="center"
                  alignItems="center"
                  m={5}
                >
                  <Spinner accessibilityLabel="Loading transaction" mx={10} />
                  <Heading fontSize="md">Loading</Heading>
                </Flex>
              </PullToRefreshScrollView>
            ) : (
              <PullToRefreshScrollView
                isRefreshing={isRefreshing}
                onRefresh={getAllItem}
              >
                <Flex
                  direction="row"
                  justify="center"
                  alignItems="center"
                  m={5}
                >
                  <Heading fontSize="md" ml={-10}>
                    No Member Found
                  </Heading>
                </Flex>
              </PullToRefreshScrollView>
            )}
          </Flex>
        </VStack>
      </VStack>
      <Modal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
      >
        <KeyboardAvoidingView
          w="100%"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal.Content alignSelf="center" maxWidth="600px">
            <Modal.CloseButton />
            <Modal.Header>Add Member</Modal.Header>
            <Modal.Body>
              {formList.map((formItem:FormItemType) => {
                return (
                  <>
                    <Text
                      fontFamily="sf-pro-text-semibold"
                      fontWeight="600"
                      fontSize={15}
                      py={2}
                    >
                      {formItem.display}
                    </Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            pl={5}
                            my={errors[formItem.form] ? 4 : 2}
                            h={12}
                            placeholder={formItem.placeholder}
                            type="text"
                            fontFamily="sf-pro-text-regular"
                            fontSize="15px"
                            _focus={{
                              borderWidth: 0.5,
                              borderColor: "dark.200",
                            }}
                            isInvalid={errors[formItem.form] ? true : false}
                          />
                          {errors[formItem.form] && (
                            <Text color="red.500">This field is required.</Text>
                          )}
                        </>
                      )}
                      name={formItem.form}
                    />
                  </>
                );
              })}

              <Button
                w="100%"
                mt={5}
                mb={16}
                h={12}
                bg={useColorModeValue("themeColor.500", "themeColor.600")}
                _pressed={{
                  bg: useColorModeValue("themeColor.700", "themeColor.700"),
                }}
                _text={{
                  color: "textColor.buttonText",
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "17px",
                }}
                onPress={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Modal.Body>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

interface MemberListItemProps {
  item: ItemType;
  onPress: Function;
}

const MemberListItem = ({ item, onPress }: MemberListItemProps) => {
  return (
    <Pressable
      py={4}
      _pressed={{ bg: useColorModeValue("light.400", "dark.400") }}
      onPress={() => onPress(item)}
    >
      <Flex direction="row">
        <Text flex={1} textAlign="center">
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
        <Text flex={1} textAlign="center">
          {item.is_stock_check ? (item.stock ? item.stock : 0) : "-"}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default MemberScreen;
