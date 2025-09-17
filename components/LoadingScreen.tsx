import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoadingScreen: React.FC = () => {
  return (
    <LinearGradient colors={['#74b9ff', '#0984e3']} style={styles.container}>
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.content}>
        <Ionicons name="partly-sunny" size={80} color="white" />
        <Text style={styles.title}>WeatherApp</Text>
        <Text style={styles.subtitle}>Obteniendo tu ubicación...</Text>
        <ActivityIndicator size="large" color="white" style={styles.loader} />
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoadingScreen;