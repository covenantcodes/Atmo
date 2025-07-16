import React, { useEffect } from "react";
import Svg, { Line, Ellipse } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);

interface RainyIconProps {
  size?: number;
  cloudColor?: string;
  rainColor?: string;
}

const RainyIcon: React.FC<RainyIconProps> = ({
  size = 80,
  cloudColor = "#87CEEB",
  rainColor = "#4169E1",
}) => {
  const rainDrop1 = useSharedValue(0);
  const rainDrop2 = useSharedValue(0);
  const rainDrop3 = useSharedValue(0);
  const rainDrop4 = useSharedValue(0);

  useEffect(() => {
    // Stagger rain drops for realistic effect
    rainDrop1.value = withRepeat(
      withTiming(size * 0.4, { duration: 800 }),
      -1,
      false
    );

    rainDrop2.value = withDelay(
      200,
      withRepeat(withTiming(size * 0.4, { duration: 800 }), -1, false)
    );

    rainDrop3.value = withDelay(
      400,
      withRepeat(withTiming(size * 0.4, { duration: 800 }), -1, false)
    );

    rainDrop4.value = withDelay(
      600,
      withRepeat(withTiming(size * 0.4, { duration: 800 }), -1, false)
    );
  }, []);

  const createRainDropProps = (translateY: Animated.SharedValue<number>) => {
    return useAnimatedProps(() => ({
      transform: [{ translateY: translateY.value }],
    }));
  };

  const cloudY = size * 0.2;
  const rainStartY = size * 0.45;

  return (
    <Svg width={size} height={size}>
      {/* Cloud */}
      <Ellipse
        cx={size * 0.3}
        cy={cloudY}
        rx={size * 0.15}
        ry={size * 0.1}
        fill={cloudColor}
      />
      <Ellipse
        cx={size * 0.5}
        cy={cloudY - size * 0.05}
        rx={size * 0.2}
        ry={size * 0.12}
        fill={cloudColor}
      />
      <Ellipse
        cx={size * 0.7}
        cy={cloudY}
        rx={size * 0.15}
        ry={size * 0.1}
        fill={cloudColor}
      />

      {/* Animated rain drops */}
      <AnimatedLine
        x1={size * 0.25}
        y1={rainStartY}
        x2={size * 0.22}
        y2={rainStartY + size * 0.15}
        stroke={rainColor}
        strokeWidth="2"
        strokeLinecap="round"
        animatedProps={createRainDropProps(rainDrop1)}
      />

      <AnimatedLine
        x1={size * 0.45}
        y1={rainStartY}
        x2={size * 0.42}
        y2={rainStartY + size * 0.15}
        stroke={rainColor}
        strokeWidth="2"
        strokeLinecap="round"
        animatedProps={createRainDropProps(rainDrop2)}
      />

      <AnimatedLine
        x1={size * 0.65}
        y1={rainStartY}
        x2={size * 0.62}
        y2={rainStartY + size * 0.15}
        stroke={rainColor}
        strokeWidth="2"
        strokeLinecap="round"
        animatedProps={createRainDropProps(rainDrop3)}
      />

      <AnimatedLine
        x1={size * 0.35}
        y1={rainStartY + size * 0.05}
        x2={size * 0.32}
        y2={rainStartY + size * 0.2}
        stroke={rainColor}
        strokeWidth="2"
        strokeLinecap="round"
        animatedProps={createRainDropProps(rainDrop4)}
      />
    </Svg>
  );
};

export default RainyIcon;
