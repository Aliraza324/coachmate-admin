import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Ban,
  UserPlus,
  Mail,
  Phone,
  ArrowLeft,
  Plus,
  Eye,
  Pencil,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { athletes, workoutCompletionRate, recentWorkouts } from '@/data/athletesData'

const TABS = [
  'Overview',
  'Workouts',
  'Nutrition',
  'Progress',
  'Injury & Pre-Hab',
  'Messages',
  'Subscription',
]

const workoutStatusStyles = {
  Completed: 'bg-emerald-50 text-emerald-600',
  'In Progress': 'bg-amber-50 text-amber-600',
  Missed: 'bg-rose-50 text-rose-500',
}

export function AthleteProfile({ athleteId, onBack }) {
  const athlete = athletes.find((a) => a.id === athleteId) ?? athletes[0]
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Athletes
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Athlete Profile</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
            >
              <Ban size={16} />
              Suspend
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <UserPlus size={16} />
              Assign Coach
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">{athlete.name}</h2>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {athlete.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-ink">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-ink-muted" />
              <span>{athlete.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-ink-muted" />
              <span>{athlete.phone}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === tab
                  ? 'border-cyan-brand text-cyan-brand'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {activeTab === 'Overview' && <OverviewTab athlete={athlete} />}
      {activeTab === 'Workouts' && <WorkoutsTab />}
      {activeTab !== 'Overview' && activeTab !== 'Workouts' && (
        <Card>
          <p className="py-12 text-center text-sm text-ink-muted">
            {activeTab} content coming soon.
          </p>
        </Card>
      )}
    </div>
  )
}

function OverviewTab({ athlete }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
        <InfoCard title="Personal Info">
          <dl className="space-y-2 text-sm">
            <InfoRow label="Age:" value={athlete.age} />
            <InfoRow label="Gender:" value={athlete.gender} />
            <InfoRow label="Height:" value={athlete.height} />
            <InfoRow label="Weight:" value={athlete.weight} />
          </dl>
        </InfoCard>

        <InfoCard title="Fitness Goals">
          <div className="flex flex-wrap gap-2">
            {athlete.goals.map((goal, i) => (
              <span
                key={goal}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  i % 2 === 0
                    ? 'bg-sky-50 text-sky-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {goal}
              </span>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Assigned Coach">
          {athlete.assignedCoach ? (
            <div className="flex items-center gap-3">
              <img
                src={athlete.assignedCoach.avatar}
                alt={athlete.assignedCoach.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-ink">{athlete.assignedCoach.name}</div>
                <div className="text-xs text-ink-muted">{athlete.assignedCoach.title}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">No coach assigned</p>
          )}
        </InfoCard>
      </div>

      <div className="rounded-2xl border border-border bg-slate-50 p-5">
        <h3 className="text-base font-semibold text-ink">Subscription</h3>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink">{athlete.plan}</p>
            <p className="mt-1 text-sm text-ink-muted">Renewal Date: {athlete.renewalDate}</p>
          </div>
          <span className="inline-flex self-start rounded-md bg-cyan-brand px-3 py-1.5 text-xs font-semibold text-white">
            {athlete.status}
          </span>
        </div>
      </div>
    </div>
  )
}

function WorkoutsTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <h3 className="text-base font-semibold text-ink">Workout Completion Rate</h3>
        <div className="mt-4 h-64">
          <Line data={lineData} options={lineOptions} />
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-ink">Recent Workouts</h3>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-cyan-brand px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600"
          >
            <Plus size={16} />
            Add Workout
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-ink-muted">
                <th className="rounded-l-lg py-3 pl-4 pr-4 font-medium">Workout Name</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Duration</th>
                <th className="rounded-r-lg py-3 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentWorkouts.map((workout) => (
                <tr key={workout.id} className="border-t border-border">
                  <td className="py-4 pl-4 pr-4">
                    <div className="font-medium text-ink">{workout.name}</div>
                    <div className="text-xs text-ink-muted">{workout.type}</div>
                  </td>
                  <td className="py-4 pr-4 text-ink-muted">{workout.date}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${workoutStatusStyles[workout.status]}`}
                    >
                      {workout.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-ink-muted">{workout.duration}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3 text-cyan-brand">
                      <button type="button" aria-label="View" className="hover:text-cyan-600">
                        <Eye size={18} />
                      </button>
                      <button type="button" aria-label="Edit" className="hover:text-cyan-600">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  )
}

const lineData = {
  labels: workoutCompletionRate.labels,
  datasets: [
    {
      data: workoutCompletionRate.values,
      borderColor: '#22A9F0',
      backgroundColor: 'rgba(34, 169, 240, 0.12)',
      borderWidth: 2,
      fill: true,
      tension: 0.35,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
  ],
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      padding: 10,
      displayColors: false,
      callbacks: { label: (ctx) => `${ctx.parsed.y}%` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 11 } },
    },
    y: {
      min: 75,
      max: 100,
      grid: { color: '#F1F5F9' },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 5 },
    },
  },
}
