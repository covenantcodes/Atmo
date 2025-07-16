import React, { useEffect } from "react";
import { Text, TextStyle } from "react-native";
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
  style?: TextStyle;
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
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration]);
  const animatedProps = useAnimatedProps(() => {
    const displayValue =
      decimals > 0
        ? animatedValue.value.toFixed(decimals)
        : Math.round(animatedValue.value).toString();
    return { text: `${displayValue}${suffix}` } as any;
  });
  return <AnimatedText style={style} animatedProps={animatedProps} />;
};
export default AnimatedCounter;
