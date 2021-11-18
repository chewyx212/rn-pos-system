import {
  useColorModeValue,
  Button,
} from "native-base";
import React from "react";

const PrimaryButton = (props) => {
    return (<Button
        bg={useColorModeValue(
            "primaryButton.lightBg",
            "primaryButton.darkBg"
        )}
        _text={{
            color: useColorModeValue(
                "primaryButton.lightText",
                "primaryButton.darkText"
            ),
        }}
        _hover={{
            _text: {
                color: useColorModeValue(
                    "primaryButton.lightPressText",
                    "primaryButton.darkPressText"
                ),
            },
            bg: useColorModeValue(
                "primaryButton.lightPressBg",
                "primaryButton.darkPressBg"
            ),
        }}
        _pressed={{
            _text: {
                color: useColorModeValue(
                    "primaryButton.lightPressText",
                    "primaryButton.darkPressText"
                ),
            },
            bg: useColorModeValue(
                "primaryButton.lightPressBg",
                "primaryButton.darkPressBg"
            ),
        }}
        {...props.style}
        onPress={props.onPress}
    >
        {props.children}
    </Button>)
}
export default PrimaryButton
    
