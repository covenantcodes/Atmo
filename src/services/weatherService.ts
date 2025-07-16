import axios from 'axios';

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  cloudCover: number;
  dewPoint: number;
  apparentTemperature: number;
  timestamp: string;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
    winddirection_10m: number;
    relativehumidity_2m: number;
    precipitation: number;
    pressure_msl: number;
    visibility: number;
    uv_index: number;
    cloudcover: number;
    dewpoint_2m: number;
    apparent_temperature: number;
    time: string;
  };
}


const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m,relativehumidity_2m,precipitation,pressure_msl,visibility,uv_index,cloudcover,dewpoint_2m,apparent_temperature';

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    console.log('🌤️ Fetching enhanced weather data from:', WEATHER_URL);
    
    const response = await axios.get<WeatherResponse>(WEATHER_URL, {
      timeout: 15000, // Increased timeout for more data
    });

    console.log('📡 Raw API Response:', JSON.stringify(response.data, null, 2));
    
    const { current } = response.data;
    
    const weatherData: WeatherData = {
      temperature: current.temperature_2m,
      weatherCode: current.weathercode,
      windSpeed: current.windspeed_10m,
      windDirection: current.winddirection_10m,
      humidity: current.relativehumidity_2m,
      precipitation: current.precipitation,
      pressure: current.pressure_msl,
      visibility: current.visibility,
      uvIndex: current.uv_index,
      cloudCover: current.cloudcover,
      dewPoint: current.dewpoint_2m,
      apparentTemperature: current.apparent_temperature,
      timestamp: current.time,
    };

    console.log('✅ Enhanced weather data:', weatherData);
    
    return weatherData;
  } catch (error) {
    console.error('❌ Weather API Error:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('📊 Axios error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw new Error(`Weather API Error: ${error.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
};

// Helper functions for the new data
export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUVIndexLevel = (uvIndex: number): string => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

export const getVisibilityLevel = (visibility: number): string => {
  if (visibility >= 10000) return 'Excellent';
  if (visibility >= 5000) return 'Good';
  if (visibility >= 2000) return 'Moderate';
  if (visibility >= 1000) return 'Poor';
  return 'Very Poor';
};

export const getPressureLevel = (pressure: number): string => {
  if (pressure > 1020) return 'High';
  if (pressure > 1000) return 'Normal';
  return 'Low';
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

  const condition = weatherConditions[weatherCode] || 'Unknown weather condition';
  console.log(`🌤️ Weather condition for code ${weatherCode}:`, condition);
  
  return condition;
};