import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Th, Td } from '@/components/workouts/SharedTable'

export function MealPlanForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    goal: '',
    calories: '',
    mealsPerWeek: '',
    duration: '',
    servingSize: '',
    description: '',
    target: '',
  })

  const [meals, setMeals] = useState([])
  const [showMealForm, setShowMealForm] = useState(false)
  const [editingMealId, setEditingMealId] = useState(null)
  const [mealFormData, setMealFormData] = useState({
    name: '',
    foods: '',
    calories: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMealInputChange = (e) => {
    const { name, value } = e.target
    setMealFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddMeal = () => {
    if (mealFormData.name && mealFormData.foods && mealFormData.calories) {
      if (editingMealId !== null) {
        // Edit existing meal
        setMeals(meals.map(meal =>
          meal.id === editingMealId
            ? { ...meal, ...mealFormData }
            : meal
        ))
        setEditingMealId(null)
      } else {
        // Add new meal
        setMeals([...meals, { id: Date.now(), ...mealFormData }])
      }
      setMealFormData({ name: '', foods: '', calories: '' })
      setShowMealForm(false)
    }
  }

  const handleEditMeal = (meal) => {
    setMealFormData({
      name: meal.name,
      foods: meal.foods,
      calories: meal.calories,
    })
    setEditingMealId(meal.id)
    setShowMealForm(true)
  }

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  const handleCancelMealForm = () => {
    setMealFormData({ name: '', foods: '', calories: '' })
    setEditingMealId(null)
    setShowMealForm(false)
  }

  const handleConfirm = () => {
    console.log('Adding meal plan:', { ...formData, meals })
    // TODO: Add API call to save meal plan
    navigate('/nutrition/meal-plans')
  }

  const handleCancel = () => {
    navigate('/nutrition/meal-plans')
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-ink">Add Meal Plan</h2>

        <div className="space-y-4">
          {/* Meal Plan Name */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Meal Plan Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
            />
          </div>

          {/* Category & Goal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Pre-Built"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Goal
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="e.g., Weight Loss"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
          </div>

          {/* Calories & Meals Per Week */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Daily Calories
              </label>
              <input
                type="text"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                placeholder="e.g., 1800 kcal/day"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Meals Per Week
              </label>
              <input
                type="number"
                name="mealsPerWeek"
                value={formData.mealsPerWeek}
                onChange={handleInputChange}
                placeholder="4"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
          </div>

          {/* Duration & Serving Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 4 Weeks"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Serving Size
              </label>
              <input
                type="text"
                name="servingSize"
                value={formData.servingSize}
                onChange={handleInputChange}
                placeholder="e.g., 100g"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Plan description"
              rows="3"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
            />
          </div>

          {/* Target */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Target
            </label>
            <textarea
              name="target"
              value={formData.target}
              onChange={handleInputChange}
              placeholder="Target goal"
              rows="3"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
            />
          </div>
        </div>
      </Card>

      {/* Meals Section */}
      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">Meals</h3>
          <button
            type="button"
            onClick={() => setShowMealForm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Plus size={16} />
            Add Meal
          </button>
        </div>

        {/* Meal Form */}
        {showMealForm && (
          <div className="mb-6 space-y-4 border-b border-border pb-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Meal Name
              </label>
              <input
                type="text"
                name="name"
                value={mealFormData.name}
                onChange={handleMealInputChange}
                placeholder="e.g., Breakfast"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Food Items
              </label>
              <input
                type="text"
                name="foods"
                value={mealFormData.foods}
                onChange={handleMealInputChange}
                placeholder="e.g., Eggs, Toast, Banana"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Calories
              </label>
              <input
                type="text"
                name="calories"
                value={mealFormData.calories}
                onChange={handleMealInputChange}
                placeholder="e.g., 400 kcal"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={handleCancelMealForm}
                className="rounded-lg border border-border bg-white px-6 py-2 text-sm font-medium text-ink hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddMeal}
                className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                {editingMealId ? 'Update' : 'Add'} Meal
              </button>
            </div>
          </div>
        )}

        {/* Meals Table */}
        {meals.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[600px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Meal Name</Th>
                  <Th>Food Items</Th>
                  <Th>Calories</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, i) => {
                  const last = i === meals.length - 1
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
                            onClick={() => handleEditMeal(meal)}
                            className="transition hover:opacity-70"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMeal(meal.id)}
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
        ) : (
          <div className="rounded-lg border border-dashed border-border py-8 text-center">
            <p className="text-sm text-ink-muted">No meals added yet</p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-border bg-white px-6 py-2 text-sm font-medium text-ink hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
