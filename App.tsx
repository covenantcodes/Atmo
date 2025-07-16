import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { FONTFAMILY } from "./utils/fonts";
import { getColors } from "./utils/colors";
import SplashScreenComponent from "./components/SplashScreen";

const App = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    JostThin: require("./assets/fonts/Jost-Thin.ttf"),
    JostThinItalic: require("./assets/fonts/Jost-ThinItalic.ttf"),
    JostLight: require("./assets/fonts/Jost-Light.ttf"),
    JostExtraLight: require("./assets/fonts/Jost-ExtraLight.ttf"),
    JostMedium: require("./assets/fonts/Jost-Medium.ttf"),
    JostMediumItalic: require("./assets/fonts/Jost-MediumItalic.ttf"),
    JostRegular: require("./assets/fonts/Jost-Regular.ttf"),
    JostSemiBold: require("./assets/fonts/Jost-SemiBold.ttf"),
    JostBold: require("./assets/fonts/Jost-Bold.ttf"),
    JostExtraBold: require("./assets/fonts/Jost-ExtraBold.ttf"),
    JostExtraBoldItalic: require("./assets/fonts/Jost-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return <SplashScreenComponent onFinish={() => setShowSplash(false)} />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTFAMILY.medium,
          color: colors.black,
        }}
      >
        Welcome to Atmo!
      </Text>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </View>
  );
};

export default App;
