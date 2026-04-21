import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import { nutritionTemplates, templatesTotal } from '@/data/nutritionData'

const PAGE_SIZE = 5

export function NutritionTemplates() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(templatesTotal / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = nutritionTemplates.slice(0, PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, templatesTotal)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Nutrition Templates</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Reusable meal structures for quick planning.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => navigate('/nutrition/templates/new')}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Plus size={16} />
            Create Template
          </button>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Template Name</Th>
                  <Th>Goals</Th>
                  <Th>Meals Count</Th>
                  <Th>Calories</Th>
                  <Th>Created By</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((t, i) => {
                  const last = i === pageItems.length - 1
                  return (
                    <tr key={t.id}>
                      <Td last={last}>
                        <div className="font-semibold text-ink">{t.name}</div>
                      </Td>
                      <Td last={last}>
                        <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                          {t.goal}
                        </span>
                      </Td>
                      <Td last={last} className="text-ink">{t.mealsCount}</Td>
                      <Td last={last} className="text-ink">{t.calories}</Td>
                      <Td last={last} className="text-ink">{t.createdBy}</Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <button
                            type="button"
                            onClick={() => navigate(`/nutrition/templates/${t.id}`)}
                            aria-label={`View ${t.name}`}
                            className="transition hover:opacity-70"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/nutrition/templates/${t.id}/edit`)}
                            aria-label={`Edit ${t.name}`}
                            className="transition hover:opacity-70"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            type="button"
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
        total={templatesTotal}
      />
    </div>
  )
}
