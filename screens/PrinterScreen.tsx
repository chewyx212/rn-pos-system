import React, { useState } from "react";
import { Flex, View, Button, Text } from "native-base";
import { Platform } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

const PrinterScreen = () => {
  const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <Flex justify="center" p={8}>
      <Button onPress={print}>Print</Button>
      <View h={8} />
      <Button onPress={printToFile}>Print to PDF file</Button>
      {Platform.OS === "ios" && (
        <>
          <View h={8} />
          <Button onPress={selectPrinter}>Select printer</Button>
          <View h={8} />
          {selectedPrinter ? (
            <Text textAlign="center">{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </Flex>
  );
};

export default PrinterScreen;
