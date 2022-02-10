import { Text, Stack, useColorModeValue, Button, View } from "native-base";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";
const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
     const handleBarCodeScanned = ({ type, data }) => {
       setScanned(true);
       alert(`Bar code with type ${type} and data ${data} has been scanned!`);
     };

     if (hasPermission === null) {
       return <Text>Requesting for camera permission</Text>;
     }
     if (hasPermission === false) {
       return <Text>No access to camera</Text>;
     }

  return (
    <Stack h="100%" bg={useColorModeValue("muted.100", "muted.800")}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
      )}
    </Stack>
  );
};

export default CameraScreen;
