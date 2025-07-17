import {
  getWindDirection,
  getPressureLevel,
  getUVIndexLevel,
} from "../services/weatherService";
import type { WeatherData } from "../services/weatherService";

export type WeatherDetailItem = {
  key: string;
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  subtext?: string;
};

export function buildWeatherDetails(weatherData: WeatherData | null): WeatherDetailItem[] {
  return [
    {
      key: "wind",
      label: "Wind",
      value: weatherData ? weatherData.windSpeed : 0,
      suffix: " km/h",
      subtext: weatherData ? getWindDirection(weatherData.windDirection) : "--",
      decimals: 1,
    },
    {
      key: "humidity",
      label: "Humidity",
      value: weatherData ? weatherData.humidity : 0,
      suffix: "%",
      decimals: 0,
    },
    {
      key: "pressure",
      label: "Pressure",
      value: weatherData ? weatherData.pressure : 0,
      suffix: " hPa",
      subtext: weatherData ? getPressureLevel(weatherData.pressure) : "--",
      decimals: 0,
    },
    {
      key: "uv",
      label: "UV Index",
      value: weatherData ? weatherData.uvIndex : 0,
      suffix: "",
      subtext: weatherData ? getUVIndexLevel(weatherData.uvIndex) : "--",
      decimals: 0,
    },
    {
      key: "visibility",
      label: "Visibility",
      value: weatherData ? weatherData.visibility / 1000 : 0,
      suffix: " km",
      decimals: 1,
    },
    {
      key: "feelsLike",
      label: "Feels Like",
      value: weatherData ? weatherData.apparentTemperature : 0,
      suffix: "°C",
      decimals: 0,
    },
  ];
}