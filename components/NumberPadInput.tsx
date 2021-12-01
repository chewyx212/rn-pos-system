import {
  HStack,
  VStack,
  Center,
  Text,
  Box,
  Stack,
  useDisclose,
  Icon,
  Button,
  Flex,
  useColorModeValue,
  Modal,
  Heading,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Platform } from "react-native";

const NumberPadInput = ({
  isOpen,
  onClose,
  getInput,
  headerTitle,
  isDecimal,
  maximumInputLength,
}) => {
  const [enteredValue, setEnteredValue] = useState<string>("0");
  const toast = useToast();
  const onPressInput = (value) => {
      if (enteredValue.length >= maximumInputLength) {
        toast.show({
          background: "red.500",
          description: `Maximum length is ${maximumInputLength} digits.`,
        });
    } else if (parseFloat(enteredValue) > 0) {
      setEnteredValue((prevValue) => (prevValue += `${value}`));
    } else {
      console.log(parseFloat(enteredValue));
      setEnteredValue(value);
    }
  };

  const onDeleteHandler = () => {
    setEnteredValue("0");
  };

  const onCloseHandler = () => {
    setEnteredValue("0");
    onClose();
  };

  const onSubmitHandler = () => {
    if (parseFloat(enteredValue) > 0) {
        getInput(enteredValue);
        onCloseHandler();
    } else {
      toast.show({
        background: "red.500",
        description: `Number cannot lower than 0.`,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <Modal.Content
        maxW={{ base: "300px", md: "400px" }}
        w={{ base: "300px", md: "400px" }}
      >
        <Modal.CloseButton />
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Body>
          <Flex justify="center" align="center">
            <Flex
              direction="row"
              my={3}
              px={16}
              align="center"
              justify="space-between"
              w="100%"
            >
              <Flex
                width="80%"
                borderColor="pink.400"
                borderBottomWidth={1}
                mr={3}
              >
                <Text
                  color="dark.100"
                  textAlign="center"
                  fontFamily="sf-pro-display-regular"
                  fontSize={22}
                  pb={2}
                >
                  {enteredValue}
                </Text>
              </Flex>

              <Button
                width="20%"
                variant="ghost"
                colorScheme="warmGray"
                _text={{
                  fontFamily: "sf-pro-text-medium",
                  fontSize: "15px",
                }}
                leftIcon={<Icon as={Feather} name="delete" size="sm" />}
                onPress={onDeleteHandler}
              ></Button>
            </Flex>
            <Flex direction="row" justify="center" w="100%" wrap="wrap">
              {[...Array(9)].map((elementInArray, index) => (
                <Button
                  key={index + 1}
                  bg="transparent"
                  flexBasis="33%"
                  h={20}
                  _text={{
                    color: "light.500",
                    fontFamily: "sf-pro-display-regular",
                    fontSize: 24,
                  }}
                  _pressed={{
                    bg: useColorModeValue("light.200", "dark.200"),
                  }}
                  onPress={() => {
                    onPressInput(index + 1);
                  }}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                bg="transparent"
                flexBasis="33%"
                h={20}
                _text={{
                  color: "light.500",
                  fontFamily: "sf-pro-display-regular",
                  fontSize: 24,
                }}
                disabled={!isDecimal}
                _pressed={{
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
                onPress={() => {
                  onPressInput(".");
                }}
              >
                {isDecimal ? "." : ""}
              </Button>
              <Button
                bg="transparent"
                flexBasis="33%"
                h={20}
                _text={{
                  color: "light.500",
                  fontFamily: "sf-pro-display-regular",
                  fontSize: 24,
                }}
                _pressed={{
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
                onPress={() => {
                  onPressInput(0);
                }}
              >
                0
              </Button>
              <Button
                bg="transparent"
                flexBasis="33%"
                h={20}
                _text={{
                  color: "light.500",
                  fontFamily: "sf-pro-display-regular",
                  fontSize: 24,
                }}
                _pressed={{
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
                onPress={onSubmitHandler}
              >
                Enter
              </Button>
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default NumberPadInput;
