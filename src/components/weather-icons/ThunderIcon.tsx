import * as React from "react";
import Svg, {
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ThunderIconProps extends SvgProps {
  size?: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ThunderIcon = ({ size = 80, ...props }: ThunderIconProps) => {
  // Flash animation for the lightning bolt
  const flash = useSharedValue(1);

  React.useEffect(() => {
    flash.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 100 }),
        withTiming(1, { duration: 200 })
      ),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    opacity: flash.value,
  }));

  return (
    <Svg
      width={size}
      height={(size * 326) / 411}
      viewBox="0 0 411 326"
      fill="none"
      {...props}
    >
      <G>
        <Path
          d="M326.747 95.0084C327.549 90.4546 327.967 85.7701 327.967 80.9888C327.967 36.2599 291.369 0 246.223 0C212.661 0 183.823 20.0397 171.234 48.7007C161.035 39.9768 147.801 34.7095 133.339 34.7095C101.092 34.7095 74.9504 60.8972 74.9504 93.2014C74.9504 95.0003 75.0315 96.7801 75.1902 98.5376C59.6799 106.065 49 121.858 49 140.124C49 165.683 69.9131 186.403 95.7108 186.403H316.289C342.087 186.403 363 165.683 363 140.124C363 118.126 347.51 99.7132 326.747 95.0084Z"
          fill="url(#paint0_linear_8_10)"
        />
      </G>
      <G filter="url(#filter2_i_8_10)">
        <Path
          d="M233.775 186.5H183.75L162 244.986H201.15L183.025 318L249 222.211H220L233.775 186.5Z"
          fill="url(#paint1_linear_8_10)"
        />
      </G>
      <G filter="url(#filter3_f_8_10)">
        <Rect x={77} y={153} width={257} height={50} rx={25} fill="#FFED8D" />
      </G>
      <G filter="url(#filter4_di_8_10)">
        <Path
          d="M268.151 292.575C260.385 296.024 257.354 298.938 254.575 306.151C252.363 299.161 249.642 296.043 241 292.575C249.89 289.679 252.303 286.326 254.575 279C257.368 285.752 259.092 289.437 268.151 292.575Z"
          fill="url(#paint2_linear_8_10)"
        />
      </G>
      <G filter="url(#filter5_i_8_10)">
        <Path
          d="M142.151 216.575C134.385 220.024 131.354 222.938 128.575 230.151C126.363 223.161 123.642 220.043 115 216.575C123.89 213.679 126.303 210.326 128.575 203C131.368 209.752 133.092 213.437 142.151 216.575Z"
          fill="url(#paint3_linear_8_10)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_8_10"
          x1={68.9717}
          y1={169.76}
          x2={385.746}
          y2={-67.1272}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="white" />
          <Stop offset={1} stopColor="white" stopOpacity={0.58} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_8_10"
          x1={194.747}
          y1={305.333}
          x2={279.616}
          y2={188.178}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF9900" />
          <Stop offset={1} stopColor="#FFEE94" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_8_10"
          x1={250.648}
          y1={307.423}
          x2={263.425}
          y2={283.433}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF9900" />
          <Stop offset={1} stopColor="#FFEE94" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_8_10"
          x1={124.648}
          y1={231.423}
          x2={137.425}
          y2={207.433}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF9900" />
          <Stop offset={1} stopColor="#FFEE94" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
export default ThunderIcon;
