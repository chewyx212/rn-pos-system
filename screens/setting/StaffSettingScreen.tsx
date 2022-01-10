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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StaffApi } from "../../api/StaffApi";
import { ListRenderItemInfo, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CreateStaffType, StaffListType } from "../../types/staffType";
import PullToRefreshScrollView from "../../components/PullToRefreshScrollView";
import { logout } from "../../app/auth/authSlice";

type StaffSettingScreenProp = DrawerNavigationProp<
  RootStackParamList,
  "StaffSetting"
>;
type StaffSettingScreenRouteProp = RouteProp<
  RootStackParamList,
  "StaffSetting"
>;
const StaffSettingScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStaffType>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [staffList, setStaffList] = useState<StaffListType[]>([]);
  const toast = useToast();
  const restaurantInfo = useAppSelector((state) => state.auth.restaurantInfo);
  const aaaa = useAppSelector((state) => state.auth);
  const navigation = useNavigation<StaffSettingScreenProp>();
  const dispatch = useAppDispatch()

  useEffect(() => {
    getAllStaff();
  }, []);

  const getAllStaff = async () => {
    setIsRefreshing(true);
    console.log("herererAGASDFG")
    console.log(aaaa);
    if (restaurantInfo) {
      const restaurantId: number = restaurantInfo.id;
      const result = await StaffApi.getStaff(restaurantId);
      console.log(result);
      if (result.status === 200 && result.data.status === 2002) {
        console.log(result.data.response.staffs);
        if (
          result.data.response.staffs &&
          result.data.response.staffs.length > 0
        ) {
          setStaffList(result.data.response.staffs);
        }
      }
    } else {
      dispatch(logout())
    }
    setIsRefreshing(false);
  };

  const onSubmit = async (field: CreateStaffType) => {
    const restaurantId: number = restaurantInfo.id;
    const payload = {
      ...field,
      restaurant_id: restaurantId,
    };
    console.log(payload);
    const result = await StaffApi.createStaff(payload);
    console.log(result.data);
    console.log(result.status);
    if (result.status === 200 &&result.data.status == 2001) {
      await toast.closeAll();
      toast.show({
        title: "Add Staff Success!",
        status: "success",
        placement: "top",
      });
    setOpenAddModal(false);
    } else if (result.status === 422) {
      console.log(result.data);
      await toast.closeAll();
      toast.show({
        title: "Email or password is wrong!",
        status: "error",
        placement: "top",
      });
      reset()
    } else {
      await toast.closeAll();
      toast.show({
        title: "Try again later!",
        description: "Something wrong...",
        status: "warning",
        placement: "top",
      });
    setOpenAddModal(false);
    }
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
            <Text py={3} px={2} flex={0.5} textAlign="center">
              Id
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Name
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Phone
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Email
            </Text>
            <Text py={3} px={2} flex={1} textAlign="center">
              Role
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
          {staffList.length > 0  ? (
            <FlatList
              refreshing={isRefreshing}
              onRefresh={getAllStaff}
              keyExtractor={(item, index) => item.name + index}
              data={staffList}
              renderItem={({
                item,
                index,
              }: ListRenderItemInfo<StaffListType>) => (
                <StaffSettingListItem staff={item} index={index} />
              )}
            />
          ) : !isRefreshing ? (
            <PullToRefreshScrollView
              isRefreshing={isRefreshing}
              onRefresh={getAllStaff}
            >
              <Flex direction="row" justify="center" alignItems="center" m={5}>
                <Text>No Staff Found</Text>
              </Flex>
            </PullToRefreshScrollView>
          ):<></>}
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
            <Modal.Header>Add Staff</Modal.Header>
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
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Username
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
                      my={errors.username ? 4 : 2}
                      h={12}
                      placeholder="Username"
                      type="text"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      isInvalid={errors.username ? true : false}
                    />
                    {errors.username && (
                      <Text color="red.500">This field is required.</Text>
                    )}
                  </>
                )}
                name="username"
              />

              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Phone Number
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
                      my={errors.phone_number ? 4 : 2}
                      h={12}
                      placeholder="+60123456789"
                      type="text"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      isInvalid={errors.phone_number ? true : false}
                    />
                    {errors.phone_number && (
                      <Text color="red.500">This field is required.</Text>
                    )}
                  </>
                )}
                name="phone_number"
              />
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Email
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
                      my={errors.email ? 4 : 2}
                      h={12}
                      placeholder="youremail@mail.com"
                      type="text"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      isInvalid={errors.email ? true : false}
                    />
                    {errors.email && (
                      <Text color="red.500">This field is required.</Text>
                    )}
                  </>
                )}
                name="email"
              />
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      pl={5}
                      my={errors.password ? 4 : 2}
                      h={12}
                      placeholder="Your secret password"
                      type="password"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      secureTextEntry
                      isInvalid={errors.password ? true : false}
                    />
                    {errors.password && (
                      <Text color="red.500">
                        Minimun 8 letters or numbers required.
                      </Text>
                    )}
                  </>
                )}
                name="password"
              />
              <Text
                fontFamily="sf-pro-text-semibold"
                fontWeight="600"
                fontSize={15}
                py={2}
              >
                POS Passcode
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[0-9]{4}$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      pl={5}
                      my={errors.pos_password ? 4 : 2}
                      h={12}
                      placeholder="Your 4 digits passcode"
                      type="passcode"
                      fontFamily="sf-pro-text-regular"
                      fontSize="15px"
                      _focus={{
                        borderWidth: 0.5,
                        borderColor: "dark.200",
                      }}
                      secureTextEntry
                      isInvalid={errors.pos_password ? true : false}
                    />
                    {errors.pos_password && (
                      <Text color="red.500">4 digits required.</Text>
                    )}
                  </>
                )}
                name="pos_password"
              />

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

interface StaffSettingListItemProps {
  staff: StaffListType;
  index: number;
}

const StaffSettingListItem = ({ staff, index }: StaffSettingListItemProps) => {
  return (
    <Flex direction="row" py={4}>
      <Text flex={0.5} textAlign="center">
        {index + 1}
      </Text>
      <Text flex={0.5} textAlign="center">
        {staff.id}
      </Text>
      <Text flex={1} textAlign="center">
        {staff.name}
      </Text>
      <Text flex={1} textAlign="center">
        {staff.phone_number}
      </Text>
      <Text flex={1} textAlign="center">
        {staff.email}
      </Text>
      <Text flex={1} textAlign="center">
        {staff.type}
      </Text>
      <Flex flex={.5} textAlign="center">
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
                  mr={3}
                  name="more-vertical"
                  size={5}
                />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Edit</Menu.Item>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default StaffSettingScreen;
