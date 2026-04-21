import { Line } from 'react-chartjs-2'
import { revenueOverview } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

function buildGradient(ctx) {
  const { chartArea, ctx: c } = ctx.chart
  if (!chartArea) return 'rgba(34,169,240,0.2)'
  const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
  gradient.addColorStop(0, 'rgba(34,169,240,0.35)')
  gradient.addColorStop(1, 'rgba(34,169,240,0.02)')
  return gradient
}

const data = {
  labels: revenueOverview.labels,
  datasets: [
    {
      data: revenueOverview.values,
      borderColor: '#22A9F0',
      borderWidth: 2,
      backgroundColor: buildGradient,
      fill: true,
      tension: 0.4,
      pointRadius: revenueOverview.values.map((_, i) => (i === 4 ? 5 : 0)),
      pointBackgroundColor: '#22A9F0',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      padding: 10,
      displayColors: false,
      callbacks: { label: (ctx) => `$${ctx.parsed.y.toLocaleString()}` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 11 } },
    },
    y: {
      grid: { color: '#F1F5F9' },
      border: { display: false },
      ticks: {
        color: '#94A3B8',
        font: { size: 11 },
        callback: (v) => `${v / 1000}k`,
      },
    },
  },
}

export function RevenueOverview() {
  return (
    <Card>
      <CardHeader
        title="Revenue Overview"
        subtitle="Visualize monthly revenue performance and trends."
      />
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </Card>
  )
}
