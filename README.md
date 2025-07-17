# Atmo

**Atmo** is a modern, animated weather app built with React Native. It provides real-time weather data, hourly forecasts, and detailed weather insights with a beautiful, interactive UI.

## Features

- 🌤️ **Current Weather:** See up-to-date weather conditions for Berlin, Germany (default).
- ⏳ **Hourly Forecast:** Scrollable, animated forecast tab with weather icons and details.
- 📊 **Weather Details:** View humidity, wind, pressure, UV index, and more.
- 🌡️ **Temperature Unit Switch:** Toggle between Celsius and Fahrenheit with a custom switch.
- ⚡ **Animated Weather Icons:** Custom SVG icons with animated effects for sun, rain, wind, and thunder.
- 🔄 **Pull-to-Refresh:** Instantly update weather data with a swipe.
- 🎨 **Gradient Backgrounds:** Dynamic backgrounds for a visually appealing experience.
- ⚛️ **Smooth Navigation:** Fast tab switching and seamless transitions.

## Tech Stack

- **React Native** (with TypeScript)
- **react-native-reanimated** (for icon and UI animations)
- **react-native-svg** (for custom weather icons)
- **Axios** (for API requests)
- **Open-Meteo API** (for weather data)
- **React Navigation** (for screen navigation)

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Run on iOS or Android:**

   ```sh
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

3. **API:**  
   No API key required. Weather data is fetched from [Open-Meteo](https://open-meteo.com/).

## Project Structure

```
src/
  components/
    weather-icons/      # Custom animated SVG weather icons
    CustomSwitch.tsx    # Custom toggle switch component
    AnimatedCounter.tsx # Animated number counter
    AtmoLogo.tsx        # Animated app logo
    WindCompass.tsx     # Animated wind direction compass
  screens/
    Home.tsx            # Main weather overview screen
    WeatherDetails.tsx  # Detailed weather info and forecast
    weather-details/
      OverviewTab.tsx
      DetailsTab.tsx
      ForecastTab.tsx
  services/
    weatherService.ts   # API calls and data mapping
  utils/
    colors.ts           # Color themes
    fonts.ts            # Font constants
    weatherUtils.ts     # Weather-related helpers
```

## Component Usage Examples

### WeatherIconMapper

Displays the correct animated weather icon based on condition and wind.

```tsx
import WeatherIconMapper from "../components/weather-icons/WeatherIconMapper";

<WeatherIconMapper
  conditionName="Rain"
  windSpeed={12}
  size={80}
  iconColor="#fff"
/>;
```

### CustomSwitch

A custom animated toggle switch for settings.

```tsx
import CustomSwitch from "../components/CustomSwitch";

<CustomSwitch
  isActive={temperatureUnit === "F"}
  onToggle={() => setTemperatureUnit(temperatureUnit === "C" ? "F" : "C")}
  activeColor="#22A37C"
  inactiveColor="#E5E7EB"
  size="medium"
/>;
```

### AnimatedCounter

Animated number counter for temperature, humidity, etc.

```tsx
import AnimatedCounter from "../components/AnimatedCounter";

<AnimatedCounter
  value={23}
  suffix="°C"
  duration={1000}
  decimals={0}
  style={{ color: "#fff", fontSize: 48 }}
/>;
```

### WindCompass

Shows wind direction with an animated compass.

```tsx
import WindCompass from "../components/WindCompass";

<WindCompass
  windDirection={weatherData.windDirection}
  getWindDirection={getWindDirection}
  colors={colors}
  styles={styles}
  compassStyle={animatedStyle}
/>;
```

## Customization

- **Location:**  
  Default is Berlin, Germany. Update coordinates in `src/services/weatherService.ts` to change.

- **Icons:**  
  Add or modify icons in `src/components/weather-icons/`.

- **Themes:**  
  Edit `src/utils/colors.ts` for light/dark color schemes.

## Example: Fetching Weather Data

```tsx
import { fetchWeatherData } from "../services/weatherService";

useEffect(() => {
  const load = async () => {
    const data = await fetchWeatherData();
    setWeatherData(data);
  };
  load();
}, []);
```

## License

MIT

---

Made with ❤️ using React Native.
