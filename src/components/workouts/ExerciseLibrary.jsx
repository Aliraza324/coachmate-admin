import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { exercises, categoryMeta, difficultyStyles } from '@/data/workoutsData'
import { Th, Td } from './SharedTable'

const PAGE_SIZE = 5

const equipmentMeta = {
  Bodyweight: categoryMeta.Bodyweight,
  None: null,
  Dumbbells: categoryMeta.Strength,
  Mat: categoryMeta.Bodyweight,
}

export function ExerciseLibrary() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(exercises.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = exercises.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, exercises.length)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Exercise Library</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Manage coach profiles, verify certifications, assign athletes, and monitor coach performance.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Plus size={16} />
            Add Exercise
          </button>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Exercise Name</Th>
                  <Th>Muscle Group</Th>
                  <Th>Difficulty</Th>
                  <Th>Equipment</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((ex, i) => {
                  const last = i === pageItems.length - 1
                  const meta = equipmentMeta[ex.equipment]
                  const Icon = meta?.icon
                  return (
                    <tr key={ex.id}>
                      <Td last={last}>
                        <div className="font-semibold text-ink">{ex.name}</div>
                      </Td>
                      <Td last={last} className="text-ink">{ex.muscleGroup}</Td>
                      <Td last={last}>
                        <span className={`text-sm font-medium ${difficultyStyles[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                      </Td>
                      <Td last={last}>
                        {meta ? (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
                          >
                            {Icon && <Icon size={12} />}
                            {ex.equipment}
                          </span>
                        ) : (
                          <span className="text-ink">{ex.equipment}</span>
                        )}
                      </Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <Link
                            to={`/workouts/exercises/${ex.slug}`}
                            aria-label={`View ${ex.name}`}
                            className="transition hover:opacity-70"
                          >
                            <Eye size={18} />
                          </Link>
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={12458}
      />
    </div>
  )
}
