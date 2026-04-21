import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { foods } from '@/data/nutritionData'

export function FoodDetailView() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Find the food item by id
  const food = foods.find(f => f.id === parseInt(id))

  if (!food) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/nutrition/foods')}
          className="flex items-center gap-2 text-cyan-brand hover:opacity-70"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <Card className="p-6">
          <p className="text-ink-muted">Food not found</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/nutrition/foods')}
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
            <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{food.name}</h1>
            <p className="mt-2 text-sm text-ink-muted">Category: {food.category || 'General'}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/nutrition/foods/${id}/edit`)}
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

        {/* Nutritional Information Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-ink-muted">Calories</p>
            <p className="mt-1 text-lg font-semibold text-ink">{food.calories} kcal</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Protein</p>
            <p className="mt-1 text-lg font-semibold text-ink">{food.protein} g</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Carbs</p>
            <p className="mt-1 text-lg font-semibold text-ink">{food.carbs} g</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Fat</p>
            <p className="mt-1 text-lg font-semibold text-ink">{food.fat} g</p>
          </div>
        </div>

        {/* Serving Size */}
        <div className="mb-8 border-t border-border pt-6">
          <p className="text-sm text-ink-muted">Serving Size</p>
          <p className="mt-2 text-base font-medium text-ink">{food.servingSize || '100g'}</p>
        </div>

        {/* Description */}
        <div className="mb-8 border-t border-border pt-6">
          <p className="text-sm text-ink-muted">Description</p>
          <p className="mt-2 text-base text-ink">
            {food.description || 'No description available'}
          </p>
        </div>

        {/* Video/Image */}
        {food.vedioLink && (
          <div className="border-t border-border pt-6">
            <p className="mb-4 text-sm text-ink-muted">Video</p>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-900">
              <img
                src={food.vedioLink}
                alt={food.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <div className="h-0 w-0 border-l-8 border-t-5 border-b-5 border-l-black border-t-transparent border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
