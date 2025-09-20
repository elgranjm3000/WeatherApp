export const WEATHER_CONDITIONS = {
  CLEAR: 'clear',
  CLOUDS: 'clouds',
  RAIN: 'rain',
  DRIZZLE: 'drizzle',
  THUNDERSTORM: 'thunderstorm',
  SNOW: 'snow',
  MIST: 'mist',
  FOG: 'fog',
} as const;

export const WEATHER_ICONS = {
  [WEATHER_CONDITIONS.CLEAR]: 'sunny',
  [WEATHER_CONDITIONS.CLOUDS]: 'cloudy',
  [WEATHER_CONDITIONS.RAIN]: 'rainy',
  [WEATHER_CONDITIONS.DRIZZLE]: 'rainy',
  [WEATHER_CONDITIONS.THUNDERSTORM]: 'thunderstorm',
  [WEATHER_CONDITIONS.SNOW]: 'snow',
  [WEATHER_CONDITIONS.MIST]: 'cloudy',
  [WEATHER_CONDITIONS.FOG]: 'cloudy',
} as const;

export const BACKGROUND_GRADIENTS = {
  DEFAULT: ['#74b9ff', '#0984e3'],
  RAIN: ['#636e72', '#2d3436'],
  SNOW: ['#b2bec3', '#636e72'],
  CLEAR_HOT: ['#fdcb6e', '#e17055'],
  CLEAR_COOL: ['#74b9ff', '#0984e3'],
  CLOUDS: ['#81ecec', '#00b894'],
} as const;

export const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] as const;