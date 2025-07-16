import React from "react";
import SunnyIcon from "./SunnyIcon";
import RainyIcon from "./RainyIcon";
import WindyIcon from "./WindyIcon";

interface WeatherIconMapperProps {
  weatherCode: number;
  size?: number;
  windSpeed?: number;
  iconColor?: string; // Add this prop to override colors
}

const WeatherIconMapper: React.FC<WeatherIconMapperProps> = ({
  weatherCode,
  size = 80,
  windSpeed = 0,
  iconColor,
}) => {
  // Function to get contrasting colors based on weather conditions
  const getIconColors = (weatherCode: number) => {
    // For sunny conditions, use white/light colors to contrast with golden background
    if (weatherCode >= 0 && weatherCode <= 3) {
      return {
        primary: iconColor || "#FFFFFF",
        secondary: iconColor || "#F8F8FF",
      };
    }

    // For rainy conditions, use lighter colors to contrast with dark blue background
    if (
      (weatherCode >= 51 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)
    ) {
      return {
        primary: iconColor || "#E6F3FF",
        secondary: iconColor || "#B3D9FF",
      };
    }

    // For snowy conditions
    if (
      (weatherCode >= 71 && weatherCode <= 77) ||
      (weatherCode >= 85 && weatherCode <= 86)
    ) {
      return {
        primary: iconColor || "#4A90E2",
        secondary: iconColor || "#87CEEB",
      };
    }

    // For thunderstorm conditions
    if (weatherCode >= 95 && weatherCode <= 99) {
      return {
        primary: iconColor || "#FFD700",
        secondary: iconColor || "#FFFF99",
      };
    }

    // Default colors
    return {
      primary: iconColor || "#FFFFFF",
      secondary: iconColor || "#F0F0F0",
    };
  };

  const colors = getIconColors(weatherCode);

  // If wind speed is high (>15 km/h), show windy icon regardless of weather
  if (windSpeed > 15) {
    return (
      <WindyIcon
        size={size}
        leafColor={colors.primary}
        windColor={colors.secondary}
      />
    );
  }

  // Sunny conditions (0-3)
  if (weatherCode >= 0 && weatherCode <= 3) {
    return <SunnyIcon size={200} color={colors.primary} />;
  }

  // Rain conditions (51-67, 80-82)
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return (
      <RainyIcon
        size={size}
        cloudColor={colors.secondary}
        rainColor={colors.primary}
      />
    );
  }

  // Snow conditions - use rainy icon with different colors
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return (
      <RainyIcon size={size} cloudColor="#E6E6FA" rainColor={colors.primary} />
    );
  }

  // Thunderstorm conditions
  if (weatherCode >= 95 && weatherCode <= 99) {
    return (
      <RainyIcon size={size} cloudColor="#2C2C54" rainColor={colors.primary} />
    );
  }

  // Default to sunny for unknown conditions but with contrasting color
  return <SunnyIcon size={200} color={colors.primary} />;
};

export default WeatherIconMapper;
