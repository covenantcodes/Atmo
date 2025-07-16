import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
import { Animated, Easing } from "react-native";

interface SunnyIconProps extends SvgProps {
  size?: number;
  animated?: boolean;
}

const SunnyIcon = ({
  size = 80,
  animated = true,
  ...props
}: SunnyIconProps) => {
  const rotateValue = React.useRef(new Animated.Value(0)).current;
  const translateValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      // Sun rotation animation
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      // Cloud floating animation
      const translateAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(translateValue, {
            toValue: 5,
            duration: 1000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(translateValue, {
            toValue: -5,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(translateValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );

      rotateAnimation.start();
      translateAnimation.start();

      return () => {
        rotateAnimation.stop();
        translateAnimation.stop();
      };
    }
  }, [animated, rotateValue, translateValue]);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate: animated ? rotateInterpolate : "0deg" }],
      }}
    >
      <Svg
        width={size}
        height={size * 0.96}
        viewBox="0 0 394 380"
        fill="none"
        {...props}
      >
        {/* Sun */}
        <G filter="url(#filter1_i_8_7)">
          <Path
            d="M301 208C301 265.438 254.438 312 197 312C139.562 312 93 265.438 93 208C93 150.562 139.562 104 197 104C254.438 104 301 150.562 301 208Z"
            fill="url(#paint0_linear_8_7)"
          />
        </G>

        {/* Cloud */}
        <Animated.View
          style={{
            transform: [{ translateX: animated ? translateValue : 0 }],
          }}
        >
          <G filter="url(#filter3_i_8_7)">
            <Path
              d="M256.326 261.629C257.049 257.524 257.426 253.302 257.426 248.993C257.426 208.68 224.441 176 183.752 176C153.503 176 127.512 194.061 116.166 219.893C106.974 212.03 95.0468 207.283 82.0124 207.283C52.949 207.283 29.3884 230.885 29.3884 260C29.3884 261.621 29.4615 263.225 29.6045 264.809C15.6255 271.593 6 285.828 6 302.29C6 325.326 24.8484 344 48.0992 344H246.901C270.152 344 289 325.326 289 302.29C289 282.464 275.039 265.869 256.326 261.629Z"
              fill="url(#paint1_linear_8_7)"
            />
          </G>
        </Animated.View>

        <Defs>
          <LinearGradient
            id="paint0_linear_8_7"
            x1={181.203}
            y1={264.608}
            x2={266.772}
            y2={114.532}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FF9900" />
            <Stop offset={1} stopColor="#FFEE94" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_8_7"
            x1={24}
            y1={329}
            x2={309.5}
            y2={115.5}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset={1} stopColor="white" stopOpacity={0.58} />
          </LinearGradient>
        </Defs>
      </Svg>
    </Animated.View>
  );
};

export default SunnyIcon;
