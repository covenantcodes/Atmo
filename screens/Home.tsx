import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import {
  fetchWeatherData,
  getWeatherCondition,
  WeatherData,
} from "../services/weatherService";
import { getBackgroundColors, getWeatherIcon } from "../utils/weatherUtils";
import { getColors } from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Animation values
  const fadeInValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const rotateValue = useSharedValue(0);

  const loadWeatherData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const data = await fetchWeatherData();
      setWeatherData(data);

      // Trigger animations
      fadeInValue.value = withTiming(1, { duration: 800 });
      scaleValue.value = withTiming(1, { duration: 600 });
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

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      loadWeatherData(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
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

  const backgroundColors = weatherData
    ? getBackgroundColors(weatherData.weatherCode)
    : {
        colors: [
          colors.primaryColor,
          colors.secondaryColor,
          colors.deepBlue,
        ] as const,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };

  if (loading && !weatherData) {
    return (
      <LinearGradient
        colors={backgroundColors.colors}
        start={backgroundColors.start}
        end={backgroundColors.end}
        style={styles.container}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingContent, animatedIconStyle]}>
            <ActivityIndicator size="large" color={colors.white} />
          </Animated.View>
          <Text style={[styles.loadingText, { color: colors.white }]}>
            Loading weather data...
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
            <View style={styles.header}>
              <Text style={[styles.locationText, { color: colors.white }]}>
                Berlin, Germany
              </Text>
              <Text style={[styles.timestampText, { color: colors.white }]}>
                {weatherData
                  ? new Date(weatherData.timestamp).toLocaleTimeString()
                  : ""}
              </Text>
            </View>

            {/* Main Weather Display */}
            <View style={styles.mainWeather}>
              <Text style={styles.weatherIcon}>
                {weatherData ? getWeatherIcon(weatherData.weatherCode) : "☁️"}
              </Text>
              <Text style={[styles.temperature, { color: colors.white }]}>
                {weatherData ? Math.round(weatherData.temperature) : "--"}°C
              </Text>
              <Text style={[styles.condition, { color: colors.white }]}>
                {weatherData
                  ? getWeatherCondition(weatherData.weatherCode)
                  : "Loading..."}
              </Text>
            </View>

            {/* Weather Details */}
            <View style={styles.detailsContainer}>
              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                ]}
              >
                <Text style={[styles.detailLabel, { color: colors.white }]}>
                  Wind Speed
                </Text>
                <Text style={[styles.detailValue, { color: colors.white }]}>
                  {weatherData ? `${weatherData.windSpeed} km/h` : "--"}
                </Text>
              </View>

              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                ]}
              >
                <Text style={[styles.detailLabel, { color: colors.white }]}>
                  Weather Code
                </Text>
                <Text style={[styles.detailValue, { color: colors.white }]}>
                  {weatherData ? weatherData.weatherCode : "--"}
                </Text>
              </View>
            </View>
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
  weatherIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  temperature: {
    fontFamily: FONTFAMILY.bold,
    fontSize: 72,
    fontWeight: "300",
    marginBottom: 10,
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
    maxWidth: 300,
  },
  detailCard: {
    flex: 1,
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: "center",
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
});

export default HomeScreen;
