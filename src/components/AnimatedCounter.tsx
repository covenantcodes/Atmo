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
    // console.log("📊 AnimatedCounter received value:", value);
    if (value !== undefined && value !== null) {
      animatedValue.value = withTiming(value, { duration });
    }
  }, [value, duration]);

  const text = useDerivedValue(() => {
    const currentValue = animatedValue.value;
    const displayValue =
      decimals > 0
        ? currentValue.toFixed(decimals)
        : Math.round(currentValue).toString();

    return `${displayValue}${suffix}`;
  }, [decimals, suffix]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    } as any;
  });

  const flattenedStyle = StyleSheet.flatten(style);

  // Fallback display value
  const fallbackValue =
    value !== undefined && value !== null
      ? (decimals > 0
          ? value.toFixed(decimals)
          : Math.round(value).toString()) + suffix
      : "0" + suffix;

  return (
    <AnimatedText style={flattenedStyle} animatedProps={animatedProps}>
      {fallbackValue}
    </AnimatedText>
  );
};

export default AnimatedCounter;
