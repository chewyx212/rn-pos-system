import { Box, PresenceTransition, View, Image, useToast } from "native-base";
import React from "react";
import PasscodeInput from "./PasscodeInput";

interface IProps {
  isOpen: boolean;
  submitHandler: Function;
  onClose: Function;
}
const PasscodeVerification = (props: IProps) => {
  const toast = useToast();
  const submitHandler = async (passcode: string) => {
    if (parseInt(passcode) === 1234) {
      props.submitHandler(true);
      onCloseHandler();
    } else {
      await toast.closeAll();
      toast.show({
        title: "Wrong passcode!",
        status: "error",
        placement: "top",
      });
    }
  };

  const onCloseHandler = async () => {
    props.onClose();
  };
  return (
    <>
      {props.isOpen && (
        <View position="absolute" {...props} zIndex={999}>
          <PresenceTransition
            visible={props.isOpen}
            initial={{
              translateY: 500,
            }}
            animate={{
              translateY: 0,
              transition: {
                duration: 200,
              },
            }}
          >
            <Box position="relative" w="100%" h="100%">
              <Image
                w="100%"
                h="100%"
                alt="bg image"
                source={require("./../assets/gradient.jpg")}
              />
              <PasscodeInput
                title={"Enter Passcode to Login"}
                submitHandler={submitHandler}
                canBack={true}
                backFunction={onCloseHandler}
              />
            </Box>
          </PresenceTransition>
        </View>
      )}
    </>
  );
};

export default PasscodeVerification;
