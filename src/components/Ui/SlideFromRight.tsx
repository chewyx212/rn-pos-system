import { PresenceTransition, View } from "native-base";
import React from "react";

const SlideFromRight = (props) => {
  return (
    <>
      {props.isOpen && (
        <View position="absolute" {...props} zIndex={99}>
          <PresenceTransition
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
      )}
    </>
  );
};

export default SlideFromRight;
