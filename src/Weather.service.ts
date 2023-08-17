export class WeatherService {
  private readonly baseUrl = new URL(
    'https://api.openweathermap.org/data/2.5/'
  );

  private readonly key = '8e30e790caed8d1d88a2fa47cdcc5426';

  private appendKeyToUrl(url: URL) {
    url.searchParams.append('appid', this.key);
    return url;
  }

  async fetchWeather(searchInput: string) {
    const url = new URL(this.baseUrl);
    url.pathname += 'weather';
    url.searchParams.append('q', searchInput);
    url.searchParams.append('units', 'metric');
    const urlWithKey = this.appendKeyToUrl(url);
    const response = await fetch(urlWithKey);
    return response.json();
  }

  async fetchForecast(searchInput: string, days = '7') {
    const url = new URL(this.baseUrl);
    url.pathname += 'forecast';
    url.searchParams.append('q', searchInput);
    url.searchParams.append('cnt', days);
    url.searchParams.append('units', 'metric');
    const urlWithKey = this.appendKeyToUrl(url);
    const response = await fetch(urlWithKey);
    return response.json();
  }
}
