import { PresenceTransition, VStack, Text } from "native-base";
import React from "react";

const SlideFromRight = (props) => {
  return (
    <PresenceTransition
      zIndex="99"
      visible={props.isOpen}
      initial={{
        translateX: 50,
      }}
      animate={{
        translateX: 0,
        transition: {
          duration: 100,
        },
      }}
    >
      {props.children}
    </PresenceTransition>
  );
};

export default SlideFromRight;
