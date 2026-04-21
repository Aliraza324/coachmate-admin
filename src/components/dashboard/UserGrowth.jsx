import { Line } from 'react-chartjs-2'
import { userGrowth } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

const data = {
  labels: userGrowth.labels,
  datasets: [
    {
      label: 'Athlete',
      data: userGrowth.athletes,
      borderColor: '#EF4444',
      backgroundColor: '#EF4444',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: 'Coach',
      data: userGrowth.coaches,
      borderColor: '#22A9F0',
      backgroundColor: '#22A9F0',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
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
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
      },
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

export function UserGrowth() {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-ink">User Growth Overview</h3>
          <p className="mt-0.5 text-xs text-ink-muted">
            Track growth trends of athletes and coaches over time.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <LegendDot color="#EF4444" label="Athlete" />
          <LegendDot color="#22A9F0" label="Coach" />
        </div>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </Card>
  )
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5 text-ink-muted">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}
