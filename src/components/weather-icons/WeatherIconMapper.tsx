import React from "react";
import SunnyIcon from "./SunnyIcon";
import RainyIcon from "./RainyIcon";
import WindyIcon from "./WindyIcon";
import ThunderIcon from "./ThunderIcon";

interface WeatherIconMapperProps {
  conditionName: string;
  size?: number;
  windSpeed?: number;
  iconColor?: string;
}

const WeatherIconMapper: React.FC<WeatherIconMapperProps> = ({
  conditionName = "",
  size = 120,
  windSpeed = 0,
  iconColor,
}) => {
  const name = conditionName.toLowerCase();

  // Wind overrides all if strong enough
  if (windSpeed > 15) {
    return <WindyIcon size={size} color={iconColor} />;
  }

  if (
    name.includes("clear") ||
    name.includes("mainly clear") ||
    name.includes("partly cloudy")
  ) {
    return <SunnyIcon size={size} color={iconColor} />;
  }

  if (name.includes("thunder")) {
    return <ThunderIcon size={size} color={iconColor} />;
  }

  if (
    name.includes("rain") ||
    name.includes("drizzle") ||
    name.includes("shower")
  ) {
    return <RainyIcon size={size} color={iconColor} />;
  }

  if (
    name.includes("snow") ||
    name.includes("freezing") ||
    name.includes("rime")
  ) {
    return <RainyIcon size={size} color={iconColor || "#a0e9ff"} />;
  }

  if (name.includes("thunderstorm")) {
    return <RainyIcon size={size} color={iconColor || "#ffcc00"} />;
  }

  // Default fallback
  return <SunnyIcon size={size} color={iconColor || "#cccccc"} />;
};

export default WeatherIconMapper;
