import { Plus, Copy, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { workoutTemplates, categoryMeta, difficultyStyles } from '@/data/workoutsData'
import { Th, Td } from './SharedTable'

export function WorkoutTemplates() {
  return (
    <Card className="p-0 sm:p-0">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
        <div>
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">Workout Templates</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            Reusable program templates that can be assigned to athletes.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      <div className="px-1 pb-4 sm:px-5 sm:pb-5">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <Th>Template Name</Th>
                <Th>Category</Th>
                <Th>Level</Th>
                <Th>Workouts</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {workoutTemplates.map((t, i) => {
                const last = i === workoutTemplates.length - 1
                const meta = categoryMeta[t.category]
                const Icon = meta?.icon
                return (
                  <tr key={t.id}>
                    <Td last={last}>
                      <div className="font-semibold text-ink">{t.name}</div>
                    </Td>
                    <Td last={last}>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta?.className ?? ''}`}
                      >
                        {Icon && <Icon size={12} />}
                        {t.category}
                      </span>
                    </Td>
                    <Td last={last}>
                      <span className={`text-sm font-medium ${difficultyStyles[t.level]}`}>
                        {t.level}
                      </span>
                    </Td>
                    <Td last={last} className="text-ink">{t.workouts}</Td>
                    <Td last={last}>
                      <div className="flex items-center gap-3 text-cyan-brand">
                        <button type="button" aria-label="Duplicate" className="transition hover:opacity-70">
                          <Copy size={18} />
                        </button>
                        <button type="button" aria-label="Edit" className="transition hover:opacity-70">
                          <Pencil size={18} />
                        </button>
                        <button type="button" aria-label="Delete" className="text-rose-500 transition hover:text-rose-600">
                          <Trash2 size={18} />
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
  )
}
