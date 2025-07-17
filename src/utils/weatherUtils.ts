export interface WeatherGradientColors {
  colors: readonly [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
}


export const getBackgroundColors = (weatherCode: number, colorScheme?: 'light' | 'dark' | null): WeatherGradientColors => {
  
  const primaryColor = '#22A37C';
  const secondaryColor = '#1a785aff';
  const deepBlue = '#4867bbff';
  const primaryBg = '#a0ffe1ff';

  // Use the same logic as splash screen
  if (colorScheme === 'dark') {
    return {
      colors: [primaryColor, secondaryColor, deepBlue] as const,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  } else {
    return {
      colors: [primaryBg, primaryColor, secondaryColor] as const,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  }
};

export const getWeatherIcon = (weatherCode: number): string => {
  // Simple emoji mapping for weather icons
  if (weatherCode === 0) return '☀️';
  if (weatherCode >= 1 && weatherCode <= 3) return '⛅';
  if (weatherCode >= 45 && weatherCode <= 48) return '🌫️';
  if (weatherCode >= 51 && weatherCode <= 57) return '🌦️';
  if ((weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) return '🌧️';
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return '❄️';
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
  return '☁️'; // Default cloudy
};