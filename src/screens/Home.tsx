import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  RefreshControl,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import {
  fetchWeatherData,
  getWeatherCondition,
  getWindDirection,
  getUVIndexLevel,
  getVisibilityLevel,
  getPressureLevel,
  WeatherData,
} from "../services/weatherService";
import { getBackgroundColors } from "../utils/weatherUtils";
import { getColors } from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import WeatherIconMapper from "../components/weather-icons/WeatherIconMapper";
import AnimatedCounter from "../components/AnimatedCounter";

const HomeScreen: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = getColors(colorScheme);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Animation values
  const fadeInValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const rotateValue = useSharedValue(0);
  const slideInValue = useSharedValue(-50);

  const windDirection = weatherData ? weatherData.windDirection : 0;

  const animatedCompassValue = useDerivedValue(() =>
    withTiming(windDirection, { duration: 800 })
  );

  const triggerDataAnimations = useCallback(() => {
    // Reset animations
    fadeInValue.value = 0;
    scaleValue.value = 0.8;
    slideInValue.value = -50;

    // Trigger animations
    fadeInValue.value = withTiming(1, { duration: 800 });
    scaleValue.value = withSpring(1, { damping: 12, stiffness: 150 });
    slideInValue.value = withTiming(0, { duration: 600 });
  }, []);

  const loadWeatherData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const data = await fetchWeatherData();
      setWeatherData(data);

      triggerDataAnimations();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load weather data";
      setError(errorMessage);
      Alert.alert("Weather Error", errorMessage);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData(true);
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  // Start rotation animation for loading
  useEffect(() => {
    if (loading) {
      rotateValue.value = withRepeat(
        withTiming(360, { duration: 2000 }),
        -1,
        false
      );
    }
  }, [loading]);

  // Animated styles
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInValue.value,
      transform: [{ scale: scaleValue.value }],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateValue.value}deg` }],
    };
  });

  const animatedSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideInValue.value }],
    };
  });

  const backgroundColors = weatherData
    ? getBackgroundColors(weatherData.weatherCode, colorScheme)
    : {
        colors: [
          colors.primaryColor,
          colors.secondaryColor,
          colors.deepBlue,
        ] as const,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };

  if (error && !weatherData) {
    return (
      <LinearGradient
        colors={backgroundColors.colors}
        start={backgroundColors.start}
        end={backgroundColors.end}
        style={styles.container}
      >
        <SafeAreaView style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.white }]}>
            {error}
          </Text>
          <Text
            style={[styles.retryText, { color: colors.white }]}
            onPress={() => loadWeatherData()}
          >
            Tap to retry
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={backgroundColors.colors}
      start={backgroundColors.start}
      end={backgroundColors.end}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.toggleContainer}>
          <Pressable onPress={toggleColorScheme} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {colorScheme === "light" ? "🌙" : "☀️"}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.white}
            />
          }
        >
          <Animated.View style={[styles.content, animatedContentStyle]}>
            {/* Location Header */}
            <Animated.View style={[styles.header, animatedSlideStyle]}>
              <Text style={[styles.locationText, { color: colors.white }]}>
                Berlin, Germany
              </Text>
              <Text style={[styles.timestampText, { color: colors.white }]}>
                {weatherData
                  ? new Date(weatherData.timestamp).toLocaleTimeString()
                  : ""}
              </Text>
            </Animated.View>

            {/* Main Weather Display */}
            <View style={styles.mainWeather}>
              {/* Animated Weather Icon */}
              {weatherData && (
                <View style={styles.iconContainer}>
                  <WeatherIconMapper
                    weatherCode={weatherData.weatherCode}
                    windSpeed={weatherData.windSpeed}
                    size={100}
                    iconColor={colors.white}
                  />
                </View>
              )}

              {/* Animated Temperature */}
              <View style={styles.temperatureContainer}>
                <AnimatedCounter
                  value={weatherData ? weatherData.temperature : 0}
                  suffix="°C"
                  duration={1200}
                  decimals={0}
                  style={[styles.temperature, { color: colors.white }]}
                />
              </View>

              <Animated.Text
                style={[
                  styles.condition,
                  { color: colors.white },
                  animatedSlideStyle,
                ]}
              >
                {weatherData
                  ? getWeatherCondition(weatherData.weatherCode)
                  : "Loading..."}
              </Animated.Text>
            </View>

            {/* Weather Details */}
            <Animated.View
              style={[styles.detailsContainer, animatedSlideStyle]}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.detailsScrollContent}
                style={styles.detailsScrollView}
              >
                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                  ]}
                >
                  <Text style={[styles.detailLabel, { color: colors.white }]}>
                    Wind
                  </Text>
                  <AnimatedCounter
                    value={weatherData ? weatherData.windSpeed : 0}
                    suffix=" km/h"
                    duration={1000}
                    decimals={1}
                    style={[styles.detailValue, { color: colors.white }]}
                  />
                  <Text style={[styles.detailSubtext, { color: colors.white }]}>
                    {weatherData
                      ? getWindDirection(weatherData.windDirection)
                      : "--"}
                  </Text>
                </View>

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
                    {weatherData
                      ? getPressureLevel(weatherData.pressure)
                      : "--"}
                  </Text>
                </View>

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
                </View>

                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                  ]}
                >
                  <Text style={[styles.detailLabel, { color: colors.white }]}>
                    Feels Like
                  </Text>
                  <AnimatedCounter
                    value={weatherData ? weatherData.apparentTemperature : 0}
                    suffix="°C"
                    duration={1000}
                    decimals={0}
                    style={[styles.detailValue, { color: colors.white }]}
                  />
                </View>
              </ScrollView>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  timerContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1000,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    marginBottom: 20,
  },
  loadingText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    textAlign: "center",
    marginBottom: 20,
  },
  retryText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    textDecorationLine: "underline",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  locationText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.xl,
    marginBottom: 5,
  },
  timestampText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    opacity: 0.8,
  },
  mainWeather: {
    alignItems: "center",
    marginBottom: 50,
  },
  iconContainer: {
    marginBottom: 20,
  },
  temperatureContainer: {
    marginBottom: 10,
  },
  temperature: {
    fontFamily: FONTFAMILY.bold,
    fontSize: 72,
    fontWeight: "300",
  },
  condition: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    textAlign: "center",
    opacity: 0.9,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 800,
  },
  detailsScrollView: {
    width: "100%",
  },
  detailsScrollContent: {
    paddingHorizontal: 10,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  detailCard: {
    width: 160,
    padding: 20,
    marginHorizontal: 8,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    marginBottom: 8,
    opacity: 0.8,
  },
  detailValue: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
  },
  detailSubtext: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.xs,
    marginTop: 4,
    opacity: 0.7,
  },
  toggleContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
    width: "100%",
    marginRight: 40,
  },
  toggleButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  toggleButtonText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    color: "white",
  },
});

export default HomeScreen;
