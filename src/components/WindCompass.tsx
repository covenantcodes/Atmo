import React from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import CompassIcon from "./CompassIcon"; // <-- Import your CompassIcon

type WindCompassProps = {
  windDirection: number;
  getWindDirection: (deg: number) => string;
  colors: any;
  styles: any;
  compassStyle: any;
};

const WindCompass: React.FC<WindCompassProps> = ({
  windDirection,
  getWindDirection,
  colors,
  styles,
  compassStyle,
}) => (
  <View style={styles.compassContainer}>
    <View style={[styles.compassOuter, { borderColor: colors.white }]}>
      <View
        style={[
          styles.compassInner,
          { backgroundColor: "rgba(255, 255, 255, 0.1)" },
        ]}
      >
        {/* Animated CompassIcon */}
        <Animated.View style={compassStyle}>
          <CompassIcon size={60} color={colors.white} direction={0} />
        </Animated.View>
        <Text
          style={[
            styles.compassLabel,
            styles.compassN,
            { color: colors.white },
          ]}
        >
          N
        </Text>
        <Text
          style={[
            styles.compassLabel,
            styles.compassE,
            { color: colors.white },
          ]}
        >
          E
        </Text>
        <Text
          style={[
            styles.compassLabel,
            styles.compassS,
            { color: colors.white },
          ]}
        >
          S
        </Text>
        <Text
          style={[
            styles.compassLabel,
            styles.compassW,
            { color: colors.white },
          ]}
        >
          W
        </Text>
      </View>
    </View>
    <Text style={[styles.compassText, { color: colors.white }]}>
      {getWindDirection(windDirection)}
    </Text>
  </View>
);

export default WindCompass;
