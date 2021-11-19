import { PresenceTransition, View } from "native-base";
import React from "react";

const SlideFromRight = (props) => {
  return (
    <View position="absolute" w="100%" h="100%" {...props}>
      <PresenceTransition
        zIndex="99"
        visible={props.isOpen}
        initial={{
          translateX: 500,
        }}
        animate={{
          translateX: 0,
          transition: {
            duration: 200,
          },
        }}
      >
        {props.children}
      </PresenceTransition>
    </View>
  );
};

export default SlideFromRight;
