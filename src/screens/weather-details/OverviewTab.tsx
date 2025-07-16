import React from "react";
import { ScrollView, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import WeatherIconMapper from "../../components/weather-icons/WeatherIconMapper";
import AnimatedCounter from "../../components/AnimatedCounter";

type OverviewTabProps = {
  weatherData: any;
  colors: any;
  animatedContentStyle: any;
  convertTemperature: (temp: number, unit: string) => number;
  temperatureUnit: string;
  getWeatherCondition: (weatherCode: number) => string;
  WindCompass: React.ComponentType;
  currentTime: Date;
  formatUTCTime: (date: Date) => string;
  styles: any;
};

const OverviewTab: React.FC<OverviewTabProps> = ({
  weatherData,
  colors,
  animatedContentStyle,
  convertTemperature,
  temperatureUnit,
  getWeatherCondition,
  WindCompass,
  currentTime,
  formatUTCTime,
  styles,
}) => (
  <ScrollView style={styles.tabContent}>
    <Animated.View style={[styles.overviewContainer, animatedContentStyle]}>
      {/* Current Weather */}
      <View style={styles.currentWeatherCard}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
          style={styles.cardGradient}
        >
          <View style={styles.currentWeatherContent}>
            {weatherData && (
              <WeatherIconMapper
                weatherCode={weatherData.weatherCode}
                windSpeed={weatherData.windSpeed}
                size={80}
                iconColor={colors.white}
              />
            )}
            <View style={styles.tempContainer}>
              <AnimatedCounter
                value={
                  weatherData
                    ? convertTemperature(
                        weatherData.temperature,
                        temperatureUnit
                      )
                    : 0
                }
                suffix={`°${temperatureUnit}`}
                duration={1000}
                decimals={0}
                style={[styles.currentTemp, { color: colors.white }]}
              />
              <Text style={[styles.feelsLike, { color: colors.white }]}>
                Feels like{" "}
                {weatherData
                  ? Math.round(
                      convertTemperature(
                        weatherData.apparentTemperature,
                        temperatureUnit
                      )
                    )
                  : 0}
                °{temperatureUnit}
              </Text>
            </View>
          </View>
          <Text style={[styles.condition, { color: colors.white }]}>
            {weatherData
              ? getWeatherCondition(weatherData.weatherCode)
              : "Loading..."}
          </Text>
        </LinearGradient>
      </View>

      {/* Wind Direction */}
      <View style={styles.windSection}>
        <Text style={[styles.sectionTitle, { color: colors.white }]}>
          Wind Direction
        </Text>
        <WindCompass />
        <Text style={[styles.windSpeed, { color: colors.white }]}>
          {weatherData ? weatherData.windSpeed.toFixed(1) : 0} km/h
        </Text>
      </View>

      {/* UTC Time */}
      <View style={styles.timeSection}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
          style={styles.timeCard}
        >
          <Text style={[styles.timeLabel, { color: colors.white }]}>
            Current UTC Time
          </Text>
          <Text style={[styles.utcTime, { color: colors.white }]}>
            {formatUTCTime(currentTime)}
          </Text>
          <Text style={[styles.localTime, { color: colors.white }]}>
            Local: {currentTime.toLocaleTimeString()}
          </Text>
        </LinearGradient>
      </View>
    </Animated.View>
  </ScrollView>
);

export default OverviewTab;
