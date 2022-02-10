import {
  Text,
  Icon,
  Button,
  Flex,
  useColorModeValue,
  Modal,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

interface IProps {
  isOpen: boolean;
  onClose: Function;
  getInput: Function;
  headerTitle: string;
  isDecimal: boolean;
  maximumInputLength: number;
  maximumNumber?: number;
}

const NumberPadInput: React.FC<IProps> = ({
  isOpen,
  onClose,
  getInput,
  headerTitle,
  isDecimal,
  maximumInputLength,
  maximumNumber,
}) => {
  const [enteredValue, setEnteredValue] = useState<string>("0");
  const [enteredDecimalValue, setEnteredDecimalValue] =
    useState<String>("0.00");
  const toast = useToast();

  const onPressInput = (value: string) => {
    if (isDecimal) {
      if (enteredDecimalValue.length >= maximumInputLength + 1) {
        toast.show({
          background: "red.500",
          description: `Maximum length is ${maximumInputLength} digits.`,
          isClosable: true,
        });
      } else if (
        countDecimals(Number(enteredDecimalValue)) >= 1 ||
        Number(enteredDecimalValue) >= 1
      ) {
        setEnteredDecimalValue(
          (Number(enteredDecimalValue) * 10).toFixed(1) + `${value}`
        );
      } else {
        setEnteredDecimalValue(`0.0${value}`);
      }
    } else {
      if (enteredValue.length >= maximumInputLength) {
        toast.show({
          background: "red.500",
          description: `Maximum length is ${maximumInputLength} digits.`,
          isClosable: true,
        });
      } else if (Number(enteredValue) > 0) {
        setEnteredValue((prevValue) => (prevValue += `${value}`));
      } else {
        setEnteredValue(value);
      }
    }
  };
  const countDecimals = (value: number) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  };

  const onDeleteHandler = () => {
    setEnteredValue("0");
    setEnteredDecimalValue("0.00");
  };

  const onCloseHandler = () => {
    setEnteredValue("0");
    setEnteredDecimalValue("0.00");
    onClose();
  };

  const onSubmitHandler = () => {
    if (isDecimal) {
      if (Number(enteredDecimalValue) > 0) {
        if (maximumNumber && Number(enteredDecimalValue) > maximumNumber) {
          toast.show({
            background: "red.500",
            description: `Number cannot higher than ${maximumNumber}.`,
            isClosable: true,
          });
        } else {
          getInput(Number(enteredDecimalValue));
          onCloseHandler();
        }
      } else {
        toast.show({
          background: "red.500",
          description: `Number cannot lower than 0.`,
          isClosable: true,
        });
      }
    } else {
      if (Number(enteredValue) > 0) {
        if (maximumNumber && Number(enteredValue) > maximumNumber) {
          toast.show({
            background: "red.500",
            description: `Number cannot higher than ${maximumNumber}.`,
            isClosable: true,
          });
        } else {
          getInput(parseFloat(enteredValue));
          onCloseHandler();
        }
      } else {
        toast.show({
          background: "red.500",
          description: `Number cannot lower than 0.`,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <Modal.Content
        maxW={{ base: "320px", md: "400px" }}
        w={{ base: "320px", md: "400px" }}
      >
        <Modal.CloseButton />
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Body _scrollview={{ scrollEnabled: false }}>
          <Flex justify="center" align="center">
            <Flex
              direction="row"
              my={3}
              px={12}
              align="center"
              justify="space-between"
              w="100%"
            >
              <Flex
                width="90%"
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
                  {isDecimal ? `RM ${enteredDecimalValue}` : enteredValue}
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
                p={4}
                onPress={onDeleteHandler}
              ></Button>
            </Flex>
            {maximumInputLength < 10 && (
              <Text>Maximum length: {maximumInputLength} digits.</Text>
            )}
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
                    onPressInput((index + 1).toString());
                  }}
                  disabled={enteredValue.length >= maximumInputLength}
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
                disabled={true}
                _pressed={{
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
                onPress={() => {
                  onPressInput(".");
                }}
              >
                {/* {isDecimal ? "." : ""} */}
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
                  onPressInput("0");
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
