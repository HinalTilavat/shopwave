import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedSplashScreen } from '../components/AnimatedSplashScreen';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <AnimatedSplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});