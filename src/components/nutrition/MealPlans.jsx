import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import { mealPlans, mealPlansTotal } from '@/data/nutritionData'

const PAGE_SIZE = 5

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ item, onClose, onConfirm }) {
  if (!item) return null
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
          <h2 className="text-lg font-bold text-[#0F172A]">Delete Meal Plan</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting this meal plan will remove all associated access,
            <br />
            and activity permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(item); onClose() }}
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

export function MealPlans() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const totalPages = Math.max(1, Math.ceil(mealPlansTotal / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = mealPlans.slice(0, PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, mealPlansTotal)

  const handleDeleteConfirm = (item) => {
    // TODO: wire to API
    console.log('Delete meal plan', item.name)
  }

  return (
    <>
      <DeleteModal
        item={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <div className="space-y-4">
        <Card className="p-0 sm:p-0">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">Meal Plans</h2>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                Manage all meal plans for athletes and coaches.
              </p>
            </div>
            <button 
              type="button"
              onClick={() => navigate('/nutrition/meal-plans/new')}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <Plus size={16} />
              Create Meal Plan
            </button>
          </div>

          <div className="px-1 pb-4 sm:px-5 sm:pb-5">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <Th>Plan Name</Th>
                    <Th>Goal</Th>
                    <Th>Calories</Th>
                    <Th>Meals/Week</Th>
                    <Th>Duration</Th>
                    <Th>Category</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((mp, i) => {
                    const last = i === pageItems.length - 1
                    return (
                      <tr key={mp.id}>
                        <Td last={last}>
                          <div className="font-semibold text-ink">{mp.name}</div>
                        </Td>
                        <Td last={last} className="text-ink">{mp.goal}</Td>
                        <Td last={last} className="text-ink">{mp.calories}</Td>
                        <Td last={last} className="text-ink">{mp.mealsPerWeek}</Td>
                        <Td last={last} className="text-ink">{mp.duration}</Td>
                        <Td last={last}>
                          <span className="inline-block rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                            {mp.category}
                          </span>
                        </Td>
                        <Td last={last}>
                          <div className="flex items-center gap-3 text-cyan-brand">
                            <button
                              type="button"
                              onClick={() => navigate(`/nutrition/meal-plans/${mp.id}`)}
                              aria-label={`View ${mp.name}`}
                              className="transition hover:opacity-70"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate(`/nutrition/meal-plans/${mp.id}/edit`)}
                              aria-label={`Edit ${mp.name}`}
                              className="transition hover:opacity-70"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(mp)}
                              aria-label="Delete"
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
          total={mealPlansTotal}
        />
      </div>
    </>
  )
}
