import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Trash2 } from 'lucide-react'
import { exercises as exerciseLibrary } from '@/data/workoutsData'

const CATEGORIES = ['Strength', 'Cardio', 'Bodyweight']
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const DEFAULT_SETS = 4
const DEFAULT_REPS = 10
const DEFAULT_REST = '60 sec'

export default function CreateWorkout() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    category: '',
    duration: '',
    difficulty: '',
  })
  const [selectedExerciseId, setSelectedExerciseId] = useState('')
  const [addedExercises, setAddedExercises] = useState([])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAddExercise = () => {
    if (!selectedExerciseId) return
    const ex = exerciseLibrary.find((e) => String(e.id) === selectedExerciseId)
    if (!ex) return
    setAddedExercises((prev) => [
      ...prev,
      { id: Date.now(), name: ex.name, sets: DEFAULT_SETS, reps: DEFAULT_REPS, rest: DEFAULT_REST },
    ])
    setSelectedExerciseId('')
  }

  const handleRemoveExercise = (id) => {
    setAddedExercises((prev) => prev.filter((e) => e.id !== id))
  }

  const handleConfirm = () => {
    // TODO: submit logic
    navigate(-1)
  }

  return (
    <div className="flex items-start justify-center bg-slate-100 p-6">
      <div className="w-full max-w-7xl rounded-2xl bg-white p-8 shadow-sm">
        {/* Title */}
        <h1 className="text-xl font-bold text-ink">Create Workout</h1>

        {/* Name */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-ink" htmlFor="workout-name">
            Name
          </label>
          <input
            id="workout-name"
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
          />
        </div>

        {/* Category + Duration */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="workout-category">
              Category
            </label>
            <input
              id="workout-category"
              name="category"
              type="text"
              placeholder="Strength"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="workout-duration">
              Duration
            </label>
            <input
              id="workout-duration"
              name="duration"
              type="number"
              placeholder="45"
              value={form.duration}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="workout-difficulty">
            Difficulty
          </label>
          <div className="relative mt-2">
            <select
              id="workout-difficulty"
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

        {/* Exercise picker */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-ink" htmlFor="workout-exercise">
            Exercise
          </label>
          <div className="relative mt-2 flex gap-2">
            <div className="relative flex-1">
              <select
                id="workout-exercise"
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-cyan-brand focus:ring-2 focus:ring-cyan-brand/20"
              >
                <option value="" disabled>Select</option>
                {exerciseLibrary.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            </div>
          </div>
        </div>

        {/* Exercises table */}
        <div className="mt-6 rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Exercises</h2>
            <button
              type="button"
              onClick={handleAddExercise}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-slate-50"
            >
              + Add Exercise
            </button>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-muted">
                  <th className="pb-2 font-medium">Exercise Name</th>
                  <th className="pb-2 font-medium">Sets</th>
                  <th className="pb-2 font-medium">Reps</th>
                  <th className="pb-2 font-medium">Rest</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {addedExercises.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-xs text-ink-muted">
                      No exercises added yet.
                    </td>
                  </tr>
                ) : (
                  addedExercises.map((ex) => (
                    <tr key={ex.id} className="border-t border-border">
                      <td className="py-3 text-ink">{ex.name}</td>
                      <td className="py-3 text-ink">{ex.sets}</td>
                      <td className="py-3 text-ink">{ex.reps}</td>
                      <td className="py-3 text-ink">{ex.rest}</td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveExercise(ex.id)}
                          className="text-rose-400 hover:text-rose-600"
                          aria-label="Remove exercise"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-border bg-white px-6 py-2.5 text-sm font-semibold text-ink hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}