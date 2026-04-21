import { ArrowLeft, Pencil, Ban, Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { categoryMeta } from '@/data/workoutsData'

export function ExerciseDetailView({ exercise, onBack }) {
  const CategoryIcon = categoryMeta.Strength.icon

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Exercises
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Exercise Detail</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
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
              <CategoryIcon size={24} className="text-sky-600" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-ink">{exercise.name}</h2>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {exercise.difficulty}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-sm text-ink-muted">
            <p>
              Muscle Group: <span className="font-medium text-ink">{exercise.muscleGroup}</span>
            </p>
            <p>
              Equipment: <span className="font-medium text-ink">{exercise.equipment}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="text-xs text-ink-muted">Description</p>
          <p className="mt-1 text-sm text-ink">{exercise.description}</p>

          <p className="mt-5 text-xs text-ink-muted">Steps</p>
          <ol className="mt-1 space-y-1 text-sm text-ink">
            {exercise.steps.map((step, i) => (
              <li key={i}>
                {i + 1}. {step}
              </li>
            ))}
          </ol>

          <p className="mt-5 text-xs text-ink-muted">Tips</p>
          <ul className="mt-1 space-y-1 text-sm text-ink">
            {exercise.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <div
            className="relative aspect-video w-full bg-slate-100"
            style={{
              backgroundImage: `url(${exercise.videoThumb})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <button
              type="button"
              aria-label="Play video"
              className="absolute inset-0 grid place-items-center bg-black/10 transition hover:bg-black/20"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-lg">
                <Play size={28} className="ml-1 text-ink" fill="currentColor" />
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
