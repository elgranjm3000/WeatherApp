import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getWeatherIcon = (weatherMain: string): keyof typeof Ionicons.glyphMap => {
    const weather = weatherMain.toLowerCase();
    if (weather.includes('clear')) return 'sunny';
    if (weather.includes('cloud')) return 'cloudy';
    if (weather.includes('rain')) return 'rainy';
    if (weather.includes('drizzle')) return 'rainy';
    if (weather.includes('thunderstorm')) return 'thunderstorm';
    if (weather.includes('snow')) return 'snow';
    if (weather.includes('mist') || weather.includes('fog')) return 'cloudy';
    return 'partly-sunny';
  };

  // Verificar que weatherData existe y tiene la estructura esperada
  if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error cargando datos del clima</Text>
      </View>
    );
  }

  return (
    <Animatable.View animation="fadeInUp" duration={1000} style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="white" />
        <Text style={styles.locationText}>{weatherData.name || 'Ubicación desconocida'}</Text>
      </View>

      <View style={styles.mainWeatherContainer}>
        <Ionicons
          name={getWeatherIcon(weatherData.weather[0].main)}
          size={120}
          color="white"
        />
        <Text style={styles.temperature}>
          {Math.round(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.weatherDescription}>
          {weatherData.weather[0].description}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="thermometer" size={24} color="white" />
          <Text style={styles.detailLabel}>Sensación térmica</Text>
          <Text style={styles.detailValue}>
            {Math.round(weatherData.main.feels_like)}°C
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="water" size={24} color="white" />
          <Text style={styles.detailLabel}>Humedad</Text>
          <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="eye" size={24} color="white" />
          <Text style={styles.detailLabel}>Visibilidad</Text>
          <Text style={styles.detailValue}>
            {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'} km
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="speedometer" size={24} color="white" />
          <Text style={styles.detailLabel}>Presión</Text>
          <Text style={styles.detailValue}>{weatherData.main.pressure} hPa</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  locationText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  weatherDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  detailItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default WeatherCard;