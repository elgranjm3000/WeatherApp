import axios from 'axios';
import { ForecastData, WeatherData } from '../types/weather';

const API_KEY: string = '85cb1abbbab6c1045823549232c36d9f'; // Reemplaza con tu API key
const BASE_URL: string = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Para Celsius
        lang: 'es', // Idioma español
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecastData = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getWeatherByCity = async (cityName: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};