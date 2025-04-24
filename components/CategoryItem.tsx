import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { getRandomGradientColors } from '../utils/gradientUtils';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface CategoryItemProps {
  category: string;
  index: number;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, index }) => {
  const navigateToCategory = () => {
    router.push(`/products/${category}`);
  };

  const gradientColors = getRandomGradientColors(category);
  const delay = index * 100;

  return (
    <Animated.View 
      entering={FadeInRight.delay(delay).duration(400)}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={navigateToCategory}
        style={styles.touchable}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.content}>
            <Text style={styles.categoryName}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  touchable: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});