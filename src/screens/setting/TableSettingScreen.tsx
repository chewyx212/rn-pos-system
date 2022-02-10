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
import { CreateTableType, TableListType } from "../../types/tableType";
import { TableApi } from "../../api/TableApi";
import PullToRefreshScrollView from "../../components/PullToRefreshScrollView";

type TableSettingScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "TableSetting"
>;
type TableSettingScreenRouteProp = RouteProp<
  RootStackParamList,
  "TableSetting"
>;
const TableSettingScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTableType>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [tableList, setTableList] = useState<TableListType[]>([]);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const navigation = useNavigation<TableSettingScreenProp>();

  useEffect(() => {
    getAllTable();
  }, []);

  const getAllTable = async () => {
    setIsRefreshing(true);
    if (restaurantInfo) {
      const restaurantId: number = restaurantInfo.id;
      const result = await TableApi.getTable(restaurantId);
      console.log(result);
      if (result.status === 200 && result.data.status === 1001) {
        console.log(result.data.response.tableLists);
        if (
          result.data.response.tableLists &&
          result.data.response.tableLists.length > 0
        ) {
          setTableList(result.data.response.tableLists);
        }
      }
    }
    setIsRefreshing(false);
  };

  const onSubmit = async (field: CreateTableType) => {
    const restaurantId: number = restaurantInfo.id;
    const payload = {
      ...field,
      restaurant_id: restaurantId,
    };
    console.log(payload);
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
            <Text py={3} px={2} flex={1} textAlign="center">
              Category
            </Text>
            <Text py={3} px={2} flex={.5} textAlign="center">
              Action
            </Text>
            {/* <Pressable
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
            </Pressable> */}
          </Flex>
          {tableList.length > 0 ? (
            <FlatList
              refreshing={isRefreshing}
              onRefresh={getAllTable}
              keyExtractor={(item, index) => item.table_name + index}
              data={tableList}
              renderItem={({
                item,
                index,
              }: ListRenderItemInfo<TableListType>) => (
                <TableSettingListItem table={item} index={index} />
              )}
            />
          ) : !isRefreshing ? (
            <PullToRefreshScrollView
              isRefreshing={isRefreshing}
              onRefresh={getAllTable}
            >
              <Flex direction="row" justify="center" alignItems="center" m={5}>
                <Text>No Table Found</Text>
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
            <Modal.Header>Add Table</Modal.Header>
            <Modal.Body>
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Name
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
                      placeholder="Full Name"
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
    </>
  );
};

interface TableSettingListItemProps {
  table: TableListType;
  index: number;
}

const TableSettingListItem = ({ table, index }: TableSettingListItemProps) => {
  return (
    <Flex direction="row" py={4}>
      <Text flex={0.5} textAlign="center">
        {index + 1}
      </Text>
      <Text flex={1} textAlign="center">
        {table.id}
      </Text>

      <Text flex={1} textAlign="center">
        {table.table_name}
      </Text>
      <Text flex={1} textAlign="center">
        {table.table_categories.length > 0
          ? table.table_categories.map((category) => `${category.name},`)
          : "-"}
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
          <Menu.Item>Delete</Menu.Item>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TableSettingScreen;
