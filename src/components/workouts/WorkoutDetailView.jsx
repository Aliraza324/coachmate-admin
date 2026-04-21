import { ArrowLeft, UserPlus, Pencil, Ban, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { categoryMeta } from '@/data/workoutsData'
import { Th, Td } from './SharedTable'

export function WorkoutDetailView({ workout, onBack }) {
  const meta = categoryMeta[workout.category]
  const CategoryIcon = meta?.icon

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Workouts
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Workout Detail</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <UserPlus size={16} />
              Assign To
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Detail
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
            >
              <Ban size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-sky-50">
              {CategoryIcon && <CategoryIcon size={24} className="text-sky-600" />}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-ink">{workout.name} Training</h2>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {workout.difficulty}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-sm text-ink-muted">
            <p>
              Category: <span className="font-medium text-ink">{workout.category}</span>
            </p>
            <p>
              Duration: <span className="font-medium text-ink">{workout.duration}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <h3 className="text-base font-semibold text-ink">Overview</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <Field label="Target Muscles" value={workout.targetMuscles} />
            <Field label="Equipment" value={workout.equipment} />
          </div>
          <div className="mt-5">
            <p className="text-xs text-ink-muted">Description</p>
            <p className="mt-1 text-sm text-ink">{workout.description}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink">Exercises</h3>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-slate-50"
            >
              + Add Exercise
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Exercise Name</Th>
                  <Th>Sets</Th>
                  <Th>Reps</Th>
                  <Th>Rest</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises.map((ex, i) => {
                  const last = i === workout.exercises.length - 1
                  return (
                    <tr key={ex.id}>
                      <Td last={last} className="font-medium text-ink">{ex.name}</Td>
                      <Td last={last} className="text-ink">{ex.sets}</Td>
                      <Td last={last} className="text-ink">{ex.reps}</Td>
                      <Td last={last} className="text-ink">{ex.rest}</Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <button type="button" aria-label="Edit" className="transition hover:opacity-70">
                            <Pencil size={16} />
                          </button>
                          <button type="button" aria-label="Delete" className="text-rose-500 transition hover:text-rose-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}
