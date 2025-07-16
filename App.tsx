import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { FONTFAMILY } from "./utils/fonts";
import { getColors } from "./utils/colors";
import SplashScreenComponent from "./components/SplashScreen";
import * as SplashScreen from "expo-splash-screen";
import MainApp from "./navigation/MainApp";

const App = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

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

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const prepare = async () => {
      try {
        if (fontsLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          await SplashScreen.hideAsync();
          setIsAppReady(true);
        }
      } catch (e) {
        console.warn(e);
        await SplashScreen.hideAsync();
        setIsAppReady(true);
      }
    };

    prepare();
  }, [fontsLoaded]);

  const handleCustomSplashFinish = () => {
    setShowCustomSplash(false);
  };

  if (!fontsLoaded || !isAppReady) {
    return null;
  }

  if (showCustomSplash) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreenComponent onFinish={handleCustomSplashFinish} />
      </>
    );
  }

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <MainApp />
    </>
  );
};

export default App;
