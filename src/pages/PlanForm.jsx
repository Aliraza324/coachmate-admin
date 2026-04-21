import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { billingCycles, findPlanBySlug, planTypes } from '@/data/subscriptionsData'

const emptyForm = {
  name: '',
  type: '',
  price: '',
  billingCycle: 'Monthly',
  features: [''],
}

export function PlanForm() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(slug)

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm)
      return
    }
    const plan = findPlanBySlug(slug)
    if (!plan) {
      navigate('/subscriptions/plans', { replace: true })
      return
    }
    setForm({
      name: plan.name,
      type: plan.type,
      price: String(plan.price),
      billingCycle: plan.billingCycle,
      features: plan.features.length ? [...plan.features] : [''],
    })
  }, [slug, isEdit, navigate])

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const updateFeature = (i, value) =>
    setForm((f) => {
      const next = [...f.features]
      next[i] = value
      return { ...f, features: next }
    })

  const addFeature = () =>
    setForm((f) => ({ ...f, features: [...f.features, ''] }))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/subscriptions/plans')
  }

  const handleCancel = () => navigate('/subscriptions/plans')

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Plans
      </button>

      <Card>
        <h1 className="text-xl font-semibold text-ink sm:text-2xl">
          {isEdit ? 'Edit Plan' : 'Add Plan'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:max-w-7xl">
          <Field label="Plan Name">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
            />
          </Field>

          <div>
            <p className="mb-2 text-xs text-ink-muted">Type</p>
            <div className="space-y-1.5">
              {planTypes.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="plan-type"
                    value={t}
                    checked={form.type === t}
                    onChange={() => update('type', t)}
                    className="h-4 w-4 accent-cyan-brand"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Price">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="3"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
              />
            </Field>
            <Field label="Billing Cycle">
              <select
                value={form.billingCycle}
                onChange={(e) => update('billingCycle', e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
              >
                {billingCycles.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Features">
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
                  />
                  {i === form.features.length - 1 && (
                    <button
                      type="button"
                      onClick={addFeature}
                      aria-label="Add feature"
                      className="rounded-md border border-border bg-white p-2 text-ink-muted hover:bg-slate-50"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Field>

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-5 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-ink-muted">{label}</span>
      {children}
    </label>
  )
}
