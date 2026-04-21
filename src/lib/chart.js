import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  Filler,
  Tooltip,
  Legend,
)

Chart.defaults.font.family =
  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
Chart.defaults.color = '#64748B'
Chart.defaults.borderColor = '#E6E9EF'
