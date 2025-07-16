import axios from 'axios';

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  timestamp: string;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
    time: string;
  };
}

const BERLIN_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weathercode,windspeed_10m';

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherResponse>(BERLIN_WEATHER_URL, {
      timeout: 10000, 
    });

    const { current } = response.data;

    return {
      temperature: current.temperature_2m,
      weatherCode: current.weathercode,
      windSpeed: current.windspeed_10m,
      timestamp: current.time,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Weather API Error: ${error.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
};


export const getWeatherCondition = (weatherCode: number): string => {
  const weatherConditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return weatherConditions[weatherCode] || 'Unknown weather condition';
};