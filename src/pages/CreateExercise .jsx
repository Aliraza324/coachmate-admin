import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const EQUIPMENT_OPTIONS = ['Bodyweight', 'Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebell', 'Machine', 'None']

const CreateExercise = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    muscleGroup: '',
    difficulty: '',
    equipment: '',
    videoLink: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleConfirm = () => {
    // TODO: submit logic
    navigate(-1)
  }

  return (
    <div className="flex items-start justify-center bg-slate-100 p-6">
      <div className="w-full max-w-7xl rounded-2xl bg-white p-8 shadow-sm">
        {/* Title */}
        <h1 className="text-xl font-bold text-ink">Create Exercise</h1>

        {/* Name */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-ink" htmlFor="exercise-name">
            Name
          </label>
          <input
            id="exercise-name"
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
          />
        </div>

        {/* Muscle Group */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="exercise-muscle-group">
            Muscle Group
          </label>
          <input
            id="exercise-muscle-group"
            name="muscleGroup"
            type="text"
            placeholder="Strength"
            value={form.muscleGroup}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
          />
        </div>

        {/* Difficulty */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="exercise-difficulty">
            Difficulty
          </label>
          <div className="relative mt-2">
            <select
              id="exercise-difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
            >
              <option value="" disabled>Select</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Equipment */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="exercise-equipment">
            Equipment
          </label>
          <div className="relative mt-2">
            <select
              id="exercise-equipment"
              name="equipment"
              value={form.equipment}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
            >
              <option value="" disabled>Select</option>
              {EQUIPMENT_OPTIONS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Video Link */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="exercise-video">
            Video Link
          </label>
          <input
            id="exercise-video"
            name="videoLink"
            type="url"
            placeholder="Add"
            value={form.videoLink}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
          />
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="cursor-pointer rounded-xl bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded-xl border border-border bg-white px-6 py-2.5 text-sm font-semibold text-ink hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateExercise