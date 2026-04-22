import { useState } from 'react'
import { Plus, Copy, Pencil, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { workoutTemplates, categoryMeta, difficultyStyles } from '@/data/workoutsData'
import { Th, Td } from './SharedTable'
import { useNavigate } from 'react-router-dom'

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ template, onClose, onConfirm }) {
  if (!template) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
            <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">Delete Template</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting this template will remove all associated access,
            <br />
            and activity permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(template); onClose() }}
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
export function WorkoutTemplates() {
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleDeleteConfirm = (template) => {
    // TODO: wire to API
    console.log('Delete template', template.name)
  }

  return (
    <>
      <DeleteModal
        template={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Workout Templates</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Reusable program templates that can be assigned to athletes.
            </p>
          </div>
          <button
            onClick={() => navigate('/workouts/templates/create')}
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
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
                          <button
                            type="button"
                            aria-label="Delete"
                            onClick={() => setDeleteTarget(t)}
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
    </>
  )
}
