import { Bar } from 'react-chartjs-2'
import { workoutActivity } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

const HIGHLIGHT_INDEX = 8

const data = {
  labels: workoutActivity.labels,
  datasets: [
    {
      data: workoutActivity.values,
      backgroundColor: workoutActivity.values.map((_, i) =>
        i === HIGHLIGHT_INDEX ? '#22A9F0' : '#E6E9EF',
      ),
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 22,
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
      callbacks: { label: (ctx) => `From ${ctx.parsed.y} $` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 11 } },
    },
    y: { display: false, beginAtZero: true },
  },
}

export function WorkoutActivity() {
  return (
    <Card>
      <CardHeader
        title="Workout Activity"
        subtitle="Monitor workout engagement and completion rates."
      />
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </Card>
  )
}
