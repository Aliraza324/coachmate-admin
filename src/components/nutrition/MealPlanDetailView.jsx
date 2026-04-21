import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Th, Td } from '@/components/workouts/SharedTable'
import { mealPlans } from '@/data/nutritionData'

export function MealPlanDetailView() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Find the meal plan by id
  const mealPlan = mealPlans.find(mp => mp.id === parseInt(id))

  if (!mealPlan) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/nutrition/meal-plans')}
          className="flex items-center gap-2 text-cyan-brand hover:opacity-70"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <Card className="p-6">
          <p className="text-ink-muted">Meal plan not found</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/nutrition/meal-plans')}
        className="flex items-center gap-2 text-cyan-brand hover:opacity-70 transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Main Detail Card */}
      <Card className="p-6 sm:p-8">
        {/* Header with Title and Actions */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <span className="text-xl">🍽️</span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-ink">{mealPlan.name}</h1>
                <p className="text-sm text-ink-muted">Category: {mealPlan.category}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/nutrition/meal-plans/${id}/edit`)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-ink hover:bg-slate-200 transition"
            >
              <Edit size={16} />
              Edit Detail
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100 transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border pt-6">
          <div>
            <p className="text-xs text-ink-muted">Goal</p>
            <p className="mt-2 text-base font-medium text-ink">{mealPlan.goal}</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Calories</p>
            <p className="mt-2 text-base font-medium text-ink">{mealPlan.calories}</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Meals</p>
            <p className="mt-2 text-base font-medium text-ink">{mealPlan.mealsPerWeek} per day</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Duration</p>
            <p className="mt-2 text-base font-medium text-ink">{mealPlan.duration}</p>
          </div>
        </div>

        {/* Serving Size */}
        <div className="mb-8 border-t border-border pt-6">
          <p className="text-sm text-ink-muted">Serving Size</p>
          <p className="mt-2 text-base font-medium text-ink">{mealPlan.servingSize}</p>
        </div>

        {/* Description */}
        <div className="mb-8 border-t border-border pt-6">
          <p className="text-sm text-ink-muted">Description</p>
          <p className="mt-2 text-base text-ink">{mealPlan.description}</p>
        </div>

        {/* Target */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-ink-muted">Target</p>
          <p className="mt-2 text-base text-ink">{mealPlan.target}</p>
        </div>
      </Card>

      {/* Meals Section */}
      {mealPlan.meals && mealPlan.meals.length > 0 && (
        <Card className="p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-ink">Meals</h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[500px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Meal Name</Th>
                  <Th>Food Items</Th>
                  <Th>Calories</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {mealPlan.meals.map((meal, i) => {
                  const last = i === mealPlan.meals.length - 1
                  return (
                    <tr key={meal.id}>
                      <Td last={last}>
                        <div className="font-semibold text-ink">{meal.name}</div>
                      </Td>
                      <Td last={last} className="text-ink">{meal.foods}</Td>
                      <Td last={last} className="text-ink">{meal.calories}</Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <button
                            type="button"
                            className="transition hover:opacity-70"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            type="button"
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
        </Card>
      )}
    </div>
  )
}
