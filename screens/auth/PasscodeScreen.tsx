import {
  Flex,
  Image,
  Box,
  Text,
  VStack,
  FormControl,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  View,
  KeyboardAvoidingView,
  Heading,
  Circle,
  Icon,
  HStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParams";

type Inputs = {
  email: string;
  password: string;
};
type passcodeScreenProp = StackNavigationProp<RootStackParamList, "Passcode">;
const PasscodeScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigation = useNavigation<passcodeScreenProp>();

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("Passcode");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box position="relative" w="100%" h="100%">
        <Image
          w="100%"
          h="100%"
          alt="bg image"
          source={require("./../../assets/gradient.jpg")}
        />

        <Flex
          align="center"
          justify="center"
          zIndex="99"
          direction="row"
          position="absolute"
          h="100%"
          w="100%"
          bg="dark.900:alpha.10"
        >
          <Flex flex={1} align="center" justify="center" h="100%">
            <Text>THis is left</Text>
          </Flex>
          <Flex flex={1} align="center" justify="center" h="100%">
            <Heading
              fontFamily="sf-pro-text-medium"
              color="light.50"
              fontSize={15}
            >
              Enter Passcode
            </Heading>
            <HStack>
              <Icon
                as={FontAwesome}
                name="circle-o"
                size="sm"
                color="light.50"
              />
              <Icon
                as={FontAwesome}
                name="circle-o"
                size="sm"
                color="light.50"
              />
              <Icon
                as={FontAwesome}
                name="circle-o"
                size="sm"
                color="light.50"
              />
              <Icon
                as={FontAwesome}
                name="circle-o"
                size="sm"
                color="light.50"
              />
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default PasscodeScreen;
