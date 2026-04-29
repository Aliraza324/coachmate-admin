import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Ban, Mail, Phone, ArrowLeft, Loader2, Play, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import {
  useAthleteDetail,
  useSuspendAthlete,
  useUnsuspendAthlete,
  useDeleteAthlete,
} from '@/hooks/useAthletes'
import { useToast } from '@/components/ui/Toast'

const workoutStatusStyles = {
  completed: 'bg-emerald-50 text-emerald-600',
  'in progress': 'bg-amber-50 text-amber-600',
  missed: 'bg-rose-50 text-rose-500',
  scheduled: 'bg-sky-50 text-sky-600',
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
      min: 0,
      max: 100,
      grid: { color: '#F1F5F9' },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 20 },
    },
  },
}

function buildChartData(completion) {
  const labels = completion?.labels ?? []
  const values = completion?.values ?? []
  return {
    labels,
    datasets: [
      {
        data: values,
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
}

function formatWorkoutDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatDuration(minutes) {
  if (minutes == null) return '—'
  if (typeof minutes === 'string') return minutes
  return `${minutes} min`
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatMeasurement(m) {
  if (!m || m.value == null) return '—'
  return `${m.value} ${m.unit || ''}`.trim()
}

export function AthleteProfile({ athleteId, onBack }) {
  const toast = useToast()
  const { data, isLoading, isError, error } = useAthleteDetail(athleteId)
  const [suspendOpen, setSuspendOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [reason, setReason] = useState('')

  const suspendMutation = useSuspendAthlete({
    onSuccess: (res) => {
      toast.success(res?.message || 'Athlete suspended')
      setSuspendOpen(false)
      setReason('')
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to suspend athlete'),
  })

  const unsuspendMutation = useUnsuspendAthlete({
    onSuccess: (res) => toast.success(res?.message || 'Athlete unsuspended'),
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to unsuspend athlete'),
  })

  const deleteMutation = useDeleteAthlete({
    onSuccess: (res) => {
      toast.success(res?.message || 'Athlete deleted')
      onBack?.()
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to delete athlete'),
  })

  if (isLoading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-ink-muted">
        <Loader2 size={22} className="animate-spin" />
      </div>
    )
  }

  if (isError || !data?.data?.profile) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to Athletes
        </button>
        <Card>
          <p className="text-sm text-rose-500">
            {error?.data?.message || error?.message || 'Athlete not found'}
          </p>
        </Card>
      </div>
    )
  }

  const profile = data.data.profile
  const user = profile.user || {}
  const personal = profile.personalInfo || {}
  const fitness = profile.fitnessPlan || {}
  const coach = profile.assignedCoach
  const subscription = profile.subscription
  const isSuspended = user.isSuspended
  const completion = profile.workoutCompletionRate
  const recentWorkouts = profile.recentWorkouts || []
  const hasChart = completion && Array.isArray(completion.values) && completion.values.length > 0

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
            {isSuspended ? (
              <button
                type="button"
                disabled={unsuspendMutation.isPending}
                onClick={() => unsuspendMutation.mutate({ id: profile.athleteId })}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-70"
              >
                {unsuspendMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Play size={16} fill="currentColor" />
                )}
                Unsuspend
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSuspendOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
              >
                <Ban size={16} />
                Suspend
              </button>
            )}
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {personal.profilePhoto?.url ? (
                <img
                  src={personal.profilePhoto.url}
                  alt={user.fullName}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-soft text-2xl font-semibold text-cyan-brand">
                  {(user.fullName || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <span
                className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white ${
                  isSuspended ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">{user.fullName || 'Unnamed'}</h2>
              <span
                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isSuspended ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {isSuspended ? 'Suspended' : 'Active'}
              </span>
              {isSuspended && user.suspensionReason && (
                <p className="mt-1 text-xs text-rose-500">Reason: {user.suspensionReason}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-ink">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-ink-muted" />
              <span>{user.email || '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-ink-muted" />
              <span>{personal.phoneNumber || '—'}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
        <InfoCard title="Personal Info">
          <dl className="space-y-2 text-sm">
            <InfoRow label="Age:" value={personal.age ?? '—'} />
            <InfoRow label="Gender:" value={personal.gender || '—'} />
            <InfoRow label="Height:" value={formatMeasurement(personal.height)} />
            <InfoRow label="Weight:" value={formatMeasurement(personal.weight)} />
            <InfoRow label="DOB:" value={formatDate(personal.dateOfBirth)} />
          </dl>
        </InfoCard>

        <InfoCard title="Fitness Plan">
          <dl className="space-y-2 text-sm">
            <InfoRow label="Goal:" value={fitness.mainGoal || '—'} />
            <InfoRow label="Activity Level:" value={fitness.activityLevel || '—'} />
            <InfoRow label="Experience:" value={fitness.gymExperience || '—'} />
            <InfoRow label="Units:" value={fitness.unitSystem || '—'} />
            <InfoRow
              label="Profile:"
              value={fitness.isFitnessComplete ? 'Complete' : 'Incomplete'}
            />
          </dl>
        </InfoCard>

        <InfoCard title="Assigned Coach">
          {coach ? (
            <div className="space-y-1 text-sm">
              <div className="font-semibold text-ink">{coach.fullName}</div>
              <div className="text-xs text-ink-muted">{coach.email}</div>
              <div className="mt-2 text-xs text-ink-muted">
                Status: <span className="text-ink">{coach.status}</span>
              </div>
              <div className="text-xs text-ink-muted">Since: {formatDate(coach.since)}</div>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">No coach assigned</p>
          )}
        </InfoCard>
      </div>

      <div className="rounded-2xl border border-border bg-slate-50 p-5">
        <h3 className="text-base font-semibold text-ink">Subscription</h3>
        {subscription ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">{subscription.plan || 'Plan'}</p>
              <p className="mt-1 text-sm text-ink-muted">
                Renewal: {formatDate(subscription.renewalDate)}
              </p>
            </div>
            <span className="inline-flex self-start rounded-md bg-cyan-brand px-3 py-1.5 text-xs font-semibold text-white">
              {subscription.status || 'Active'}
            </span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">No active subscription</p>
        )}
      </div>

      <Card>
        <h3 className="text-base font-semibold text-ink">Workout Completion Rate</h3>
        {hasChart ? (
          <div className="mt-4 h-64">
            <Line data={buildChartData(completion)} options={lineOptions} />
          </div>
        ) : (
          <div className="mt-4 grid h-40 place-items-center rounded-xl border border-dashed border-border text-sm text-ink-muted">
            No workout completion data yet
          </div>
        )}
      </Card>

      <Card>
        <h3 className="text-base font-semibold text-ink">Recent Workouts</h3>
        {recentWorkouts.length === 0 ? (
          <div className="mt-4 grid h-24 place-items-center rounded-xl border border-dashed border-border text-sm text-ink-muted">
            No recent workouts
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs text-ink-muted">
                  <th className="rounded-l-lg py-3 pl-4 pr-4 font-medium">Workout Name</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="rounded-r-lg py-3 pr-4 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentWorkouts.map((workout) => {
                  const statusKey = (workout.status || '').toLowerCase()
                  return (
                    <tr
                      key={workout._id || workout.id || `${workout.name}-${workout.date}`}
                      className="border-t border-border"
                    >
                      <td className="py-4 pl-4 pr-4">
                        <div className="font-medium text-ink">{workout.name || '—'}</div>
                        {workout.type && (
                          <div className="text-xs text-ink-muted">{workout.type}</div>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-ink-muted">
                        {formatWorkoutDate(workout.date)}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            workoutStatusStyles[statusKey] ?? 'bg-slate-100 text-ink-muted'
                          }`}
                        >
                          {workout.status
                            ? workout.status.replace(/^\w/, (c) => c.toUpperCase())
                            : '—'}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-ink-muted">
                        {formatDuration(workout.duration)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {suspendOpen && (
        <Modal onClose={() => !suspendMutation.isPending && setSuspendOpen(false)}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300">
              <Ban size={32} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">Suspend Athlete</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              {user.fullName} will lose access until the suspension is lifted.
            </p>
          </div>
          <div className="mt-5">
            <p className="mb-1.5 text-sm font-medium text-[#0F172A]">
              Reason for Suspension (optional)
            </p>
            <textarea
              rows={2}
              placeholder="Please specify a reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full resize-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20 transition"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              disabled={suspendMutation.isPending}
              onClick={() => suspendMutation.mutate({ id: profile.athleteId, reason })}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {suspendMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Confirm
            </button>
            <button
              type="button"
              disabled={suspendMutation.isPending}
              onClick={() => setSuspendOpen(false)}
              className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {deleteOpen && (
        <Modal onClose={() => !deleteMutation.isPending && setDeleteOpen(false)}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
              <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">Delete Athlete</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Deleting {user.fullName} will remove their account, profile, and
              coach requests permanently. This action cannot be undone.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate({ id: profile.athleteId })}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {deleteMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Confirm
            </button>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => setDeleteOpen(false)}
              className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        {children}
      </div>
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
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="truncate text-right font-semibold text-ink">{value}</dd>
    </div>
  )
}
