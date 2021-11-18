import { useColorModeValue, Button } from "native-base";
import React from "react";

const SecondaryButton = (props) => {
  return (
    <Button
      bg={useColorModeValue("secondaryButton.lightBg", "secondaryButton.darkBg")}
      _text={{
        color: useColorModeValue(
          "secondaryButton.lightText",
          "secondaryButton.darkText"
        ),
      }}
      _hover={{
        _text: {
          color: useColorModeValue(
            "secondaryButton.lightPressText",
            "secondaryButton.darkPressText"
          ),
        },
        bg: useColorModeValue(
          "secondaryButton.lightPressBg",
          "secondaryButton.darkPressBg"
        ),
      }}
      _pressed={{
        _text: {
          color: useColorModeValue(
            "secondaryButton.lightPressText",
            "secondaryButton.darkPressText"
          ),
        },
        bg: useColorModeValue(
          "secondaryButton.lightPressBg",
          "secondaryButton.darkPressBg"
        ),
          }}
      leftIcon={props.icon ? props.icon : ""}
      {...props.style}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
};
export default SecondaryButton;
