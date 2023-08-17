export interface IWeatherApiResponse {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{ description: string }>;
  wind: { deg: number; speed: number };
}

export type IWeather = ReturnType<typeof serializeApiWeather>;

export const serializeApiWeather = (apiResponse: IWeatherApiResponse) => {
  return {
    city: apiResponse.name.toString(),
    country: apiResponse.sys.country.toString(),
    dt: new Date(apiResponse.dt * 1000),
    feelsLike: Math.round(apiResponse.main.feels_like).toString(),
    humidity: apiResponse.main.humidity.toString(),
    pressure: apiResponse.main.pressure.toString(),
    sunrise: new Date(apiResponse.sys.sunrise * 1000).toLocaleTimeString(
      undefined,
      { timeStyle: 'short' }
    ),
    sunset: new Date(apiResponse.sys.sunset * 1000).toLocaleTimeString(
      undefined,
      { timeStyle: 'short' }
    ),
    temp: Math.round(apiResponse.main.temp).toString(),
    tempMax: Math.round(apiResponse.main.temp_max).toString(),
    tempMin: Math.round(apiResponse.main.temp_min).toString(),
    weather: apiResponse.weather.map((item) => item.description),
    windDeg: apiResponse.wind.deg.toString(),
    windSpeed: apiResponse.wind.speed.toString()
  };
};
