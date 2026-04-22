import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Download, Eye, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { workouts, categoryMeta, difficultyStyles } from '@/data/workoutsData'
import { Th, Td } from './SharedTable'

const PAGE_SIZE = 5

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ workout, onClose, onConfirm }) {
  if (!workout) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
            <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">Delete Workout</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting this workout will remove all associated access,
            <br />
            and activity permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(workout); onClose() }}
            className="flex-1 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────── */
export function WorkoutLibrary() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const totalPages = Math.max(1, Math.ceil(workouts.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = workouts.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, workouts.length)

  const handleDeleteConfirm = (workout) => {
    // TODO: wire to API
    console.log('Delete workout', workout.name)
  }

  return (
    <>
      {/* ── Delete Modal ── */}
      <DeleteModal
        workout={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <div className="space-y-4">
        <Card className="p-0 sm:p-0">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">Workout Library</h2>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm mt-5">
                Manage coach profiles, verify certifications, assign athletes, and monitor coach performance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/workouts/create')}
              className="cursor-pointer inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <Plus size={16} />
              Add Workout
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>

          <div className="px-1 pb-4 sm:px-5 sm:pb-5">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <Th>Workout Name</Th>
                    <Th>Category</Th>
                    <Th>Difficulty</Th>
                    <Th>Duration</Th>
                    <Th>Created By</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((w, i) => {
                    const last = i === pageItems.length - 1
                    const meta = categoryMeta[w.category]
                    const Icon = meta?.icon
                    return (
                      <tr key={w.id}>
                        <Td last={last}>
                          <div className="font-semibold text-ink">{w.name}</div>
                        </Td>
                        <Td last={last}>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta?.className ?? ''}`}
                          >
                            {Icon && <Icon size={12} />}
                            {w.category}
                          </span>
                        </Td>
                        <Td last={last}>
                          <span className={`text-sm font-medium ${difficultyStyles[w.difficulty]}`}>
                            {w.difficulty}
                          </span>
                        </Td>
                        <Td last={last} className="text-ink">{w.duration}</Td>
                        <Td last={last} className="text-ink">{w.createdBy}</Td>
                        <Td last={last}>
                          <div className="flex items-center gap-3 text-cyan-brand">
                            <Link
                              to={`/workouts/library/${w.slug}`}
                              aria-label={`View ${w.name}`}
                              className="transition hover:opacity-70"
                            >
                              <Eye size={18} />
                            </Link>
                            <button type="button" aria-label="Edit" className="transition hover:opacity-70">
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              aria-label="Delete"
                              onClick={() => setDeleteTarget(w)}
                              className="text-rose-500 transition hover:text-rose-600"
                            >
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
    </>
  )
}
