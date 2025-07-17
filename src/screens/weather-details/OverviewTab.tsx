import React from "react";
import { ScrollView, View, Text, Switch } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import WeatherIconMapper from "../../components/weather-icons/WeatherIconMapper";
import AnimatedCounter from "../../components/AnimatedCounter";
import WindCompass from "../../components/WindCompass";
import { getWindDirection } from "../../services/weatherService";

type OverviewTabProps = {
  weatherData: any;
  colors: any;
  animatedContentStyle: any;
  convertTemperature: (temp: number, unit: "C" | "F") => number;
  temperatureUnit: "C" | "F";
  setTemperatureUnit: (unit: "C" | "F") => void;
  getWeatherCondition: (weatherCode: number) => string;
  getWindDirection: (deg: number) => string;
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
  setTemperatureUnit,
  getWeatherCondition,
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

      <WindCompass
        windDirection={weatherData?.windDirection ?? 0}
        getWindDirection={getWindDirection}
        colors={colors}
        styles={styles}
        compassStyle={animatedContentStyle}
      />

      <View
        style={[
          styles.settingsCard,
          { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        ]}
      >
        <Text style={[styles.settingsLabel, { color: colors.white }]}>
          Temperature Unit
        </Text>
        <View style={styles.unitToggle}>
          <Text style={[styles.unitText, { color: colors.white }]}>°C</Text>
          <Switch
            value={temperatureUnit === "F"}
            onValueChange={(value) => setTemperatureUnit(value ? "F" : "C")}
            trackColor={{
              false: "rgba(255, 255, 255, 0.3)",
              true: "rgba(255, 255, 255, 0.3)",
            }}
            thumbColor={colors.white}
          />
          <Text style={[styles.unitText, { color: colors.white }]}>°F</Text>
        </View>
      </View>
    </Animated.View>
  </ScrollView>
);

export default OverviewTab;
