import { Text as NBText } from "native-base";
import React from "react";

const Text = (props) => {
  let settings = {
    fontFamily: "sf-pro-text-regular",
    fontSize: "16px",
  };

  if (props.fontFamily === "heading") {
    settings = {
      fontFamily: "sf-pro-display-regular",
      fontSize: "28px",
    };
  }
  if (props.fontFamily === "headingbold") {
    settings = {
      fontFamily: "sf-pro-display-bold",
      fontSize: "34px",
    };
  }

  if (props.fontFamily === "semi") {
    settings = {
      fontFamily: "sf-pro-text-semibold",
      fontSize: "17px",
    };
  }
  if (props.fontFamily === "small") {
    settings = {
      fontFamily: "sf-pro-text-medium",
      fontSize: "10px",
    };
  }
  if (props.fontFamily === "tertiary") {
    settings = {
      fontFamily: "sf-pro-text-bold",
      fontSize: "13px",
    };
  }
  if (props.fontFamily === "secondary") {
    settings = {
      fontFamily: "sf-pro-text-regular",
      fontSize: "15px",
    };
  }
  if (props.fontFamily === "body") {
    settings = {
      fontFamily: "sf-pro-text-regular",
      fontSize: "17px",
    };
  }

  return <NBText {...settings}>{props.children}</NBText>;
};

export default Text;
