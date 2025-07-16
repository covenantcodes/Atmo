import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { getColors } from "../utils/colors";
import AtmoLogo from "./AtmoLogo";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.3);
  const gradientOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  // Gradient animation values
  const gradientPosition = useSharedValue(0);

  useEffect(() => {
    // Start animations sequence
    const startAnimations = () => {
      // Gradient fade in
      gradientOpacity.value = withTiming(1, { duration: 800 });

      // Gradient position animation (continuous)
      gradientPosition.value = withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      );

      // Logo animations
      logoOpacity.value = withDelay(400, withTiming(1, { duration: 1000 }));

      logoScale.value = withDelay(
        400,
        withSequence(
          withSpring(1.1, { damping: 8, stiffness: 100 }),
          withSpring(1, { damping: 12, stiffness: 150 })
        )
      );

      // Exit animation after 3 seconds
      setTimeout(() => {
        containerOpacity.value = withTiming(0, { duration: 500 }, () =>
          runOnJS(onFinish)()
        );
      }, 4000);
    };

    startAnimations();
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  const gradientAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: gradientOpacity.value,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  const gradientColors =
    colorScheme === "dark"
      ? ([colors.primaryColor, colors.secondaryColor, colors.deepBlue] as const)
      : ([
          colors.primaryBg,
          colors.primaryColor,
          colors.secondaryColor,
        ] as const);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.View style={[styles.gradientContainer, gradientAnimatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <AtmoLogo
          size={120}
          color={colorScheme === "dark" ? colors.black : colors.white}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  gradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
