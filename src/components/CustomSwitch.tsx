import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";
import colors from "../utils/colors";
interface CustomSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  isActive,
  onToggle,
  activeColor = colors.primaryColor,
  inactiveColor = colors.gray3,
  style,
  size = "medium",
}) => {
  const switchAnimation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  // Determine dimensions based on size
  const dimensions = {
    small: { width: 40, height: 22, thumbSize: 18, travel: 18 },
    medium: { width: 50, height: 28, thumbSize: 24, travel: 22 },
    large: { width: 60, height: 34, thumbSize: 30, travel: 26 },
  }[size];

  useEffect(() => {
    Animated.spring(switchAnimation, {
      toValue: isActive ? 1 : 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        {
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: dimensions.height / 2,
          backgroundColor: isActive ? activeColor : inactiveColor,
        },
        style,
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          {
            width: dimensions.thumbSize,
            height: dimensions.thumbSize,
            borderRadius: dimensions.thumbSize / 2,
            transform: [
              {
                translateX: switchAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [2, dimensions.travel],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    padding: 2,
    justifyContent: "center",
  },
  switchThumb: {
    position: "absolute",
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    left: 2,
  },
});

export default CustomSwitch;
