import React, { useEffect } from "react";
import Svg, { Path, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface WindyIconProps {
  size?: number;
  leafColor?: string;
  windColor?: string;
}

const WindyIcon: React.FC<WindyIconProps> = ({
  size = 80,
  leafColor = "#228B22",
  windColor = "#87CEEB",
}) => {
  const leafPosition = useSharedValue(0);
  const leafRotation = useSharedValue(0);
  const windOpacity = useSharedValue(0.3);

  useEffect(() => {
    // Leaf drifting animation
    leafPosition.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    );

    // Leaf rotation
    leafRotation.value = withRepeat(
      withTiming(360, { duration: 4000 }),
      -1,
      false
    );

    // Wind lines opacity
    windOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      false
    );
  }, []);

  const leafAnimatedProps = useAnimatedProps(() => {
    const translateX = interpolate(
      leafPosition.value,
      [0, 0.5, 1],
      [0, size * 0.2, size * 0.4]
    );

    const translateY = interpolate(
      leafPosition.value,
      [0, 0.5, 1],
      [0, -size * 0.1, size * 0.2]
    );

    return {
      transform: [
        { translateX },
        { translateY },
        { rotate: `${leafRotation.value}deg` },
      ],
    };
  });

  const windAnimatedProps = useAnimatedProps(() => ({
    opacity: windOpacity.value,
  }));

  const leafPath = `M ${size * 0.3} ${size * 0.5} 
                   Q ${size * 0.4} ${size * 0.3} ${size * 0.5} ${size * 0.5} 
                   Q ${size * 0.4} ${size * 0.7} ${size * 0.3} ${size * 0.5}`;

  return (
    <Svg width={size} height={size}>
      {/* Wind lines */}
      <AnimatedLine
        x1={size * 0.1}
        y1={size * 0.3}
        x2={size * 0.6}
        y2={size * 0.3}
        stroke={windColor}
        strokeWidth="3"
        strokeLinecap="round"
        animatedProps={windAnimatedProps}
      />

      <AnimatedLine
        x1={size * 0.15}
        y1={size * 0.5}
        x2={size * 0.7}
        y2={size * 0.5}
        stroke={windColor}
        strokeWidth="2"
        strokeLinecap="round"
        animatedProps={windAnimatedProps}
      />

      <AnimatedLine
        x1={size * 0.1}
        y1={size * 0.7}
        x2={size * 0.55}
        y2={size * 0.7}
        stroke={windColor}
        strokeWidth="3"
        strokeLinecap="round"
        animatedProps={windAnimatedProps}
      />

      {/* Drifting leaf */}
      <AnimatedPath
        d={leafPath}
        fill={leafColor}
        stroke={leafColor}
        strokeWidth="1"
        animatedProps={leafAnimatedProps}
      />

      {/* Leaf vein */}
      <AnimatedPath
        d={`M ${size * 0.3} ${size * 0.5} L ${size * 0.5} ${size * 0.5}`}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        animatedProps={leafAnimatedProps}
      />
    </Svg>
  );
};

export default WindyIcon;
