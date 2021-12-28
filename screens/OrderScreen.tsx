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
  IconButton,
  useToast,
  TextArea,
  KeyboardAvoidingView,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { itemData } from "../assets/DUMMY";
import PrimaryButton from "../components/Ui/PrimaryButton";
import SlideFromRight from "../components/Ui/SlideFromRight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  changeCart,
  clearCart,
  deleteCartItem,
  setCart,
  updateCartItem,
} from "../app/cart/cartSlice";
import { setOrder } from "../app/order/orderSlice";
import { fetchOrder, storeOrder } from "../helpers/fetchOrder";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import NumberPadInput from "../components/NumberPadInput";
import PasscodeVerification from "../components/PasscodeVerification";
import { ItemCategoryType, ItemDataType } from "../types/itemType";

const mappingItemCategory = (): ItemCategoryType[] => {
  let category: ItemCategoryType[] = [];
  let idList: number[] = [];
  itemData.forEach((item) => {
    if (!idList.includes(item.item_category.id)) {
      idList.push(item.item_category.id);
      category.push(item.item_category);
    }
  });
  return category;
};

type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Order"
>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;
const OrderScreen = () => {
  const [itemList, setItemList] = useState<ItemDataType[]>(itemData);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>(
    mappingItemCategory()
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(
    mappingItemCategory()[0].id
  );
  const [selectedItem, setSelectedItem] = useState<ItemDataType>({});
  const [selectedItemQuantity, setSelectedItemQuantity] = useState<number>(1);
  const [selectedItemAddon, setSelectedItemAddon] = useState({});
  const [selectedAllAddon, setSelectedAllAddon] = useState([]);
  const [fixedCartItem, setFixedCartItem] = useState<any[]>([]);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [openSelectionModal, setOpenSelectionModal] = useState<boolean>(false);
  const [isEditCartMode, setIsEditCartMode] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [discountInCart, setDiscountInCart] = useState<boolean>(false);
  const [discountDetailInCart, setDiscountDetailInCart] = useState({
    discountType: 1,
    discountAmount: 0.0,
    reference: "",
  });
  const [addonForm, setAddonForm] = useState({});
  const [addonCheckboxForm, setAddonCheckboxForm] = useState<string[]>([]);
  const [openAddon, setOpenAddon] = useState<boolean>(false);
  const [isEditAddon, setIsEditAddon] = useState<boolean>(false);
  const [isEditQuantity, setIsEditQuantity] = useState<boolean>(false);
  const [showDiscountModal, setShowDiscountModal] = useState<boolean>(false);
  const [applyOnOrder, setApplyOnOrder] = useState<boolean>(false);
  const [togglePasscode, setTogglePasscode] = useState<boolean>(false);

  const [showCustomQuantity, setShowCustomQuantity] = useState<boolean>(false);
  const [selectedDiscountType, setSelectedDiscountType] = useState<number>(1);
  const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const [enteredReference, setEnteredReference] = useState<string>("");
  const [selectedEditItem, setSelectedEditItem] = useState<ItemDataType>({});
  const [selectedEditItemQuantity, setSelectedEditItemQuantity] =
    useState<number>(0);
  const [selectedEditItemIndex, setSelectedEditItemIndex] = useState<number>(0);
  const [orderDetail, setOrderDetail] = useState({
    subtotal: 0.0,
    total: 0.0,
    discountType: 1,
    discountAmount: 0.0,
    reference: "",
    tax: 0.0,
  });
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.cartItem);
  const cancelRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const route = useRoute<OrderScreenRouteProp>();
  const { orderType, tableId, pax, refresher, orders } = route.params;
  const selectionButtonGroup = [
    // {
    //   name: "Add Customer",
    //   icon: AntDesign,
    //   iconName: "adduser",
    //   function: () => {
    //     setOpenSelectionModal(false);
    //   },
    // },
    {
      name: "Add Discount",
      icon: Feather,
      iconName: "percent",
      function: () => {
        discountOrderHandler();
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
    {
      name: "Void Order",
      icon: Entypo,
      iconName: "block",
      function: () => {
        onVoidOrder();
        setOpenSelectionModal(false);
      },
    },
  ];

  const discountType = [
    { id: 1, name: "Amount" },
    { id: 2, name: "Percent" },
    { id: 3, name: "Fixed Price" },
    { id: 4, name: "FOC" },
  ];
  const openPasscode = () => {
    setTogglePasscode(true);
  };
  const closePasscode = () => {
    setTogglePasscode(false);
  };

  const submitHandler = (result) => {
    console.log("heihei");
    console.log(result);
    onVerifiedVoidOrder();
  };

  useEffect(() => {
    calculateOrderPrice();
  }, [cartItem]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setIsEditCartMode(true);
      let sentArray: any[] = [];
      let holdArray: any[] = [];
      orders.forEach((order) => {
        order.items.forEach((item, index) => {
          if (item.orderStatus === 2) {
            sentArray.push({
              ...item,
              itemIndex: index,
              orderIndex: order.orderIndex,
            });
          } else {
            holdArray.push({
              ...item,
              itemIndex: index,
              orderIndex: order.orderIndex,
            });
          }
        });
      });
      setFixedCartItem(sentArray);
      dispatch(setCart({ item: holdArray }));
    } else {
      dispatch(clearCart());
    }
  }, []);

  const calculateOrderPrice = (discountInCartDetail?) => {
    console.log("recalculating");
    let items = cartItem;
    let detail = {
      subtotal: 0.0,
      total: 0.0,
      discountType: 1,
      discountAmount: 0.0,
      reference: "",
      tax: 0.0,
    };

    if (fixedCartItem.length > 0) {
      fixedCartItem.forEach((item) => {
        if (item.discountType && item.discountType === 1) {
          detail.subtotal +=
            (parseFloat(item.calculatedPrice) - item.discountAmount) *
            item.quantity;
        } else if (item.discountType && item.discountType === 2) {
          detail.subtotal +=
            ((parseFloat(item.calculatedPrice) * (100 - item.discountAmount)) /
              100) *
            item.quantity;
        } else if (item.discountType && item.discountType === 3) {
          detail.subtotal += item.discountAmount;
        } else if (item.discountType && item.discountType === 4) {
        } else {
          detail.subtotal += parseFloat(item.calculatedPrice) * item.quantity;
        }
      });
    }

    items.forEach((item) => {
      if (item.discountType && item.discountType === 1) {
        detail.subtotal +=
          (parseFloat(item.calculatedPrice) - item.discountAmount) *
          item.quantity;
      } else if (item.discountType && item.discountType === 2) {
        detail.subtotal +=
          ((parseFloat(item.calculatedPrice) * (100 - item.discountAmount)) /
            100) *
          item.quantity;
      } else if (item.discountType && item.discountType === 3) {
        detail.subtotal += item.discountAmount;
      } else if (item.discountType && item.discountType === 4) {
      } else {
        detail.subtotal += parseFloat(item.calculatedPrice) * item.quantity;
      }
    });
    detail.subtotal = parseFloat(detail.subtotal.toFixed(2));

    detail.total = parseFloat(detail.subtotal.toFixed(2));
    console.log(orders[0]);
    if (discountInCartDetail) {
      console.log("calculating here");
      detail = {
        ...detail,
        ...discountInCartDetail,
      };
      if (detail.discountType === 1) {
        detail.total = detail.subtotal - detail.discountAmount;
      } else if (detail.discountType === 2) {
        let discountFunc = ((100 - detail.discountAmount) / 100).toFixed(2);
        detail.total = parseFloat(
          (detail.subtotal * parseFloat(discountFunc)).toFixed(2)
        );
      } else if (detail.discountType === 3) {
        detail.total = detail.discountAmount;
      } else if (detail.discountType === 4) {
        detail.total = 0;
      }
      if (orders && orders[0]) {
        orders[0].detail = detail;
      }
    } else if (
      orders &&
      orders[0] &&
      orders[0].detail &&
      orders[0].detail.discountType
    ) {
      console.log("calculating htertetetere");
      const orderDiscountDetail = orders[0].detail;
      if (orderDiscountDetail.discountType === 1) {
        detail.total = detail.total - orderDiscountDetail.discountAmount;
      } else if (orderDiscountDetail.discountType === 2) {
        let discountFunc = (
          (100 - orderDiscountDetail.discountAmount) /
          100
        ).toFixed(2);
        detail.total = parseFloat(
          (detail.total * parseFloat(discountFunc)).toFixed(2)
        );
      } else if (orderDiscountDetail.discountType === 3) {
        detail.total = orderDiscountDetail.discountAmount;
      } else if (orderDiscountDetail.discountType === 4) {
        detail.total = 0;
      }

      detail = {
        ...detail,
        ...orderDiscountDetail,
      };
    }

    if (detail.discountType !== 3 && detail.discountType !== 4) {
      detail.tax = parseFloat(((detail.subtotal * 6) / 100).toFixed(2));
      detail.total += detail.tax;
    }

    setOrderDetail(detail);
  };

  const onCloseConfirm = () => setIsConfirm(false);

  const sendCartHandler = async (item, quantity) => {
    dispatch(
      changeCart({
        item: {
          ...item,
          calculatedPrice: parseFloat(item.price),
        },
        quantity,
      })
    );
    await toast.closeAll();
    toast.show({
      background: "emerald.500",
      description: `${item.name} added into cart.`,
      placement: "top",
      isClosable: true,
    });
  };

  const onSubmitOrder = async (orderStatus: number) => {
    if (cartItem.length > 0 || fixedCartItem.length > 0) {
      let tempArray = cartItem.map((item) => ({ ...item, orderStatus }));

      if (isEditCartMode && orders) {
        const orderValue = await fetchOrder();
        if (orderType === 1) {
          orderValue.find((order) => order.tableId === tableId).items =
            fixedCartItem.concat(tempArray);
          orderValue.find((order) => order.tableId === tableId).orderStatus =
            orderStatus;
          orderValue.find((order) => order.tableId === tableId).detail =
            orderDetail;
        } else {
          let orderIndex = orders[0].orderIndex;
          orderValue[orderIndex].items = fixedCartItem.concat(tempArray);
          orderValue[orderIndex].orderStatus = orderStatus;
          orderValue[orderIndex].detail = orderDetail;
        }

        await storeOrder(orderValue);
        dispatch(setOrder(orderValue));
        setOpenCart(false);
        onCloseConfirm();
        onClearCartHandler();
        refresher();
        navigation.navigate("Table");
      } else {
        const orderValue = await fetchOrder();
        orderValue.push({
          id:
            orderValue.length > 0
              ? orderValue[orderValue.length - 1].id + 1
              : 1,
          orderType,
          tableId,
          pax,
          items: tempArray,
          orderIndex: orderValue.length,
          orderStatus,
          detail: orderDetail,
        });
        await storeOrder(orderValue);
        dispatch(setOrder(orderValue));
        setOpenCart(false);
        onCloseConfirm();
        onClearCartHandler();
        refresher();
        navigation.navigate("Table");
      }
    }
  };

  const onRadioChange = (key: string, addonId: number) => {
    const addon = selectedAllAddon.find((item) => item.id == addonId);
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
  };

  const onCheckChange = (key: string, values: any[]) => {
    let addon = values.map((value) => {
      return selectedAllAddon.find((item) => item.id == value);
    });
    setAddonCheckboxForm(values);
    setAddonForm((prevState) => ({ ...prevState, [key]: addon }));
  };

  const onAddAddon = async () => {
    let addonsPayload = [];
    Object.values(addonForm).forEach((item) => {
      if (item.length > 0) {
        addonsPayload = [...addonsPayload, ...item];
      } else if (item.length === undefined) {
        addonsPayload.push(item);
      }
    });
    let payload = {
      ...selectedItem,
      calculatedPrice: parseFloat(selectedItem.price),
      addons: addonsPayload,
    };
    if (isEditAddon) {
      payload = {
        ...selectedEditItem,
        calculatedPrice: parseFloat(selectedItem.price),
        addons: addonsPayload,
      };
    }
    if (payload.addons.length > 0) {
      payload.addons.forEach((addon) => {
        (payload.calculatedPrice += parseFloat(addon.price)).toFixed(2);
      });
    }

    if (isEditAddon) {
      const editedItem = {
        ...payload,
        quantity: selectedItemQuantity,
      };
      dispatch(
        updateCartItem({ index: selectedEditItemIndex, item: editedItem })
      );
    } else {
      dispatch(
        changeCart({
          item: {
            ...payload,
          },
          quantity: selectedItemQuantity,
        })
      );
    }
    await toast.closeAll();
    toast.show({
      background: "emerald.500",
      description: `${payload.name} added into cart.`,
      placement: "top",
      isClosable: true,
    });
    onCloseModalHandler();
  };

  const mappingAddon = (addons: any[], isEdit: boolean) => {
    let temp = [];
    let addonCategory = [];
    let allAddon = [];
    addons.forEach((addon) => {
      allAddon.push(addon);
      if (!temp.includes(addon.addon_category_id)) {
        temp.push(addon.addon_category_id);
        addonCategory.push({ ...addon.addon_category, data: [addon] });
        if (parseInt(addon.addon_category.type) === 2 && !isEdit) {
          setAddonForm((prevState) => ({
            ...prevState,
            [addon.addon_category.name]: addon,
          }));
        }
      } else {
        addonCategory
          .find((category) => category.id === addon.addon_category_id)
          .data.push(addon);
      }
    });
    setSelectedAllAddon(allAddon);
    setSelectedItemAddon(addonCategory);
  };

  const onOpenAddonHandler = (item) => {
    setSelectedItem(item);
    setSelectedItemQuantity(1);
    setAddonForm({});
    setAddonCheckboxForm([]);
    setOpenAddon(true);
    mappingAddon(item.addons, false);
    setIsEditAddon(false);
  };

  const onCloseModalHandler = () => {
    setSelectedAllAddon([]);
    setSelectedItemAddon({});
    setSelectedItemQuantity(1);
    setSelectedItem({});
    setAddonForm({});
    setAddonCheckboxForm([]);
    setOpenAddon(false);
    setIsEditAddon(false);
  };

  const onClearCartHandler = () => {
    dispatch(clearCart());
  };

  const deleteItemHandler = (item, index: number) => {
    if (fixedCartItem.length > 0) {
      index -= fixedCartItem.length;
    }
    if (fixedCartItem.length === 0 && index === 0) {
      voidCreatedOrder();
    }
    dispatch(deleteCartItem({ index }));
  };

  const editItemHandler = (item, index) => {
    if (fixedCartItem.length > 0) {
      setSelectedEditItemIndex(index - fixedCartItem.length);
    } else {
      setSelectedEditItemIndex(index);
    }
    setSelectedEditItem(item);
    setSelectedEditItemQuantity(item.quantity);
    let originalItem = itemList.find(
      (list: ItemDataType) => list.id === item.id
    );
    if (originalItem) {
      if (originalItem.addons.length > 0) {
        setIsEditQuantity(false);
        let temp: number[] = [];
        let tempObj = {};
        let tempArray: string[] = [];
        item.addons.forEach((item) => {
          if (!temp.includes(item.addon_category_id)) {
            temp.push(item.addon_category_id);
            if (parseInt(item.addon_category.type) === 1) {
              tempObj = {
                ...tempObj,
                [item.addon_category.name]: [item],
              };
              tempArray.push(item.id);
            } else {
              tempObj = { ...tempObj, [item.addon_category.name]: item };
            }
          } else if (parseInt(item.addon_category.type) === 1) {
            tempArray.push(item.id);
            tempObj[item.addon_category.name].push(item);
          }
        });
        setIsEditAddon(true);
        setSelectedItem(originalItem);
        setSelectedItemQuantity(item.quantity);
        setAddonCheckboxForm(tempArray);
        setAddonForm(tempObj);
        setOpenAddon(true);
        mappingAddon(originalItem.addons, true);
      } else {
        setIsEditQuantity(true);
      }
    }
  };

  const discountItemHandler = (item: ItemDataType, index: number) => {
    if (fixedCartItem.length > 0 && item.orderStatus !== 2) {
      setSelectedEditItemIndex(index - fixedCartItem.length);
    } else {
      setSelectedEditItemIndex(index);
    }
    setSelectedEditItem(item);
    setShowDiscountModal(true);
  };

  const onEditedQuantity = () => {
    const editedItem = {
      ...selectedEditItem,
      quantity: selectedEditItemQuantity,
    };
    dispatch(
      updateCartItem({ index: selectedEditItemIndex, item: editedItem })
    );
    setIsEditQuantity(false);
  };

  const onSelectAmount = (amount: number) => {
    setEnteredAmount(amount);
    setShowCustomQuantity(false);
  };

  const onReferenceChange = (e: any) => {
    setEnteredReference(e.currentTarget.value);
  };

  const onApplyDiscount = async () => {
    const editedItem = {
      ...selectedEditItem,
      discountType: selectedDiscountType,
      discountAmount: enteredAmount,
      reference: enteredReference,
    };
    if (selectedEditItem?.orderStatus && selectedEditItem.orderStatus === 2) {
      const orderValue = await fetchOrder();
      let orderTemp = [...orderValue];
      orderTemp;
      setFixedCartItem((pervState) => {
        pervState.splice(selectedEditItemIndex, 1, editedItem);
        return pervState;
      });
      if (
        selectedEditItem.orderIndex !== undefined &&
        selectedEditItem.orderIndex >= 0 &&
        selectedEditItem.itemIndex !== undefined &&
        selectedEditItem.itemIndex >= 0
      ) {
        orderTemp[selectedEditItem.orderIndex].items[
          selectedEditItem.itemIndex
        ] = editedItem;
      }

      await storeOrder(orderTemp);
      dispatch(setOrder(orderTemp));
      refresher();
    } else if (isEditCartMode) {
      // console.log(orders[0])
      console.log(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      dispatch(
        updateCartItem({ index: selectedEditItemIndex, item: editedItem })
      );
    } else {
      dispatch(
        updateCartItem({ index: selectedEditItemIndex, item: editedItem })
      );
    }
    calculateOrderPrice();
    setEnteredReference("");
    setEnteredAmount(0);
    setSelectedDiscountType(1);
    setShowDiscountModal(false);
  };

  const onVoidOrder = async () => {
    if (isEditCartMode && fixedCartItem.length > 0) {
      openPasscode();
    } else if (isEditCartMode) {
      voidCreatedOrder();
      navigation.navigate("Table");
    } else {
      onClearCartHandler();
    }
  };

  const onVerifiedVoidOrder = async () => {
    onClearCartHandler();
    voidCreatedOrder();
    navigation.navigate("Table");
  };

  const voidCreatedOrder = async () => {
    const orderValue = await fetchOrder();
    let orderTemp = [...orderValue];
    if (orders && orders[0]) {
      let orderIndex = orders[0]?.orderIndex;
      orderTemp.splice(orderIndex, 1);

      await storeOrder(orderTemp);
      dispatch(setOrder(orderTemp));
      refresher();
    }
  };

  const discountOrderHandler = () => {
    setApplyOnOrder(true);
    setShowDiscountModal(true);
  };

  const onDiscountOrder = async () => {
    const discountDetail = {
      subtotal: orderDetail.subtotal,
      total: orderDetail.total,
      tax: orderDetail.tax,
      discountType: selectedDiscountType,
      discountAmount: enteredAmount,
      reference: enteredReference,
    };
    if (discountDetail.discountType === 1) {
      discountDetail.total =
        discountDetail.subtotal - discountDetail.discountAmount;
    } else if (discountDetail.discountType === 2) {
      let discountFunc = ((100 - discountDetail.discountAmount) / 100).toFixed(
        2
      );
      discountDetail.total = parseFloat(
        (discountDetail.subtotal * parseFloat(discountFunc)).toFixed(2)
      );
    } else if (discountDetail.discountType === 3) {
      discountDetail.total = discountDetail.discountAmount;
    } else if (discountDetail.discountType === 4) {
      discountDetail.total = 0;
    }
    console.log(discountDetail);
    console.log("inside hereeeeeeeeeeeeeeeeee");
    if (isEditCartMode) {
      const orderValue = await fetchOrder();
      let orderTemp = [...orderValue];
      console.log(orderTemp);
      if (orders && orders[0]) {
        let orderIndex = orders[0].orderIndex;
        console.log(orderTemp[orderIndex]);
        orderTemp[orderIndex] = {
          ...orderTemp[orderIndex],
          detail: { ...orderTemp[orderIndex].detail, ...discountDetail },
        };
        console.log(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        console.log(orderTemp[orderIndex].detail);
        orders[0] = orderTemp[orderIndex];
        await storeOrder(orderTemp);
        dispatch(setOrder(orderTemp));
        refresher();
      }
      calculateOrderPrice(discountDetail);
    } else {
      console.log("should do something");
    }

    setEnteredReference("");
    setEnteredAmount(0);
    setSelectedDiscountType(1);
    setApplyOnOrder(false);
    setShowDiscountModal(false);
  };

  return (
    <>
      <Stack
        safeArea
        position="relative"
        h="100%"
        direction="row"
        pl={5}
        bg={useColorModeValue("light.100", "muted.800")}
      >
        <VStack h="100%" flex={6} mr="1%" pt={3}>
          <Flex direction="row" w="100%" justify="space-between" align="center">
            <Flex direction="row">
              <IconButton
                _icon={{
                  color: "primary.500",
                  size: "md",
                }}
                colorScheme="primary"
                icon={<Icon as={Ionicons} name="arrow-back" size="sm" />}
                mr={5}
                onPress={() => navigation.goBack()}
              />
              <Heading
                size="lg"
                fontFamily="sf-pro-display-bold"
                fontWeight="600"
                fontSize={{ base: 24, md: 32 }}
              >
                Order
              </Heading>
            </Flex>
            <IconButton
              display={{ md: "none" }}
              icon={<Icon as={AntDesign} name="shoppingcart" size="sm" />}
              mr={5}
              onPress={() => setOpenCart(true)}
            />
          </Flex>
          <Stack maxH={{ md: "9%" }}>
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
                      fontSize: { base: 15, md: 13 },
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
              px: "5px",
            }}
          >
            <Flex flex="1" direction="row" wrap="wrap" justify="flex-start">
              {itemList
                .filter((item) => item.item_category_id === selectedCategory)
                .map((item) => {
                  let textColor = useColorModeValue("light.100", "light.100");
                  let hoverTextColor = useColorModeValue(
                    "light.50",
                    "light.50"
                  );
                  let hoverBgColor = useColorModeValue(
                    "dark.400:alpha.40",
                    "dark.200:alpha.60"
                  );
                  let gradientColor = useColorModeValue(
                    "dark.400:alpha.50",
                    "dark.300:alpha.40"
                  );
                  return (
                    <Pressable
                      key={item.id}
                      flexBasis={{ base: "47%", lg: "22%" }}
                      h={{ base: "150px", md: "165px" }}
                      borderRadius="lg"
                      mx={{ base: "1%", lg: "1.5%" }}
                      my={{ base: "2%", lg: "1.5%" }}
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
                              fallbackSource={require("./../assets/fallback-img.jpg")}
                              alt={item.name}
                            />
                            <Flex
                              bg={
                                isPressed || isHovered
                                  ? hoverBgColor
                                  : gradientColor
                              }
                              h="100%"
                              w="100%"
                              pl={2}
                              pb={2}
                              borderRadius="lg"
                              position="absolute"
                              justify="space-between"
                              align="flex-start"
                            >
                              <Text
                                color={
                                  isPressed || isHovered
                                    ? hoverTextColor
                                    : textColor
                                }
                                fontFamily="sf-pro-display-bold"
                                fontWeight="600"
                                fontSize={{ base: 17, md: 22 }}
                              >
                                {item.id}
                              </Text>
                              <Flex>
                                <Text
                                  color={
                                    isPressed || isHovered
                                      ? hoverTextColor
                                      : textColor
                                  }
                                  fontFamily="sf-pro-text-semibold"
                                  fontWeight="600"
                                  fontSize={{ base: 17, md: 18 }}
                                >
                                  RM {item.price}
                                </Text>
                                <Text
                                  color={
                                    isPressed || isHovered
                                      ? hoverTextColor
                                      : textColor
                                  }
                                  fontFamily="sf-pro-text-semibold"
                                  fontWeight="600"
                                  fontSize={{ base: 17, md: 18 }}
                                >
                                  {item.name}
                                </Text>
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
        <Box
          h="100%"
          display={{ base: "none", sm: "none", md: "flex" }}
          flex={{ md: 4, lg: 2.5 }}
          pt={{ base: 0, sm: 0, md: 3 }}
          px={{ base: 0, sm: 0, md: 3 }}
          bg={useColorModeValue("light.100", "muted.800")}
          borderLeftWidth="2"
          borderLeftColor={useColorModeValue("light.200", "dark.200")}
        >
          <View w="100%" flex={{ base: 20, lg: 14 }}>
            <Flex direction="row" justify="space-between" align="center" py="2">
              <Heading size="md" fontFamily="sf-pro-text-bold" fontSize={17}>
                Current Order
              </Heading>
              <Text fontFamily="sf-pro-text-regular" fontSize={13}>
                {orderType === 1 && `Table Number: ${tableId}`}
                {orderType === 2 && "Take  Away"}
                {orderType === 3 && "Delivery"}
                {orderType === 4 && "Counter"}
              </Text>
            </Flex>
            {fixedCartItem.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => item.name + index}
                data={fixedCartItem.concat(cartItem)}
                renderItem={({ item, index }) => (
                  <CartListItem
                    item={item}
                    index={index}
                    deleteItemHandler={deleteItemHandler}
                    editItemHandler={editItemHandler}
                    discountItemHandler={discountItemHandler}
                  />
                )}
              />
            ) : (
              <FlatList
                keyExtractor={(item, index) => item.name + index}
                data={cartItem}
                renderItem={({ item, index }) => (
                  <CartListItem
                    item={item}
                    index={index}
                    deleteItemHandler={deleteItemHandler}
                    editItemHandler={editItemHandler}
                    discountItemHandler={discountItemHandler}
                  />
                )}
              />
            )}
          </View>
          <OrderDetailComponent
            setOpenSelectionModal={setOpenSelectionModal}
            setIsConfirm={setIsConfirm}
            cartItem={cartItem}
            order={orderDetail}
            fixedCartItem={fixedCartItem}
            onSubmitOrder={onSubmitOrder}
          />
        </Box>

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
                  onPress={() => onSubmitOrder(1)}
                  ref={cancelRef}
                >
                  Hold Order
                </Button>
                <Button colorScheme="success" onPress={() => onSubmitOrder(2)}>
                  Send to Kitchen
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>

        {/* <----------------------------- Cart Function Selection Modal ------------------------------> */}
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

        {/* <-------------------------------This is quantity modal for edit item ---------------------------------------> */}

        <Modal isOpen={isEditQuantity} onClose={() => setIsEditQuantity(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Edit Quantity</Modal.Header>
            <Modal.Body>
              <Flex direction="row" align="center" justify="space-between">
                <Button
                  flex={1}
                  colorScheme="red"
                  leftIcon={
                    selectedEditItemQuantity === 0 ? (
                      <Icon as={Entypo} name="trash" size="xs" />
                    ) : (
                      <Icon as={Entypo} name="minus" size="xs" />
                    )
                  }
                  onPress={() => {
                    if (selectedEditItemQuantity === 0) {
                      deleteItemHandler(
                        selectedEditItem,
                        selectedEditItemIndex
                      );

                      setIsEditQuantity(false);
                    } else {
                      setSelectedEditItemQuantity((prevState) => {
                        if (prevState > 0) {
                          return prevState - 1;
                        }
                        return prevState;
                      });
                    }
                  }}
                ></Button>
                <Text flex={1} alignSelf="center" textAlign="center">
                  {selectedEditItemQuantity}
                </Text>
                <Button
                  flex={1}
                  colorScheme="green"
                  py={3}
                  leftIcon={<Icon as={Entypo} name="plus" size="xs" />}
                  onPress={() =>
                    setSelectedEditItemQuantity((prevState) => prevState + 1)
                  }
                ></Button>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setIsEditQuantity(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    if (selectedEditItemQuantity === 0) {
                      deleteItemHandler(
                        selectedEditItem,
                        selectedEditItemIndex
                      );

                      setIsEditQuantity(false);
                    } else {
                      onEditedQuantity();
                    }
                  }}
                >
                  Edit
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* <-------------------------------This is discount item modal for edit item --------------------discount discount discount discount-------------------> */}

        <Modal
          isOpen={showDiscountModal}
          onClose={() => {
            setApplyOnOrder(false);
            setShowDiscountModal(false);
          }}
        >
          <KeyboardAvoidingView
            w="100%"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Modal.Content alignSelf="center" maxWidth="600px">
              <Modal.CloseButton />
              <Modal.Header>Item Discount</Modal.Header>
              <Modal.Body>
                <Flex p={3}>
                  <Text
                    fontFamily="sf-pro-text-semibold"
                    fontWeight="600"
                    fontSize={15}
                    py={2}
                  >
                    Discount type
                  </Text>
                  <Flex direction="row" justify="space-between">
                    {discountType.map((type) => {
                      let bg = useColorModeValue("light.300", "dark.300");
                      let textColor = useColorModeValue(
                        "dark.200",
                        "light.200"
                      );
                      const isActive = type.id === selectedDiscountType;
                      if (isActive) {
                        bg = useColorModeValue("primary.500", "primary.600");
                        textColor = useColorModeValue("light.200", "dark.200");
                      }

                      return (
                        <Button
                          h="100px"
                          flex={1}
                          mr={1}
                          disabled={isActive}
                          bg={bg}
                          _text={{
                            color: textColor,
                            fontFamily: "sf-pro-text-medium",
                            fontWeight: 600,
                            fontSize: 17,
                          }}
                          _pressed={{
                            bg: bg,
                          }}
                          onPress={() => {
                            setSelectedDiscountType(type.id);
                            setEnteredAmount(0);
                          }}
                        >
                          {type.name}
                        </Button>
                      );
                    })}
                  </Flex>
                  {selectedDiscountType !== 4 && (
                    <>
                      <Text
                        fontFamily="sf-pro-text-semibold"
                        fontWeight="600"
                        fontSize={15}
                        py={2}
                        mt={10}
                      >
                        Discount Amount
                      </Text>
                      <Button
                        w="100%"
                        borderRadius={0}
                        bg="transparent"
                        borderWidth={1}
                        py={4}
                        borderColor={useColorModeValue("light.400", "dark.400")}
                        _text={{
                          color: useColorModeValue("light.400", "dark.400"),
                        }}
                        _pressed={{
                          bg: useColorModeValue("light.200", "dark.200"),
                        }}
                        onPress={() => setShowCustomQuantity(true)}
                      >
                        {selectedDiscountType === 1 ||
                        selectedDiscountType === 3
                          ? `RM ${enteredAmount.toFixed(2)}`
                          : `${enteredAmount}%`}
                      </Button>
                    </>
                  )}

                  <Text
                    fontFamily="sf-pro-text-semibold"
                    fontWeight="600"
                    fontSize={15}
                    py={2}
                    mt={10}
                  >
                    Reference
                  </Text>

                  <TextArea
                    h={24}
                    value={enteredReference}
                    onChange={onReferenceChange}
                    placeholder="Enter reference here..."
                    w="100%"
                  />
                </Flex>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    size="lg"
                    onPress={() => {
                      setShowDiscountModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    onPress={applyOnOrder ? onDiscountOrder : onApplyDiscount}
                  >
                    Apply
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </KeyboardAvoidingView>
        </Modal>
        {/* <-------------- Custom Quantity Modal when --> */}
        <NumberPadInput
          isOpen={showCustomQuantity}
          onClose={() => setShowCustomQuantity(false)}
          headerTitle={`Discount Amount`}
          getInput={onSelectAmount}
          isDecimal={selectedDiscountType === 1 || selectedDiscountType === 3}
          maximumInputLength={selectedDiscountType === 2 ? 4 : 8}
        />
      </Stack>

      <PasscodeVerification
        isOpen={togglePasscode}
        onClose={closePasscode}
        submitHandler={submitHandler}
        w="100%"
        top="0"
        right="0"
        bottom="0"
        h="100%"
      />

      {/* <------------------------------- This is cart for mobile -------------------------------------------> */}
      <SlideFromRight
        isOpen={openCart}
        w={{ base: "100%", md: "0%" }}
        right="0"
        h="100%"
      >
        <VStack h="100%" bg={useColorModeValue("light.100", "muted.800")}>
          <View w="100%" flex={14} px={3}>
            <Flex direction="row" justify="space-between" align="center" py={2}>
              <Heading
                size="md"
                fontFamily="sf-pro-text-bold"
                fontWeight="600"
                fontSize={17}
              >
                Current Order
              </Heading>
              <IconButton
                icon={<Icon as={AntDesign} name="close" size="sm" />}
                onPress={() => setOpenCart(false)}
              />
            </Flex>
            <FlatList
              keyExtractor={(item, index) => item.name + index}
              data={cartItem}
              renderItem={({ item, index }) => (
                <CartListItem
                  item={item}
                  index={index}
                  deleteItemHandler={deleteItemHandler}
                  editItemHandler={editItemHandler}
                  discountItemHandler={discountItemHandler}
                />
              )}
            />
          </View>
          <OrderDetailComponent
            setOpenSelectionModal={setOpenSelectionModal}
            setIsConfirm={setIsConfirm}
            cartItem={cartItem}
            order={orderDetail}
            fixedCartItem={fixedCartItem}
            onSubmitOrder={onSubmitOrder}
          />
        </VStack>
      </SlideFromRight>

      {/* <------------------------------ This is addon page to add addon ---------- --------------------------------> */}
      <SlideFromRight
        isOpen={openAddon}
        h="100%"
        w={{ base: "100%", lg: "30%" }}
        right="0 "
      >
        <VStack
          h="100%"
          bg={useColorModeValue("light.100", "muted.800")}
          py={5}
          px={2}
        >
          <Pressable bg="transparent" onPress={onCloseModalHandler}>
            <Flex direction="row" align="center">
              <Icon
                color="primary.500"
                as={Entypo}
                name="chevron-left"
                size="xs"
              />
              <Text color="primary.500">Cancel</Text>
            </Flex>
          </Pressable>

          <HStack pt={4}>
            <Image
              size="md"
              resizeMode={"cover"}
              borderRadius="md"
              mr="10px"
              bg={useColorModeValue("dark.500:alpha.20", "dark.300:alpha.20")}
              source={{
                uri: selectedItem.image?.url,
              }}
              fallbackSource={require("./../assets/fallback-img.jpg")}
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
          <View pt={3} flex={1}>
            {selectedItem?.addons?.length > 0 && (
              <FlatList
                data={selectedItemAddon}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                  return (
                    <>
                      <Text
                        py="3"
                        fontFamily="sf-pro-text-semibold"
                        fontSize="15"
                      >
                        {item.name}
                      </Text>
                      {parseInt(item.type) === 1 && (
                        <>
                          <Checkbox.Group
                            onChange={(nextValue) =>
                              onCheckChange(item.name, nextValue)
                            }
                            value={addonCheckboxForm}
                            accessibilityLabel="choose addon"
                          >
                            {item.data.map((addon) => {
                              return (
                                <Checkbox
                                  key={addon.id}
                                  value={addon.id}
                                  my={2}
                                  size="md"
                                >
                                  <Text
                                    px={2}
                                    fontFamily="sf-pro-text-regular"
                                    fontSize="13"
                                  >
                                    {addon.name} RM{addon.price}
                                  </Text>
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
                        </>
                      )}
                      {parseInt(item.type) === 2 && (
                        <Radio.Group
                          name={item.name}
                          accessibilityLabel={item.name}
                          value={addonForm[item.name].id}
                          onChange={(nextValue) =>
                            onRadioChange(item.name, nextValue)
                          }
                        >
                          {item.data.map((addon) => {
                            return (
                              <Radio
                                key={addon.id}
                                value={addon.id}
                                my={1.5}
                                size="lg"
                              >
                                <Text
                                  px={2}
                                  fontFamily="sf-pro-text-regular"
                                  fontSize="13"
                                >
                                  {addon.name}
                                  {parseFloat(addon.price) > 0
                                    ? ` RM ${addon.price}`
                                    : ""}
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
            )}
            <HStack py={2}>
              <Button
                flex={1}
                colorScheme="red"
                leftIcon={
                  selectedItemQuantity === 0 ? (
                    <Icon as={Entypo} name="trash" size="xs" />
                  ) : (
                    <Icon as={Entypo} name="minus" size="xs" />
                  )
                }
                onPress={() => {
                  if (selectedItemQuantity === 0) {
                    onCloseModalHandler();
                  } else {
                    setSelectedItemQuantity((prevState) => {
                      if (prevState > 0) {
                        return prevState - 1;
                      }
                      return prevState;
                    });
                  }
                }}
              ></Button>
              <Text flex={1} alignSelf="center" textAlign="center">
                {selectedItemQuantity}
              </Text>
              <Button
                flex={1}
                colorScheme="green"
                py={3}
                leftIcon={<Icon as={Entypo} name="plus" size="xs" />}
                onPress={() =>
                  setSelectedItemQuantity((prevState) => prevState + 1)
                }
              ></Button>
            </HStack>
            <PrimaryButton
              mt="auto"
              mb={1}
              align="flex-end"
              p={3}
              onPress={onAddAddon}
              disabled={selectedItemQuantity === 0}
            >
              Add
            </PrimaryButton>
          </View>
        </VStack>
      </SlideFromRight>
    </>
  );
};

interface CartListItemProps {
  item: any;
  index: number;
  editItemHandler: Function;
  discountItemHandler: Function;
  deleteItemHandler: Function;
}

const CartListItem = ({
  item,
  index,
  editItemHandler,
  discountItemHandler,
  deleteItemHandler,
}: CartListItemProps) => {
  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation,
    onPressFunction: Function,
    item: ItemDataType,
    index: number
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      onPressFunction(item, index);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
          onPress={pressHandler}
        >
          <Icon color={color} as={Ionicons} size="sm" name={text} />
        </RectButton>
      </Animated.View>
    );
  };
  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      overshootRight={false}
      rightThreshold={30}
      renderRightActions={(
        progress: Animated.AnimatedInterpolation,
        _dragAnimatedValue: Animated.AnimatedInterpolation
      ) => (
        <Flex w={item.orderStatus === 1 ? "54%" : "18%"} direction="row">
          {item.orderStatus === 1 &&
            renderRightAction(
              "ios-pencil",
              "success.700",
              192,
              progress,
              editItemHandler,
              item,
              index
            )}
          {renderRightAction(
            "pricetags-outline",
            "amber.700",
            128,
            progress,
            discountItemHandler,
            item,
            index
          )}
          {item.orderStatus === 1 &&
            renderRightAction(
              "trash",
              "red.600",
              64,
              progress,
              deleteItemHandler,
              item,
              index
            )}
        </Flex>
      )}
    >
      <Pressable>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Flex
              w="100%"
              py={1}
              bg={isPressed || isHovered ? "dark.100:alpha.30" : "transparent"}
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
                  fallbackSource={require("./../assets/fallback-img.jpg")}
                  alt="Alternate Text"
                />
                <VStack>
                  <Text
                    color={
                      item.orderStatus === 1
                        ? useColorModeValue("red.400", "red.500")
                        : useColorModeValue("dark.100", "light.100")
                    }
                    fontFamily="sf-pro-text-semibold"
                    fontWeight="400"
                    fontSize={15}
                    isTruncated
                    noOfLines={2}
                    maxW={{ base: "150", md: "120" }}
                  >
                    {item.id}. {item.name}
                  </Text>
                  <Text
                    color={
                      item.orderStatus === 1
                        ? useColorModeValue("red.400", "red.500")
                        : useColorModeValue("dark.100", "light.100")
                    }
                    fontFamily="sf-pro-text-regular"
                    fontWeight="400"
                    fontSize={{ base: 14, md: 12 }}
                    isTruncated
                    noOfLines={2}
                    maxW={{ base: "150", md: "120" }}
                  >
                    {item.addons?.length > 0 &&
                      item.addons.map((addon, index) => {
                        if (index + 1 === item.addons?.length) {
                          return `${addon.name}`;
                        } else {
                          return `${addon.name}, `;
                        }
                      })}
                  </Text>
                </VStack>
              </HStack>
              <View flex={2} pr={2}>
                <Text
                  color={
                    item.discountType && item.discountAmount !== 0
                      ? useColorModeValue("green.400", "green.500")
                      : item.orderStatus === 1
                      ? useColorModeValue("red.400", "red.500")
                      : useColorModeValue("dark.100", "light.100")
                  }
                  textAlign="right"
                >
                  {item.discountType && item.discountType === 1
                    ? `RM ${(
                        item.calculatedPrice - item.discountAmount
                      ).toFixed(2)} x ${item.quantity}`
                    : item.discountType && item.discountType === 2
                    ? `RM  ${(
                        (item.calculatedPrice * (100 - item.discountAmount)) /
                        100
                      ).toFixed(2)} x ${item.quantity}`
                    : item.discountType && item.discountType === 3
                    ? `RM ${item.discountAmount.toFixed(2)} x ${item.quantity}`
                    : item.discountType && item.discountType === 4
                    ? `Free x ${item.quantity}`
                    : `RM ${item.calculatedPrice.toFixed(2)} x ${
                        item.quantity
                      }`}
                </Text>
              </View>
            </Flex>
          );
        }}
      </Pressable>
    </Swipeable>
  );
};

interface OrderDetailComponentProps {
  cartItem: any;
  order: {
    subtotal: number;
    total: number;
    discountType: number;
    discountAmount: number;
    reference: string;
    tax: number;
  };
  setOpenSelectionModal: Function;
  setIsConfirm: Function;
  fixedCartItem: any[];
  onSubmitOrder: Function;
}

const OrderDetailComponent = ({
  cartItem,
  order,
  setOpenSelectionModal,
  setIsConfirm,
  fixedCartItem,
  onSubmitOrder,
}: OrderDetailComponentProps) => {
  return (
    <Flex
      justify="flex-end"
      pt={4}
      pb={{ base: 10, md: 5 }}
      mb={{ md: 5 }}
      px={3}
      borderRadius={{ base: undefined, md: "xl" }}
      bg={useColorModeValue("white", "black")}
    >
      <Flex direction="row" align="center" justify="space-between">
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          Subtotal
        </Text>
        <Text fontFamily="sf-pro-text-medium" fontWeight="500" fontSize="15px">
          RM {order.subtotal.toFixed(2)}
        </Text>
      </Flex>
      {(order.discountAmount > 0 || order.discountType === 4) && (
        <Flex direction="row" align="center" justify="space-between">
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            Discount
          </Text>
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            {order.discountType === 1
              ? `- RM ${order.discountAmount.toFixed(2)}`
              : order.discountType === 2
              ? `- RM ${(order.subtotal - order.total + order.tax).toFixed(
                  2
                )} (${order.discountAmount}%)`
              : order.discountType === 3
              ? `- RM ${(order.subtotal - order.total).toFixed(2)}`
              : "FOC"}
          </Text>
        </Flex>
      )}

      {order.tax > 0 && (
        <Flex direction="row" align="center" justify="space-between">
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            Tax
          </Text>
          <Text
            fontFamily="sf-pro-text-medium"
            fontWeight="500"
            fontSize="15px"
          >
            {order.tax.toFixed(2)}
          </Text>
        </Flex>
      )}
      <Flex direction="row" align="center" justify="space-between">
        <Text
          fontFamily="sf-pro-text-semibold"
          fontWeight="500"
          fontSize="17px"
        >
          Total
        </Text>
        <Text
          fontFamily="sf-pro-text-semibold"
          fontWeight="500"
          fontSize="17px"
        >
          RM {order.total.toFixed(2)}
        </Text>
      </Flex>

      <HStack space={2} pt={3}>
        <Button
          flex={1}
          variant="outline"
          colorScheme="warmGray"
          leftIcon={<Icon as={Entypo} name="dots-three-horizontal" size="xs" />}
          onPress={() => setOpenSelectionModal(true)}
        ></Button>
        <PrimaryButton
          flex={{ base: 11, lg: 9 }}
          disabled={cartItem.length < 1 && fixedCartItem.length < 1}
          onPress={() => {
            if (cartItem.length > 0) {
              setIsConfirm(true);
            } else if (fixedCartItem.length > 0) {
              onSubmitOrder(2);
            }
          }}
        >
          Send to Kitchen
        </PrimaryButton>
      </HStack>
    </Flex>
  );
};

export default OrderScreen;
