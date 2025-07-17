import React from "react";
import SunnyIcon from "./SunnyIcon";
import RainyIcon from "./RainyIcon";
import WindyIcon from "./WindyIcon";

interface WeatherIconMapperProps {
  weatherCode: number;
  size?: number;
  windSpeed?: number;
  iconColor?: string;
}

const WeatherIconMapper: React.FC<WeatherIconMapperProps> = ({
  weatherCode,
  size = 120,
  windSpeed = 0,
  iconColor,
}) => {
  // Wind overrides all if strong enough
  if (windSpeed > 15) {
    return <WindyIcon size={size} color={iconColor} />;
  }

  // Sunny (Clear to partly cloudy): 0–3
  if (weatherCode >= 0) {
    return <SunnyIcon size={size} color={iconColor} />;
  }

  // Rain: 51–67, 80–82
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return <RainyIcon size={size} color={iconColor} />;
  }

  // Snow: 71–77, 85–86 — still using RainyIcon but maybe with icy blue color
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return <RainyIcon size={size} color={iconColor || "#a0e9ff"} />;
  }

  // Thunderstorm: 95–99
  if (weatherCode >= 95 && weatherCode <= 99) {
    return <RainyIcon size={size} color={iconColor || "#ffcc00"} />;
  }

  // Fallback
  return <SunnyIcon size={size} color={iconColor || "#cccccc"} />;
};

export default WeatherIconMapper;
