import React, { useEffect } from "react";
import Svg, { Circle, Line, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const AnimatedG = Animated.createAnimatedComponent(G);

interface SunnyIconProps {
  size?: number;
  color?: string;
}

const SunnyIcon: React.FC<SunnyIconProps> = ({
  size = 80,
  color = "#FFD700",
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 8000 }), -1, false);
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const center = size / 2;
  const sunRadius = size * 0.25;
  const rayLength = size * 0.15;
  const rayDistance = sunRadius + size * 0.1;

  // Generate sun rays
  const rays = Array.from({ length: 8 }, (_, index) => {
    const angle = index * 45 * (Math.PI / 180);
    const x1 = center + Math.cos(angle) * rayDistance;
    const y1 = center + Math.sin(angle) * rayDistance;
    const x2 = center + Math.cos(angle) * (rayDistance + rayLength);
    const y2 = center + Math.sin(angle) * (rayDistance + rayLength);

    return (
      <Line
        key={index}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  });

  return (
    <Svg width={size} height={size}>
      {/* Sun center */}
      <Circle cx={center} cy={center} r={sunRadius} fill={color} />

      {/* Animated rays */}
      <AnimatedG animatedProps={animatedProps}>{rays}</AnimatedG>
    </Svg>
  );
};

export default SunnyIcon;
