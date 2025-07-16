import React from "react";
import SunnyIcon from "./SunnyIcon";
import RainyIcon from "./RainyIcon";
import WindyIcon from "./WindyIcon";

interface WeatherIconMapperProps {
  weatherCode: number;
  size?: number;
  windSpeed?: number;
}

const WeatherIconMapper: React.FC<WeatherIconMapperProps> = ({
  weatherCode,
  size = 80,
  windSpeed = 0,
}) => {
  // If wind speed is high (>15 km/h), show windy icon regardless of weather
  if (windSpeed > 15) {
    return <WindyIcon size={size} />;
  }

  // Sunny conditions (0-3)
  if (weatherCode >= 0 && weatherCode <= 3) {
    return <SunnyIcon size={size} />;
  }

  // Rain conditions (51-67, 80-82)
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return <RainyIcon size={size} />;
  }

  // Snow conditions - use rainy icon with different colors
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return (
      <RainyIcon
        size={size}
        cloudColor="#E6E6FA"
        rainColor="#FFFFFF"
      />
    );
  }

  // Thunderstorm conditions
  if (weatherCode >= 95 && weatherCode <= 99) {
    return (
      <RainyIcon
        size={size}
        cloudColor="#2C2C54"
        rainColor="#FFD700"
      />
    );
  }

  // Default to sunny for unknown conditions
  return <SunnyIcon size={size} color="#87CEEB" />;
};

export default WeatherIconMapper;
