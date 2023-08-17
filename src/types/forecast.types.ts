export interface IForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export const serializeForecast = (forecastApiResponse: IForecastResponse) => {
  return forecastApiResponse.list.map(({ dt, main: dayMain, weather }) => ({
    date: new Date(dt),
    temp: dayMain.temp.toString(),
    temp_min: dayMain.temp_min.toString(),
    temp_max: dayMain.temp_max.toString(),
    weather: weather.map(({ main, icon, description }) => ({
      main,
      icon,
      description
    }))
  }));
};

export type IForecast = ReturnType<typeof serializeForecast>;
