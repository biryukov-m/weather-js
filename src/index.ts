import './styles/style.scss';
import './styles/tailwind.css';
import { debounce } from 'lodash';

import { Chart, ChartTypeRegistry, Point, BubbleDataPoint } from 'chart.js';
import { WeatherService } from './Weather.service';
import { serializeApiWeather, IWeather } from './types/weather.types';
import { getWindDirection } from './utils/getWindDirection';
import {
  IForecast,
  serializeForecast,
  serializeForecastChart
} from './types/forecast.types';
import getWeatherChart from './utils/getWeatherChart';

const SEARCH_INPUT = document.querySelector('#search') as HTMLInputElement;
const CURRENT_TEMP = document.querySelector('#temp') as HTMLElement;
const LOCATION = document.querySelector('#location') as HTMLElement;
const TIME = document.querySelector('#time') as HTMLElement;
const WEATHER_DESCR = document.querySelector('#weather') as HTMLElement;
const DAILY_TEMP = document.querySelector('#daily-temp') as HTMLElement;
const FORECAST_DAY = document.querySelector('#forecast-day') as HTMLElement;
const FORECAST_TIME = document.querySelector('#forecast-time') as HTMLElement;
const FORECAST_DATE = document.querySelector('#forecast-date') as HTMLElement;
const DAILY_HUMIDITY = document.querySelector('#humidity') as HTMLElement;
const SUNSET_TIME = document.querySelector('#sunset-time') as HTMLElement;
const SUNRISE_TIME = document.querySelector('#sunrise-time') as HTMLElement;
const DAILY_PRESSURE = document.querySelector('#pressure') as HTMLElement;
const WIND_SPEED = document.querySelector('#speed') as HTMLElement;
const WIND_DIRECTION = document.querySelector('#direction') as HTMLElement;

const renderWeather = (weatherArgs: IWeather) => {
  const {
    country,
    city,
    sunrise,
    sunset,
    dt,
    temp,
    tempMax,
    weather,
    humidity,
    pressure,
    windSpeed,
    windDeg
  } = weatherArgs;
  CURRENT_TEMP.innerHTML = temp;
  LOCATION.innerHTML = `${city}, ${country}`;
  TIME.innerText = dt.toLocaleString() || '';
  WEATHER_DESCR.innerText = weather.join(' ,');
  DAILY_TEMP.innerText = tempMax;
  DAILY_HUMIDITY.innerText = humidity;
  SUNSET_TIME.innerText = sunset || '';
  SUNRISE_TIME.innerText = sunrise || '';
  DAILY_PRESSURE.innerText = pressure;
  FORECAST_DAY.innerText =
    dt.toLocaleDateString(undefined, { weekday: 'long' }) || '';
  FORECAST_TIME.innerText =
    dt.toLocaleTimeString(undefined, { timeStyle: 'short' }) || '';
  FORECAST_DATE.innerText = dt.toLocaleDateString() || '';
  WIND_SPEED.innerText = windSpeed;
  WIND_DIRECTION.innerText = getWindDirection(Number(windDeg));
};
const renderForecast = (forecast: IForecast) => {
  forecast.forEach((item, idx) => {
    const CONTAINER = document.querySelector(`[data-id="forecast-${idx}"]`);
    const DAY = CONTAINER?.querySelector('[data-id="day"]') as HTMLElement;
    DAY.innerText = item.date.toLocaleDateString(undefined, {
      weekday: 'short'
    });

    DAY.innerText = item.date.toLocaleDateString();
  });
};

let chart: Chart<
  keyof ChartTypeRegistry,
  (number | Point | [number, number] | BubbleDataPoint | null)[],
  unknown
>;

const searchHandler = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { value: searchValue } = target;
  const weatherService = new WeatherService();
  weatherService
    .fetchWeather(searchValue)
    .then((response) => serializeApiWeather(response))
    .then((serialized) => renderWeather(serialized));
  weatherService.fetchForecast(searchValue).then((response) => {
    renderForecast(serializeForecast(response));
    if (chart) {
      chart.destroy();
    }
    const serializedForecast = serializeForecastChart(response);
    chart = getWeatherChart(serializedForecast);
    chart.render();
  });
};

const debouncedSearchHandler = debounce(searchHandler, 1200);

SEARCH_INPUT.oninput = (e) => {
  debouncedSearchHandler(e);
};
