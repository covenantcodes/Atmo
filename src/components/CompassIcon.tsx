import React from "react";
import Svg, { Circle, Line, G } from "react-native-svg";
import { View } from "react-native";

interface CompassIconProps {
  size?: number;
  direction?: number; // in degrees, 0 = North
  color?: string;
}

const CompassIcon: React.FC<CompassIconProps> = ({
  size = 60,
  direction = 0,
  color = "#fff",
}) => (
  <View>
    <Svg width={size} height={size} viewBox="0 0 60 60">
      <Circle
        cx={30}
        cy={30}
        r={28}
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <G origin="30,30" rotation={direction}>
        {/* Needle */}
        <Line x1={30} y1={30} x2={30} y2={10} stroke={color} strokeWidth={3} />
        {/* Tail */}
        <Line
          x1={30}
          y1={30}
          x2={30}
          y2={50}
          stroke={color}
          strokeWidth={1.5}
          opacity={0.5}
        />
      </G>
    </Svg>
  </View>
);

export default CompassIcon;
