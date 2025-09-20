import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ForecastCard = ({ forecastData }) => {
  const getWeatherIcon = (weatherMain) => {
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

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{getDayName(forecastData.dt_txt)}</Text>
      
      <View style={styles.weatherInfo}>
        <Ionicons
          name={getWeatherIcon(forecastData.weather[0].main)}
          size={32}
          color="white"
        />
        <Text style={styles.description}>
          {forecastData.weather[0].description}
        </Text>
      </View>

      <View style={styles.temperatureContainer}>
        <Text style={styles.tempMax}>
          {Math.round(forecastData.main.temp_max)}°
        </Text>
        <Text style={styles.tempMin}>
          {Math.round(forecastData.main.temp_min)}°
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: 40,
  },
  weatherInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 10,
    textTransform: 'capitalize',
    flex: 1,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempMax: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  tempMin: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default ForecastCard;