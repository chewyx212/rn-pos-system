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
} from "native-base";
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
type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;
const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigation = useNavigation<loginScreenProp>();

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
          source={require("./../../assets/table.jpg")}
        />

        <Flex
          align="center"
          justify="center"
          zIndex="99"
          position="absolute"
          h="100%"
          w="100%"
          bg="dark.50:alpha.80"
        >
          <Flex
            align="center"
            justify="center"
            h="100%"
            w={{ base: "300px", md: "450px" }}
          >
            <Image
              w="80%"
              maxH="10%"
              mb="25%"
              resizeMode="contain"
              alt="menuworlds"
              source={require("./../../assets/menuworlds.png")}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    InputLeftElement={
                      <Flex justify="center" align="center" w="40%">
                        <Text
                          bg="dark.100"
                          color="dark.800"
                          fontFamily="sf-pro-text-medium"
                          fontSize="15px"
                        >
                          Email
                        </Text>
                      </Flex>
                    }
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    pl={5}
                    my={errors.email ? 4 : 2}
                    mt={2}
                    h={16}
                    bg="dark.100"
                    type="email"
                    color="dark.800"
                    fontFamily="sf-pro-text-regular"
                    fontSize="15px"
                    placeholder="email@email.com"
                    borderWidth={0.5}
                    borderColor="dark.200"
                    _focus={{
                      borderWidth: 0.5,
                      borderColor: "dark.200",
                    }}
                    isInvalid={errors.email}
                  />

                  {/* {errors.email && (
                    <Text color="red.500">This is required.</Text>
                  )} */}
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    InputLeftElement={
                      <Flex justify="center" align="center" w="40%">
                        <Text
                          bg="dark.100"
                          color="dark.800"
                          fontFamily="sf-pro-text-medium"
                          fontSize="15px"
                        >
                          Password
                        </Text>
                      </Flex>
                    }
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    pl={5}
                    my={errors.email ? 4 : 2}
                    mt={2}
                    h={16}
                    bg="dark.100"
                    type="password"
                    color="dark.800"
                    fontFamily="sf-pro-text-regular"
                    fontSize="15px"
                    placeholder="required"
                    borderWidth={0.5}
                    borderColor="dark.200"
                    _focus={{
                      borderWidth: 0.5,
                      borderColor: "dark.200",
                    }}
                    isInvalid={errors.password ? true : false}
                  />
                  {/* {errors.password && (
                    <Text color="red.500">This is required.</Text>
                  )} */}
                </>
              )}
              name="password"
            />
            <Button
              w="100%"
              mt={5}
              h={12}
              _text={{
                color: "dark.800",
                fontFamily: "sf-pro-text-medium",
                fontSize: "17px",
              }}
              onPress={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
