import React, { useEffect } from "react";
import Svg, { Path, Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AtmoLogoProps {
  size?: number;
  color?: string;
}

const AtmoLogo: React.FC<AtmoLogoProps> = ({
  size = 100,
  color = "#22A37C",
}) => {
  const pathProgress = useSharedValue(0);
  const circleProgress = useSharedValue(0);

  useEffect(() => {
    pathProgress.value = withDelay(
      300,
      withTiming(1, {
        duration: 2500,
        easing: Easing.out(Easing.cubic),
      })
    );

    circleProgress.value = withDelay(
      1200,
      withTiming(1, {
        duration: 1200,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, []);

  const animatedPathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: 200 * (1 - pathProgress.value),
    };
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: 60 * (1 - circleProgress.value),
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Letter A */}
      <AnimatedPath
        d="M20 80 L30 50 L40 80 M25 65 L35 65"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        animatedProps={animatedPathProps}
      />

      {/* Letter T */}
      <AnimatedPath
        d="M45 50 L55 50 M50 50 L50 80"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        animatedProps={animatedPathProps}
      />

      {/* Letter M */}
      <AnimatedPath
        d="M60 80 L60 50 L70 65 L80 50 L80 80"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        animatedProps={animatedPathProps}
      />

      {/* Decorative circle */}
      <AnimatedCircle
        cx="50"
        cy="30"
        r="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="60"
        animatedProps={animatedCircleProps}
      />

      {/* Letter O in circle */}
      <AnimatedPath
        d="M45 30 A5 5 0 1 1 55 30 A5 5 0 1 1 45 30"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="200"
        animatedProps={animatedPathProps}
      />
    </Svg>
  );
};

export default AtmoLogo;
