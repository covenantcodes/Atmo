import React from "react";
import { ScrollView, View, Text } from "react-native";
import Animated from "react-native-reanimated";

import AnimatedCounter from "../../../components/AnimatedCounter";

type ForecastTabProps = {
  forecastData?: Array<{
    id?: string | number;
    weatherCode: number;
    windSpeed: number;
    temperature: number;
    time?: string;
    summary?: string;
  }>;
  colors: {
    white: string;
    [key: string]: string;
  };
  animatedSlideStyle?: object;
  convertTemperature: (temp: number, unit: "C" | "F") => number;
  temperatureUnit: "C" | "F";
  styles: { [key: string]: any };
};

const ForecastTab: React.FC<ForecastTabProps> = ({
  forecastData = [],
  colors,
  animatedSlideStyle,
  temperatureUnit,
  convertTemperature,
  styles,
}) => (
  <ScrollView style={styles.tabContent}>
    <Animated.View style={[styles.forecastContainer, animatedSlideStyle]}>
      <Text style={[styles.forecastTitle, { color: colors.white }]}>
        Upcoming Forecast
      </Text>
      {forecastData.length === 0 ? (
        <Text style={[styles.forecastNote, { color: colors.white }]}>
          No forecast data available.
        </Text>
      ) : (
        forecastData.map((item, idx) => (
          <View
            key={item.id || idx}
            style={[
              styles.forecastCard,
              { backgroundColor: "rgba(255,255,255,0.15)" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  {item.time
                    ? new Date(item.time).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "—"}
                </Text>
                <Text style={{ color: colors.white }}>
                  {item.summary || ""}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <AnimatedCounter
                value={
                  convertTemperature
                    ? convertTemperature(item.temperature, temperatureUnit)
                    : item.temperature
                }
                suffix={`°${temperatureUnit}`}
                duration={800}
                decimals={0}
                style={[styles.detailValue, { color: colors.white }]}
              />
              <Text
                style={[
                  styles.detailSubtext,
                  { color: colors.white, marginLeft: 12 },
                ]}
              >
                Wind: {item.windSpeed} km/h
              </Text>
            </View>
          </View>
        ))
      )}
    </Animated.View>
  </ScrollView>
);

export default ForecastTab;
