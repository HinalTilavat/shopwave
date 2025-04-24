import React, { useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const { width, height } = Dimensions.get('window');

export const AnimatedSplashScreen = () => {

    const { isAuthenticated, user } = useAuth();
  // Animated values
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const containerOpacity = new Animated.Value(1);

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo appears and scales up
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Text fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        delay: 200,
      }),
      
      // Hold for a moment
      Animated.delay(1200),
      
      // Fade out the entire screen
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Check if the user is authenticated or ID is stored
      if (isAuthenticated) {
        router.replace('/(tabs)/profile');
      } else {
        router.replace('/login');
      }
    });
  }, []);

  return (
    <Animated.View style={[
      styles.container,
      { opacity: containerOpacity }
    ]}>
      <LinearGradient
        colors={['#7209B7', '#3A0CA3', '#4361EE']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animated.View style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity
            }
          ]}>
            <ShoppingBag size={80} color="#ffffff" />
          </Animated.View>
          
          <Animated.View style={{ opacity: textOpacity }}>
            <Text style={styles.title}>ShopWave</Text>
            <Text style={styles.subtitle}>Your Premium Shopping Experience</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});