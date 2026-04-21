import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import {
  couponDiscountTypes,
  couponUsageCycles,
  findCouponById,
} from '@/data/subscriptionsData'

const emptyForm = {
  code: '',
  discountType: '',
  value: '',
  usageLimit: '',
  expiryDate: '',
}

export function CouponForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm)
      return
    }
    const coupon = findCouponById(id)
    if (!coupon) {
      navigate('/subscriptions/coupons', { replace: true })
      return
    }
    setForm({
      code: coupon.code,
      discountType: coupon.type,
      value: coupon.discount.replace('%', ''),
      usageLimit: String(coupon.usageLimit),
      expiryDate: coupon.expiryDate,
    })
  }, [id, isEdit, navigate])

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/subscriptions/coupons')
  }

  const handleCancel = () => navigate('/subscriptions/coupons')

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Coupons
      </button>

      <Card>
        <h1 className="text-xl font-semibold text-ink sm:text-2xl">
          {isEdit ? 'Edit Coupon' : 'Add Coupons'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:max-w-7xl">
          <Field label="Coupon Code">
            <input
              type="text"
              placeholder="Name"
              value={form.code}
              onChange={(e) => update('code', e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
            />
          </Field>

          <div>
            <p className="mb-2 text-xs text-ink-muted">Discount</p>
            <div className="space-y-1.5">
              {couponDiscountTypes.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="radio"
                    name="discount-type"
                    value={t}
                    checked={form.discountType === t}
                    onChange={() => update('discountType', t)}
                    className="h-4 w-4 accent-cyan-brand"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Value">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="3"
                value={form.value}
                onChange={(e) => update('value', e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
              />
            </Field>
            <Field label="Usage Limit">
              <select
                value={form.usageLimit}
                onChange={(e) => update('usageLimit', e.target.value)}
                className={`w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-cyan-brand ${
                  form.usageLimit ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                <option value="">Monthly</option>
                {couponUsageCycles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Expiry Date">
            <input
              type="date"
              placeholder="Add"
              value={form.expiryDate}
              onChange={(e) => update('expiryDate', e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cyan-brand"
            />
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
