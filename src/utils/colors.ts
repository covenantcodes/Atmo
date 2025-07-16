const lightColors = {
  primaryColor: '#22A37C',
  secondaryColor: '#1a785aff',
  primaryBg: "#E2FFF6",
  white: '#ffffff',
  background: '#FAFAFA',
  black: '#000000',
  red: '#DA100B',
  gray: '#656565',      
  gray2: '#6B777F',
  gray3: '#505050',
  gray4: '#718096',
  gray5: '#E5E7EB',
  blue: '#2563EB',
  deepBlue:'#0C263A',
  orange: '#E99B36'
};

const darkColors = {
  primaryColor: '#22A37C',
  secondaryColor: '#1b644dff',
  primaryBg: "#1A2E25",
  white: '#fff',
  background: '#121212',
  black: '#ffffff',
  red: '#FF6B6B',
  gray: '#A0A0A0',      
  gray2: '#8A9BA8',
  gray3: '#B0B0B0',
  gray4: '#9CA3AF',
  gray5: '#374151',
  blue: '#60A5FA',
  deepBlue:'#4867bbff',
  orange: '#F59E0B'
};

export const getColors = (colorScheme: 'light' | 'dark' | null | undefined) => {
  return colorScheme === 'dark' ? darkColors : lightColors;
};

// Keep the original export for backward compatibility
export default lightColors;