import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { IForecastChart } from '../types/forecast.types';

Chart.register(
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

const selectorCtx = document.querySelector('canvas#chart') as HTMLCanvasElement;
const context = selectorCtx.getContext('2d') as CanvasRenderingContext2D;

export const drawWeatherChart = (forecast: IForecastChart) => {
  // Sample data for the line graph
  const labels = forecast.map(({ date }) => date);
  const dataset = forecast.map(({ temp }) => temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp',
        data: dataset,
        borderColor: 'rgb(59 130 246)',
        fill: true
      }
    ]
  };

  // Create the line chart
  const lineChartConfig: ChartConfiguration = {
    type: 'line',
    data,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: true } }
      },
      plugins: {
        tooltip: {
          enabled: true,
          intersect: false,
          mode: 'nearest',
          callbacks: {
            title: () => 'title',
            label: (item) => `${item.parsed}%`
          }
        }
      }
    }
  };
  const initChart = () => new Chart(context, lineChartConfig);

  initChart();
};
