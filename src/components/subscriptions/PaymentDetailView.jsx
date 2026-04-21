import { ArrowLeft, Ban, Download, Mail, Phone, Receipt } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { paymentStatusStyles } from '@/data/subscriptionsData'

export function PaymentDetailView({ payment, onBack }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Payments
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Payment Detail</h1>
          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
              >
                <Download size={16} />
                Download Invoice
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
              >
                <Ban size={16} />
                Delete
              </button>
            </div>
            <div className="space-y-1 text-sm text-ink-muted">
              <p className="flex items-center justify-end gap-2">
                <Mail size={14} />
                {payment.email}
              </p>
              <p className="flex items-center justify-end gap-2">
                <Phone size={14} />
                {payment.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50">
            <Receipt size={24} className="text-emerald-600" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-ink">
              {payment.user} ({payment.id})
            </h2>
            <p className="mt-1 text-sm text-ink-muted">Type: {payment.type}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <Field label="Plan" value={payment.plan} />
            <Field label="Amount" value={`$${payment.amount.toFixed(2)}`} />
            <Field label="Payment Method" value={payment.method} />
            <Field label="Billing Cycle" value={payment.billingCycle} />
            <Field label="Transaction ID" value={payment.id} />
            <Field label="Date" value={payment.date} />
            <Field label="Time" value={payment.time} />
            <Field
              label="Status"
              value={
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatusStyles[payment.status]}`}
                >
                  {payment.status}
                </span>
              }
            />
            <Field label="Country" value={payment.country} />
            <Field label="Currency" value={payment.currency} />
          </div>
        </div>
      </Card>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-muted">{label}</p>
      <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
    </div>
  )
}
