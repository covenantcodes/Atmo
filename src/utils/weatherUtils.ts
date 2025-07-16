
export interface WeatherGradientColors {
  colors: readonly [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

// export const getBackgroundColors = (weatherCode: number): WeatherGradientColors => {
//   // Sunny conditions (0-3)
//   if (weatherCode >= 0 && weatherCode <= 3) {
//     if (weatherCode === 0) {
//       // Clear sky - bright sunny gradient
//       return {
//         colors: ['#FFD700', '#FFA500', '#FF6347'] as const,
//         start: { x: 0, y: 0 },
//         end: { x: 1, y: 1 },
//       };
//     } else {
//       // Partly cloudy - sunny with some clouds
//       return {
//         colors: ['#87CEEB', '#FFD700', '#FFA500'] as const,
//         start: { x: 0, y: 0 },
//         end: { x: 1, y: 1 },
//       };
//     }
//   }

//   // Foggy conditions (45-48)
//   if (weatherCode >= 45 && weatherCode <= 48) {
//     return {
//       colors: ['#708090', '#C0C0C0', '#DCDCDC'] as const,
//       start: { x: 0, y: 0 },
//       end: { x: 1, y: 1 },
//     };
//   }

//   // Drizzle conditions (51-57)
//   if (weatherCode >= 51 && weatherCode <= 57) {
//     return {
//       colors: ['#4682B4', '#708090', '#778899'] as const,
//       start: { x: 0, y: 0 },
//       end: { x: 1, y: 1 },
//     };
//   }

//   // Rain conditions (61-67, 80-82)
//   if ((weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
//     return {
//       colors: ['#191970', '#4169E1', '#1E90FF'] as const,
//       start: { x: 0, y: 0 },
//       end: { x: 1, y: 1 },
//     };
//   }

//   // Snow conditions (71-77, 85-86)
//   if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
//     return {
//       colors: ['#E6E6FA', '#F0F8FF', '#FFFFFF'] as const,
//       start: { x: 0, y: 0 },
//       end: { x: 1, y: 1 },
//     };
//   }

//   // Thunderstorm conditions (95-99)
//   if (weatherCode >= 95 && weatherCode <= 99) {
//     return {
//       colors: ['#2C2C54', '#40407A', '#6C5CE7'] as const,
//       start: { x: 0, y: 0 },
//       end: { x: 1, y: 1 },
//     };
//   }

//   // Default cloudy gradient
//   return {
//     colors: ['#696969', '#A9A9A9', '#D3D3D3'] as const,
//     start: { x: 0, y: 0 },
//     end: { x: 1, y: 1 },
//   };
// };

export const getBackgroundColors = (weatherCode: number): WeatherGradientColors => {
  // Sunny/Clear (0-3)
  if (weatherCode >= 0 && weatherCode <= 3) {
    return {
      colors: ['#FFA500', '#FF6347', '#FFD700'] as const, // Orange gradient
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  }

  // Rainy (51-67, 80-82)
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return {
      colors: ['#1e3a8a', '#1e40af', '#3b82f6'] as const, // Dark blue gradient
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  }

  // Snow (71-77, 85-86)
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
    return {
      colors: ['#e2e8f0', '#f1f5f9', '#ffffff'] as const, // White/light gray gradient
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  }

  // Thunderstorm (95-99)
  if (weatherCode >= 95 && weatherCode <= 99) {
    return {
      colors: ['#111827', '#374151', '#6b7280'] as const, // Very dark gradient
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    };
  }

  // Default: Cloudy (everything else - fog, drizzle, partly cloudy, etc.)
  return {
    colors: ['#60a5fa', '#93c5fd', '#dbeafe'] as const, // Light blue/white gradient
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  };
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