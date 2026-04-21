import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'

export function AddFoodForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servingSize: '',
    vedioLink: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleConfirm = () => {
    console.log('Adding food:', formData)
    // TODO: Add API call to save food item
    navigate('/nutrition/foods')
  }

  const handleCancel = () => {
    navigate('/nutrition/foods')
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-ink">Add Food</h2>

        <div className="space-y-4">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Food Name
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

          {/* Calories & Protein */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Protein (g)
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
                placeholder="23"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
          </div>

          {/* Carbs & Fat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Carbs (g)
              </label>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Fat (g)
              </label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleInputChange}
                placeholder="23"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
              />
            </div>
          </div>

          {/* Serving Size */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Serving Size
            </label>
            <input
              type="text"
              name="servingSize"
              value={formData.servingSize}
              onChange={handleInputChange}
              placeholder="e.g., 100g, 1 cup"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
            />
          </div>

          {/* Vedio Link */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Vedio Link
            </label>
            <input
              type="text"
              name="vedioLink"
              value={formData.vedioLink}
              onChange={handleInputChange}
              placeholder="oddi"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder-slate-400 text-ink focus:border-cyan-brand focus:outline-none focus:ring-1 focus:ring-cyan-brand"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 justify-end">
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
      </Card>
    </div>
  )
}
