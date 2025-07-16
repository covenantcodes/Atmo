import React, { useEffect } from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(Text);

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  style?: TextStyle | TextStyle[];
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  suffix = "",
  style,
  decimals = 0,
}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    console.log("📊 AnimatedCounter received value:", value);
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration]);

  // Use useDerivedValue for better performance and reliability
  const text = useDerivedValue(() => {
    const displayValue =
      decimals > 0
        ? animatedValue.value.toFixed(decimals)
        : Math.round(animatedValue.value).toString();

    const result = `${displayValue}${suffix}`;
    console.log("🔢 AnimatedCounter text value:", result);
    return result;
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      defaultValue: text.value,
    } as any;
  });

  // Flatten the style array to a single TextStyle object
  const flattenedStyle = StyleSheet.flatten(style);

  return (
    <AnimatedText style={flattenedStyle} animatedProps={animatedProps}>
      {/* Fallback text for initial render */}
      {value
        ? (decimals > 0
            ? value.toFixed(decimals)
            : Math.round(value).toString()) + suffix
        : "0" + suffix}
    </AnimatedText>
  );
};

export default AnimatedCounter;
