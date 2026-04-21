import { Link } from 'react-router-dom'
import { ArrowLeft, Ban, Check, Pencil, Receipt } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export function PlanDetailView({ plan, onBack }) {
  const priceLabel =
    plan.price === 0
      ? 'Free'
      : `$${plan.price.toFixed(2)} / ${plan.billingCycle.toLowerCase().replace('ly', '')}`

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Plans
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Plan Detail</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              to={`/subscriptions/plans/${plan.slug}/edit`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Detail
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
            >
              <Ban size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <Receipt size={24} className="text-emerald-600" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-ink">{plan.name}</h2>
            <p className="mt-1 text-sm text-ink-muted">Type: {plan.type}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="text-xs text-ink-muted">Price</p>
          <p className="mt-1 text-sm font-semibold text-ink">{priceLabel}</p>

          <p className="mt-5 text-xs text-ink-muted">Included Features</p>
          <ul className="mt-2 space-y-2">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink">
                <Check size={16} className="mt-0.5 shrink-0 text-ink" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
