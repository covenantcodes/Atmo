import * as React from "react";
import { useEffect } from "react";
import Svg, {
  G,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  ClipPath,
  Rect,
  SvgProps,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withDelay,
  interpolate,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SunnyIconProps extends SvgProps {
  size?: number;
}

const SunnyIcon = ({ size = 80, ...props }: SunnyIconProps) => {
  // Animation values for each ray
  const ray1Progress = useSharedValue(0);
  const ray2Progress = useSharedValue(0);
  const ray3Progress = useSharedValue(0);
  const ray4Progress = useSharedValue(0);
  const ray5Progress = useSharedValue(0);
  const ray6Progress = useSharedValue(0);
  const ray7Progress = useSharedValue(0);
  const ray8Progress = useSharedValue(0);

  useEffect(() => {
    const animateRay = (
      rayValue: Animated.SharedValue<number>,
      delay: number
    ) => {
      rayValue.value = withDelay(
        delay,
        withRepeat(withTiming(1, { duration: 2200 }), -1, true)
      );
    };

    // Stagger the animations for each ray
    animateRay(ray1Progress, 0); // 12 o'clock
    animateRay(ray2Progress, 200); // 1:30
    animateRay(ray3Progress, 400); // 3
    animateRay(ray4Progress, 600); // 4:30
    animateRay(ray5Progress, 200); // 6
    animateRay(ray6Progress, 400); // 7:30
    animateRay(ray7Progress, 600); // 9
    animateRay(ray8Progress, 800); // 10:30
  }, []);

  const createRayAnimatedProps = (progress: Animated.SharedValue<number>) => {
    return useAnimatedProps(() => {
      const scale = interpolate(
        progress.value,
        [0, 0.5, 1],
        [0.95, 1.05, 0.95]
      );
      const opacity = interpolate(progress.value, [0, 0.5, 1], [0.8, 1, 0.8]);

      return {
        opacity,
        transform: [{ scale }],
      };
    });
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" {...props}>
      <G clipPath="url(#clip0_244_1500)">
        {/* Sun center */}
        <Path
          d="M32 14C41.9411 14 50 22.0589 50 32C50 41.9411 41.9411 50 32 50C22.0589 50 14 41.9411 14 32C14 22.0589 22.0589 14 32 14Z"
          fill="url(#paint0_radial_244_1500)"
        />

        {/* Individual animated rays */}
        {/* Top ray */}
        <AnimatedPath
          d="M32 2C33.6569 2 35 3.34316 35 5V8C35 9.65684 33.6569 11 32 11C30.3431 11 29 9.65684 29 8V5C29 3.34316 30.3431 2 32 2Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray1Progress)}
        />

        {/* Top-right ray */}
        <AnimatedPath
          d="M53.2133 10.7867C54.3848 11.9583 54.3848 13.8578 53.2133 15.0293L51.092 17.1507C49.9202 18.3222 48.0209 18.3222 46.8494 17.1507C45.6776 15.9791 45.6776 14.0796 46.8494 12.908L48.9707 10.7867C50.1422 9.61511 52.0415 9.61511 53.2133 10.7867Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray2Progress)}
        />

        {/* Right ray */}
        <AnimatedPath
          d="M59 29C60.6569 29 62 30.3431 62 32C62 33.6569 60.6569 35 59 35H56C54.3431 35 53 33.6569 53 32C53 30.3431 54.3431 29 56 29H59Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray3Progress)}
        />

        {/* Bottom-right ray */}
        <AnimatedPath
          d="M51.092 46.8494L53.2133 48.9707C54.3848 50.1422 54.3848 52.0415 53.2133 53.2133C52.0418 54.3848 50.1422 54.3848 48.9707 53.2133L46.8494 51.092C45.6779 49.9202 45.6779 48.0209 46.8494 46.8494C48.0209 45.6776 49.9205 45.6776 51.092 46.8494Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray4Progress)}
        />

        {/* Bottom ray */}
        <AnimatedPath
          d="M32 53C33.6569 53 35 54.3431 35 56V59C35 60.6569 33.6569 62 32 62C30.3431 62 29 60.6569 29 59V56C29 54.3431 30.3431 53 32 53Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray5Progress)}
        />

        {/* Bottom-left ray */}
        <AnimatedPath
          d="M12.9079 46.8494C14.0795 45.6776 15.979 45.6776 17.1506 46.8494C18.232 47.9308 18.3152 49.6326 17.4002 50.8094L17.1506 51.092L15.0293 53.2133C13.8577 54.3848 11.9582 54.3848 10.7866 53.2133C9.70517 52.1319 9.62198 50.4301 10.5371 49.2533L10.7866 48.9707L12.9079 46.8494Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray6Progress)}
        />

        {/* Left ray */}
        <AnimatedPath
          d="M8 29C9.65684 29 11 30.3431 11 32C11 33.5385 9.84187 34.8065 8.34986 34.9798L8 35H5C3.34316 35 2 33.6569 2 32C2 30.4615 3.15813 29.1935 4.65014 29.0202L5 29H8Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray7Progress)}
        />

        {/* Top-left ray */}
        <AnimatedPath
          d="M10.7867 10.7866C11.8682 9.7052 13.5699 9.62201 14.7467 10.5371L15.0294 10.7866L17.1507 12.908C18.3223 14.0795 18.3223 15.979 17.1507 17.1506C16.0692 18.232 14.3675 18.3152 13.1907 17.4002L12.908 17.1506L10.7867 15.0293C9.61514 13.8577 9.61514 11.9582 10.7867 10.7866Z"
          fill="url(#paint1_linear_244_1500)"
          animatedProps={createRayAnimatedProps(ray8Progress)}
        />
      </G>

      <Defs>
        <RadialGradient
          id="paint0_radial_244_1500"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.5 18.5) rotate(43.0203) scale(41.7145)"
        >
          <Stop offset={0.193671} stopColor="#FFE475" />
          <Stop offset={0.529275} stopColor="#FFB029" />
          <Stop offset={0.780467} stopColor="#FF9100" />
        </RadialGradient>
        <LinearGradient
          id="paint1_linear_244_1500"
          x1={1.625}
          y1={1.625}
          x2={62.375}
          y2={62.375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.166667} stopColor="#FFE475" />
          <Stop offset={0.798611} stopColor="#FFBF29" />
        </LinearGradient>
        <ClipPath id="clip0_244_1500">
          <Rect width={64} height={64} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SunnyIcon;
