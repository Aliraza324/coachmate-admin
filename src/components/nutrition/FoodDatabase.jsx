import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import { foods, foodsTotal } from '@/data/nutritionData'

const PAGE_SIZE = 5

export function FoodDatabase() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(foodsTotal / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = foods.slice(0, PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, foodsTotal)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Food Database</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Manage all food items and nutritional values.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => navigate('/nutrition/foods/new')}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Plus size={16} />
            Add Food
          </button>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Food Name</Th>
                  <Th>Calories</Th>
                  <Th>Protein (g)</Th>
                  <Th>Carbs (g)</Th>
                  <Th>Fat (g)</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((f, i) => {
                  const last = i === pageItems.length - 1
                  return (
                    <tr key={f.id}>
                      <Td last={last}>
                        <div className="font-semibold text-ink">{f.name}</div>
                      </Td>
                      <Td last={last} className="text-ink">{f.calories}</Td>
                      <Td last={last} className="text-ink">{f.protein}</Td>
                      <Td last={last} className="text-ink">{f.carbs}</Td>
                      <Td last={last} className="text-ink">{f.fat}</Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <button
                            type="button"
                            onClick={() => navigate(`/nutrition/foods/${f.id}`)}
                            aria-label={`View ${f.name}`}
                            className="transition hover:opacity-70"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/nutrition/foods/${f.id}/edit`)}
                            aria-label={`Edit ${f.name}`}
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
        total={foodsTotal}
      />
    </div>
  )
}
