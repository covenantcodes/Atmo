import React from "react";
import { ScrollView, View, Text, Switch } from "react-native";
import Animated from "react-native-reanimated";
import AnimatedCounter from "../../../components/AnimatedCounter";

type DetailsTabProps = {
  weatherData: any;
  colors: { white: string };
  animatedSlideStyle: any;
  temperatureUnit: "C" | "F";
  getPressureLevel: (pressure: number) => string;
  getUVIndexLevel: (uvIndex: number) => string;
  getVisibilityLevel: (visibility: number) => string;
  styles: any;
};

const DetailsTab = ({
  weatherData,
  colors,
  animatedSlideStyle,
  temperatureUnit,
  getPressureLevel,
  getUVIndexLevel,
  getVisibilityLevel,
  styles,
}: DetailsTabProps) => (
  <ScrollView style={styles.tabContent}>
    <Animated.View style={[styles.detailsGrid, animatedSlideStyle]}>
      {/* Detailed Weather Cards */}
      <View style={styles.detailRow}>
        <View
          style={[
            styles.detailCard,
            { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          ]}
        >
          <Text style={[styles.detailLabel, { color: colors.white }]}>
            Humidity
          </Text>
          <AnimatedCounter
            value={weatherData ? weatherData.humidity : 0}
            suffix="%"
            duration={1000}
            decimals={0}
            style={[styles.detailValue, { color: colors.white }]}
          />
        </View>
        <View
          style={[
            styles.detailCard,
            { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          ]}
        >
          <Text style={[styles.detailLabel, { color: colors.white }]}>
            Pressure
          </Text>
          <AnimatedCounter
            value={weatherData ? weatherData.pressure : 0}
            suffix=" hPa"
            duration={1000}
            decimals={0}
            style={[styles.detailValue, { color: colors.white }]}
          />
          <Text style={[styles.detailSubtext, { color: colors.white }]}>
            {weatherData ? getPressureLevel(weatherData.pressure) : "--"}
          </Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View
          style={[
            styles.detailCard,
            { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          ]}
        >
          <Text style={[styles.detailLabel, { color: colors.white }]}>
            UV Index
          </Text>
          <AnimatedCounter
            value={weatherData ? weatherData.uvIndex : 0}
            suffix=""
            duration={1000}
            decimals={0}
            style={[styles.detailValue, { color: colors.white }]}
          />
          <Text style={[styles.detailSubtext, { color: colors.white }]}>
            {weatherData ? getUVIndexLevel(weatherData.uvIndex) : "--"}
          </Text>
        </View>
        <View
          style={[
            styles.detailCard,
            { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          ]}
        >
          <Text style={[styles.detailLabel, { color: colors.white }]}>
            Visibility
          </Text>
          <AnimatedCounter
            value={weatherData ? weatherData.visibility / 1000 : 0}
            suffix=" km"
            duration={1000}
            decimals={1}
            style={[styles.detailValue, { color: colors.white }]}
          />
          <Text style={[styles.detailSubtext, { color: colors.white }]}>
            {weatherData ? getVisibilityLevel(weatherData.visibility) : "--"}
          </Text>
        </View>
      </View>
    </Animated.View>
  </ScrollView>
);

export default DetailsTab;
