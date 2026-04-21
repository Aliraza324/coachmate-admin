import { Doughnut } from 'react-chartjs-2'
import { riskAlerts } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

const data = {
  labels: riskAlerts.labels,
  datasets: [
    {
      data: riskAlerts.values,
      backgroundColor: riskAlerts.colors,
      borderWidth: 0,
      spacing: 2,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '55%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      padding: 10,
      displayColors: false,
      callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` },
    },
  },
}

export function RiskAlerts() {
  const [high, medium, low] = riskAlerts.values
  return (
    <Card>
      <CardHeader title="Risk Alerts Summary" />
      <div className="relative h-56">
        <Doughnut data={data} options={options} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-cyan-brand">{low}%</p>
          <p className="text-xs text-ink-muted">Low Risk</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-5 text-xs">
        <Legend color={riskAlerts.colors[0]} label="High Risk" value={`${high}%`} />
        <Legend color={riskAlerts.colors[1]} label="Medium Risk" value={`${medium}%`} />
        <Legend color={riskAlerts.colors[2]} label="Low Risk" value={`${low}%`} />
      </div>
    </Card>
  )
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}
