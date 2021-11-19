import { Text as NBText } from 'native-base'
import React from 'react'

const Text = (props) => {
    return (
      <NBText
        fontFamily="sf-pro-display-regular"
        fontWeight="normal"
        fontStyle="normal"
        {...props}
      >
        {props.children}
      </NBText>
    );
}

export default Text