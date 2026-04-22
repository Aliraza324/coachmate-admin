import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const TYPES = ['Strength', 'Cardio', 'Bodyweight', 'HIIT', 'Flexibility']

const SAMPLE_WORKOUTS = [
  { id: 1, name: 'Full Body HIIT', day: 'Day 1', duration: '30 min' },
  { id: 2, name: 'Upper Strength',  day: 'Day 2', duration: '45 min' },
]

export default function CreateWorkoutTemplates() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    templateName: '',
    duration: '',
    workCount: '',
    difficulty: '',
    type: '',
  })

  const [workouts, setWorkouts] = useState(SAMPLE_WORKOUTS)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleAddMeal = () => {
    setWorkouts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        day: `Day ${prev.length + 1}`,
        duration: '',
      },
    ])
  }

  const handleRemoveWorkout = (id) =>
    setWorkouts((prev) => prev.filter((w) => w.id !== id))

  const handleConfirm = () => navigate(-1)
  const handleCancel  = () => navigate(-1)

  return (
    <div className="flex items-start justify-center bg-[#F4F6FA] p-6">
      <div className="w-full max-w-7xl rounded-2xl bg-white p-8 shadow-sm">

        {/* ── Title ─────────────────────────────────── */}
        <h1 className="text-xl font-bold text-[#0F172A]">
          Create Workout Templates
        </h1>

        {/* ── Template Name ─────────────────────────── */}
        <div className="mt-6">
          <label
            htmlFor="cwt-name"
            className="block text-sm font-medium text-[#0F172A]"
          >
            Template Name
          </label>
          <input
            id="cwt-name"
            name="templateName"
            type="text"
            placeholder="Name"
            value={form.templateName}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
          />
        </div>

        {/* ── Duration + Work Count ─────────────────── */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cwt-duration"
              className="block text-sm font-medium text-[#0F172A]"
            >
              Duration
            </label>
            <input
              id="cwt-duration"
              name="duration"
              type="number"
              placeholder="3"
              value={form.duration}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
            />
          </div>
          <div>
            <label
              htmlFor="cwt-workcount"
              className="block text-sm font-medium text-[#0F172A]"
            >
              Work Count
            </label>
            <input
              id="cwt-workcount"
              name="workCount"
              type="number"
              placeholder="10"
              value={form.workCount}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
            />
          </div>
        </div>

        {/* ── Difficulty ────────────────────────────── */}
        <div className="mt-6">
          <label
            htmlFor="cwt-difficulty"
            className="block text-sm font-medium text-[#0F172A]"
          >
            Difficulty
          </label>
          <div className="relative mt-2">
            <select
              id="cwt-difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
            >
              <option value="" disabled>Select</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>
        </div>

        {/* ── Type ─────────────────────────────────── */}
        <div className="mt-5">
          <label
            htmlFor="cwt-type"
            className="block text-sm font-medium text-[#0F172A]"
          >
            Type
          </label>
          <div className="relative mt-2">
            <select
              id="cwt-type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
            >
              <option value="" disabled>Select</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>
        </div>

        {/* ── Workouts Table ───────────────────────── */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#0F172A]">Workouts</span>
            <button
              type="button"
              onClick={handleAddMeal}
              className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              + Add Meal
            </button>
          </div>

          <div className="mt-3 overflow-x-auto rounded-xl border border-[#E6E9EF]">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="border-b border-[#E6E9EF] bg-[#F8F9FB]">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">
                    Workout Name
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">
                    Day
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">
                    Duration
                  </th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-xs text-[#64748B]"
                    >
                      No workouts added yet.
                    </td>
                  </tr>
                ) : (
                  workouts.map((w, idx) => (
                    <tr
                      key={w.id}
                      className={idx !== workouts.length - 1 ? 'border-b border-[#E6E9EF]' : ''}
                    >
                      <td className="px-4 py-3 font-medium text-[#0F172A]">
                        {w.name || '—'}
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{w.day}</td>
                      <td className="px-4 py-3 text-[#64748B]">{w.duration || '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveWorkout(w.id)}
                          className="text-rose-400 hover:text-rose-600 transition-colors"
                          aria-label="Remove workout"
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

        {/* ── Footer Buttons ───────────────────────── */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-[#E6E9EF] bg-white px-6 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}