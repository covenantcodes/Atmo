import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
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
import OverviewTab from "./weather-details/OverviewTab";
import DetailsTab from "./weather-details/DetailsTab";
import ForecastTab from "./weather-details/ForecastTab";
import WindCompass from "../components/WindCompass";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface WeatherDetailScreenProps {
  navigation?: any;
}

const WeatherDetailScreen: React.FC<WeatherDetailScreenProps> = ({
  navigation,
}) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    systemColorScheme || "light"
  );
  const [temperatureUnit, setTemperatureUnit] = useState<"C" | "F">("C");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const colors = getColors(colorScheme);

  // Animation values
  const fadeInValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const slideInValue = useSharedValue(-50);
  const compassRotation = useSharedValue(0);
  const tabIndicatorWidth = useSharedValue(0);

  // Tab view state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "overview", title: "Overview" },
    { key: "details", title: "Details" },
    { key: "forecast", title: "Forecast" },
  ]);

  // Update color scheme based on system
  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const convertTemperature = (temp: number, unit: "C" | "F"): number => {
    if (unit === "F") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  const formatUTCTime = (date: Date): string => {
    return date.toISOString().replace("T", " ").slice(0, 19) + " UTC";
  };

  const triggerDataAnimations = useCallback(() => {
    fadeInValue.value = 0;
    scaleValue.value = 0.8;
    slideInValue.value = -50;

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

      // Animate compass to wind direction
      compassRotation.value = withSpring(data.windDirection, {
        damping: 15,
        stiffness: 100,
      });

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

  // Animated styles
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInValue.value,
      transform: [{ scale: scaleValue.value }],
    };
  });

  const animatedSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideInValue.value }],
    };
  });

  const compassStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${compassRotation.value}deg` }],
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

  <WindCompass
    windDirection={weatherData?.windDirection ?? 0}
    getWindDirection={getWindDirection}
    colors={colors}
    styles={styles}
    compassStyle={compassStyle}
  />;

  const renderScene = SceneMap({
    overview: () => (
      <OverviewTab
        weatherData={weatherData}
        colors={colors}
        animatedContentStyle={animatedContentStyle}
        convertTemperature={convertTemperature}
        setTemperatureUnit={setTemperatureUnit}
        temperatureUnit={temperatureUnit}
        getWeatherCondition={getWeatherCondition}
        getWindDirection={getWindDirection}
        currentTime={currentTime}
        formatUTCTime={formatUTCTime}
        styles={styles}
      />
    ),
    details: () => (
      <DetailsTab
        weatherData={weatherData}
        colors={colors}
        animatedSlideStyle={animatedSlideStyle}
        temperatureUnit={temperatureUnit}
        getPressureLevel={getPressureLevel}
        getUVIndexLevel={getUVIndexLevel}
        getVisibilityLevel={getVisibilityLevel}
        styles={styles}
      />
    ),
    forecast: () => (
      <ForecastTab
        forecastData={weatherData?.forecast || []}
        colors={colors}
        animatedSlideStyle={animatedSlideStyle}
        temperatureUnit={temperatureUnit}
        convertTemperature={convertTemperature}
        styles={styles}
      />
    ),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.white, height: 3 }}
      style={{ backgroundColor: "transparent", elevation: 0 }}
      renderLabel={({
        route,
        focused,
      }: {
        route: { key: string; title: string };
        focused: boolean;
        color: string;
      }) => (
        <Text
          style={{
            fontFamily: FONTFAMILY.semibold,
            fontSize: FONTSIZE.sm,
            color: colors.white,
            opacity: focused ? 1 : 0.6,
          }}
        >
          {route.title}
        </Text>
      )}
      activeColor={colors.white}
      inactiveColor={`${colors.white}`}
    />
  );
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
          <Pressable
            onPress={() => loadWeatherData()}
            style={styles.retryButton}
          >
            <Text style={[styles.retryText, { color: colors.white }]}>
              Tap to retry
            </Text>
          </Pressable>
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
        {/* Header */}
        <Animated.View style={[styles.header, animatedSlideStyle]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.locationText, { color: colors.white }]}>
                Berlin, Germany
              </Text>
              <Text style={[styles.timestampText, { color: colors.white }]}>
                {weatherData
                  ? new Date(weatherData.timestamp).toLocaleString()
                  : ""}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable
                onPress={() =>
                  setColorScheme(colorScheme === "light" ? "dark" : "light")
                }
                style={styles.themeButton}
              >
                <Text style={styles.themeButtonText}>
                  {colorScheme === "light" ? "🌙" : "☀️"}
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>

        {/* Tab View */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          renderTabBar={renderTabBar}
          style={styles.tabView}
          lazy
          renderLazyPlaceholder={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.white, opacity: 0.7 }}>
                Loading...
              </Text>
            </View>
          )}
        />
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
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.xl,
    marginBottom: 4,
  },
  timestampText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    opacity: 0.8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 12,
  },
  themeButtonText: {
    fontSize: FONTSIZE.md,
  },
  tabView: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingTop: 20,
  },

  // Overview Scene Styles
  overviewContainer: {
    flex: 1,
  },
  currentWeatherCard: {
    marginBottom: 30,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  currentWeatherContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  tempContainer: {
    marginLeft: 20,
    flex: 1,
  },
  currentTemp: {
    fontFamily: FONTFAMILY.bold,
    fontSize: 48,
    fontWeight: "300",
  },
  feelsLike: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    opacity: 0.8,
  },
  condition: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    textAlign: "center",
    opacity: 0.9,
  },
  windSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    marginBottom: 20,
  },
  windSpeed: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    marginTop: 10,
  },
  timeSection: {
    marginBottom: 20,
  },
  timeCard: {
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  timeLabel: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    marginBottom: 8,
    opacity: 0.8,
  },
  utcTime: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    marginBottom: 8,
  },
  localTime: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    opacity: 0.8,
  },

  // Compass Styles
  compassContainer: {
    alignItems: "center",
  },
  compassOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  compassInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  compassNeedle: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  needle: {
    width: 2,
    height: 25,
    position: "absolute",
    top: 5,
  },
  compassLabel: {
    position: "absolute",
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.xs,
  },
  compassN: { top: 5 },
  compassE: { right: 5 },
  compassS: { bottom: 5 },
  compassW: { left: 5 },
  compassText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    marginTop: 10,
  },

  // Details Scene Styles
  detailsGrid: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailCard: {
    width: (screenWidth - 48) / 2,
    padding: 20,
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
    marginBottom: 4,
  },
  detailSubtext: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.xs,
    opacity: 0.7,
    textAlign: "center",
  },
  settingsCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  settingsLabel: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    marginBottom: 15,
  },
  unitToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    marginHorizontal: 10,
  },

  // Forecast Scene Styles
  forecastContainer: {
    flex: 1,
  },
  forecastCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  forecastTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    marginBottom: 10,
  },
  forecastNote: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    opacity: 0.8,
    textAlign: "center",
  },

  // Error Styles
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
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 30,
  },
  retryText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
  },
});

export default WeatherDetailScreen;
