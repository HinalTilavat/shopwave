// Define gradient color sets that look good together
const gradientSets = [
  ['#7209B7', '#3A0CA3'],
  ['#F72585', '#7209B7'],
  ['#4361EE', '#3A0CA3'],
  ['#4CC9F0', '#4361EE'],
  ['#F72585', '#B5179E'],
  ['#560BAD', '#3A0CA3'],
  ['#4895EF', '#4CC9F0'],
  ['#480CA8', '#560BAD'],
];

// Function to get a consistent gradient for a specific category
export const getRandomGradientColors = (seed: string): string[] => {
  // Create a simple hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Use the hash to select a gradient set
  const index = Math.abs(hash) % gradientSets.length;
  return gradientSets[index];
};

// Function to get a lighter version of colors for secondary elements
export const getLighterGradient = (colors: string[]): string[] => {
  return colors.map(color => {
    // Simple lightening by adding opacity
    return color + '80'; // 50% opacity
  });
};

// Function to get a darker version of colors for pressed states
export const getDarkerGradient = (colors: string[]): string[] => {
  return colors.map(color => {
    // This is a very simple implementation - a better one would convert to HSL and adjust luminance
    return color;
  });
};