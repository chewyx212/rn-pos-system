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
  Pressable,
  Menu,
  AlertDialog,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../RootStackParams";
import { useAppSelector } from "../../app/hooks";
import { StaffApi } from "../../api/StaffApi";
import { ListRenderItemInfo, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  CreateTableCategoryType,
  CreateTableType,
  TableCategoryListType,
} from "../../types/tableType";
import { TableApi } from "../../api/TableApi";
import PullToRefreshScrollView from "../../components/PullToRefreshScrollView";

type TableCategorySettingProp = DrawerNavigationProp<
  RootStackParamList,
  "TableCategorySetting"
>;
type TableCategorySettingRouteProp = RouteProp<
  RootStackParamList,
  "TableCategorySetting"
>;
const TableCategorySetting = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTableCategoryType>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const [selectedDelete, setSelectedDelete] = useState<number>(0);
  const [tableCategoryList, setTableCategoryList] = useState<
    TableCategoryListType[]
  >([]);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<TableCategorySettingProp>();
  const cancelRef = useRef(null);
  useEffect(() => {
    getAllTableCategory();
  }, []);

  const getAllTableCategory = async () => {
    setIsRefreshing(true);
    if (restaurantInfo) {
      const restaurantId: number = restaurantInfo.id;
      const result = await TableApi.getTableCategory(restaurantId);
      if (result.status === 200) {
        if (
          result.data.response.table_categories &&
          result.data.response.table_categories.length > 0
        ) {
          setTableCategoryList(result.data.response.table_categories);
        }
      }
    }
    setIsRefreshing(false);
  };

  const onSubmit = async (field: CreateTableCategoryType) => {
    const restaurantId: number = restaurantInfo.id;
    const payload = {
      ...field,
      restaurant_id: restaurantId,
    };
    const result = await TableApi.createTableCategory(payload);
    if (result.status === 200) {
      await toast.closeAll();
      toast.show({
        title: "Success!",
        description: "Create new table category success.",
        status: "success",
        placement: "top",
      });
      reset();
      getAllTableCategory();
    } else {
      await toast.closeAll();
      toast.show({
        title: "Try again later!",
        description: "Something wrong...",
        status: "warning",
        placement: "top",
      });
    }
    setOpenAddModal(false);
  };

  const confirmDelete = (id: number) => {
    setIsConfirmDelete(true);
    setSelectedDelete(id);
  };
  const onCloseConfirm = () => {
    setIsConfirmDelete(false);
    setSelectedDelete(0);
  };

  const onDelete = async () => {
    console.log(selectedDelete);
    const result = await TableApi.deleteTableCategory(selectedDelete);
    console.log(result)
    getAllTableCategory()
    onCloseConfirm();
  };

  return (
    <>
      <Flex
        bg={useColorModeValue("greyColor.50", "greyColor.1000")}
        pb={3}
        pt={6}
        pr={6}
        h="100%"
      >
        <Flex
          bg={useColorModeValue("white", "greyColor.900")}
          borderRightRadius="xl"
          h="100%"
        >
          <Flex direction="row" textAlign="center">
            <Text py={3} px={2} flex={0.5} textAlign="center">
              Index
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Id
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Name
            </Text>
            <Pressable
              flex={0.5}
              textAlign="center"
              py={3}
              px={2}
              borderTopRightRadius="xl"
              bg={useColorModeValue("themeColor.400", "themeColor.400")}
              onPress={() => setOpenAddModal(true)}
            >
              <Icon
                as={Feather}
                ml="auto"
                mr={3}
                name="plus-circle"
                size={5}
                color={useColorModeValue(
                  "textColor.buttonText",
                  "textColor.buttonText"
                )}
              />
            </Pressable>
          </Flex>
          {tableCategoryList.length > 0 ? (
            <FlatList
              refreshing={isRefreshing}
              onRefresh={getAllTableCategory}
              keyExtractor={(item, index) => item.id + index}
              data={tableCategoryList}
              renderItem={({
                item,
                index,
              }: ListRenderItemInfo<TableCategoryListType>) => (
                <TableCategorySettingListItem
                  category={item}
                  index={index}
                  confirmDelete={confirmDelete}
                />
              )}
            />
          ) : !isRefreshing ? (
            <PullToRefreshScrollView
              isRefreshing={isRefreshing}
              onRefresh={getAllTableCategory}
            >
              <Flex direction="row" justify="center" alignItems="center" m={5}>
                <Text>No Category Found</Text>
              </Flex>
            </PullToRefreshScrollView>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
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
            <Modal.Header>New Table Category</Modal.Header>
            <Modal.Body>
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Category Name
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
                      my={errors.name ? 4 : 2}
                      h={12}
                      placeholder="Category Name"
                      type="text"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      isInvalid={errors.name ? true : false}
                    />
                    {errors.name && (
                      <Text color="red.500">This field is required.</Text>
                    )}
                  </>
                )}
                name="name"
              />
              <Button
                w="100%"
                mt={5}
                mb={16}
                h={12}
                _text={{
                  color: "dark.800",
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
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isConfirmDelete}
        onClose={onCloseConfirm}
        closeOnOverlayClick={true}
        size="md"
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to delete this table category?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                _text={{
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "13px",
                }}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                onPress={onDelete}
                colorScheme="danger"
                _text={{
                  color: "textColor.buttonText",
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "13px",
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

interface TableCategorySettingListItemProps {
  category: TableCategoryListType;
  index: number;
  confirmDelete: Function;
}

const TableCategorySettingListItem = ({
  category,
  index,
  confirmDelete,
  F,
}: TableCategorySettingListItemProps) => {
  return (
    <Flex direction="row" py={4}>
      <Text flex={0.5} textAlign="center">
        {index + 1}
      </Text>
      <Text flex={1} textAlign="center">
        {category.id}
      </Text>

      <Text flex={1} textAlign="center">
        {category.name}
      </Text>
      <Flex flex={0.5} textAlign="center">
        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Icon
                  as={Feather}
                  ml="auto"
                  mr="30%"
                  name="more-vertical"
                  size={5}
                />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item onPress={() => confirmDelete(category.id)}>
            Delete
          </Menu.Item>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TableCategorySetting;
