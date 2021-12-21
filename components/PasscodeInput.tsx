import {
  Flex,
  Image,
  Box,
  Text,
  Heading,
  Circle,
  Icon,
  HStack,
  Button,
} from "native-base";
import React, { useState } from "react";

interface PasscodeInputProps {
  title: string;
  submitHandler: Function;
  canBack: boolean;
  backFunction: Function;
}
const PasscodeInput = ({
  title,
  submitHandler,
  canBack,
  backFunction,
}: PasscodeInputProps) => {
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [thirdNumber, setThirdNumber] = useState<string>("");
  const [forthNumber, setForthNumber] = useState<string>("");
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const numberButtonHandler = (number: string) => {
    console.log(number);
    if (!firstNumber && parseInt(firstNumber) !== 0) {
      setFirstNumber(number);
    } else if (!secondNumber && parseInt(secondNumber) !== 0) {
      setSecondNumber(number);
    } else if (!thirdNumber && parseInt(thirdNumber) !== 0) {
      setThirdNumber(number);
    } else if (!forthNumber && parseInt(forthNumber) !== 0) {
      setForthNumber(number);
      onSubmitPasscode(number);
    }
  };

  const onDeleteHandler = () => {
    setFirstNumber("");
    setSecondNumber("");
    setThirdNumber("");
    setForthNumber("");
  };
  const onBackHandler = () => {
    onDeleteHandler();
    backFunction();
  };

  const onSubmitPasscode = (number: string) => {
    const passcode =
      `${firstNumber}` + `${secondNumber}` + `${thirdNumber}` + `${number}`;
    submitHandler(passcode);
    onDeleteHandler();
  };
  return (
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
      {/* <Flex
            display="none"
            flex={{ base: 0, lg: 0 }}
            align="center"
            justify="center"
            h="100%"
          >
            <Text>THis is left</Text>
          </Flex> */}
      <Flex flex={1} align="center" justify="center" h="100%">
        <Heading
          fontFamily="sf-pro-display-bold"
          color="light.50"
          fontSize={22}
        >
          {title}
        </Heading>
        <Flex
          py={6}
          direction="row"
          justify="space-between"
          w="100%"
          maxW="140px"
          align="center"
        >
          {firstNumber || parseInt(firstNumber) === 0 ? (
            <Circle size={4} bg="light.100" />
          ) : (
            <Circle
              size={4}
              bg="transparent"
              borderColor="light.100"
              borderWidth={1}
            />
          )}
          {secondNumber || parseInt(secondNumber) === 0 ? (
            <Circle size={4} bg="light.100" />
          ) : (
            <Circle
              size={4}
              bg="transparent"
              borderColor="light.100"
              borderWidth={1}
            />
          )}
          {thirdNumber || parseInt(thirdNumber) === 0 ? (
            <Circle size={4} bg="light.100" />
          ) : (
            <Circle
              size={4}
              bg="transparent"
              borderColor="light.100"
              borderWidth={1}
            />
          )}
          {forthNumber || parseInt(forthNumber) === 0 ? (
            <Circle size={4} bg="light.100" />
          ) : (
            <Circle
              size={4}
              bg="transparent"
              borderColor="light.100"
              borderWidth={1}
            />
          )}
        </Flex>
        <Flex
          direction="row"
          w="100%"
          maxW="300px"
          wrap="wrap"
          justify="space-between"
          align="center"
        >
          {numberArray.map((num) => (
            <Button
              key={num}
              borderRadius={100}
              w={20}
              h={20}
              bg="light.100:alpha.20"
              _pressed={{ bg: "light.100:alpha.70" }}
              _text={{
                color: "light.100",
                fontFamily: "sf-pro-display-regular",
                fontSize: 24,
              }}
              mb={12}
              onPress={() => numberButtonHandler(`${num}`)}
            >
              {num}
            </Button>
          ))}
          <Button
            borderRadius={100}
            w={24}
            h={20}
            bg="transparent"
            _pressed={{ bg: "transparent" }}
            _text={{
              color: "light.100",
              fontFamily: "sf-pro-display-regular",
              fontSize: 20,
            }}
            mb={12}
            onPress={() => onBackHandler()}
          >
            {canBack && "BACK"}
          </Button>
          <Button
            alignSelf="center"
            borderRadius={100}
            w={20}
            h={20}
            bg="light.100:alpha.20"
            _pressed={{ bg: "light.100:alpha.70" }}
            _text={{
              color: "light.100",
              fontFamily: "sf-pro-display-regular",
              fontSize: 24,
            }}
            mb={12}
            onPress={() => numberButtonHandler(0)}
          >
            0
          </Button>
          <Button
            borderRadius={100}
            bg="transparent"
            _pressed={{ bg: "transparent" }}
            _text={{
              color: "light.100",
              fontFamily: "sf-pro-display-regular",
              fontSize: 20,
            }}
            mb={12}
            onPress={onDeleteHandler}
          >
            DELETE
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PasscodeInput;
