import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ForecastCard from '../components/ForecastCard';
import LoadingScreen from '../components/LoadingScreen';
import WeatherCard from '../components/WeatherCard';
import { getForecastData, getWeatherData } from '../services/weatherAPI';
import { ForecastData, LocationCoords, WeatherData } from '../types/weather';

export default function App(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationCoords | null>(null);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a tu ubicación para mostrar el clima local.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<LocationCoords | null> => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const loadWeatherData = async (): Promise<void> => {
    try {
      setLoading(true);
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const coords = await getCurrentLocation();
      if (!coords) {
        Alert.alert('Error', 'No se pudo obtener la ubicación');
        setLoading(false);
        return;
      }

      setLocation(coords);

      // Obtener datos del clima actual
      const weather = await getWeatherData(coords.latitude, coords.longitude);
      setWeatherData(weather);

      // Obtener pronóstico de 5 días
      const forecast = await getForecastData(coords.latitude, coords.longitude);
      setForecastData(forecast);

    } catch (error) {
      console.error('Error loading weather data:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos del clima');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    loadWeatherData();
  };

  const getBackgroundColors = (): [string, string] => {
    if (!weatherData) return ['#74b9ff', '#0984e3'];
    
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].main.toLowerCase();
    
    if (weather.includes('rain') || weather.includes('drizzle')) {
      return ['#636e72', '#2d3436'];
    } else if (weather.includes('snow')) {
      return ['#b2bec3', '#636e72'];
    } else if (weather.includes('clear')) {
      if (temp > 25) {
        return ['#fdcb6e', '#e17055']; // Soleado y caliente
      } else {
        return ['#74b9ff', '#0984e3']; // Soleado y fresco
      }
    } else if (weather.includes('cloud')) {
      return ['#81ecec', '#00b894'];
    } else {
      return ['#74b9ff', '#0984e3']; // Default
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient colors={getBackgroundColors()} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}
        
        {forecastData && (
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>Pronóstico de 5 días</Text>
            {forecastData.list
              .filter((item, index) => index % 8 === 0) // Uno por día
              .slice(0, 5)
              .map((item, index) => (
                <ForecastCard key={index} forecastData={item} />
              ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  forecastSection: {
    padding: 20,
    marginTop: 10,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});