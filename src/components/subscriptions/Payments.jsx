import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import {
  failedPayments,
  payments,
  paymentStatusStyles,
} from '@/data/subscriptionsData'

const PAGE_SIZE = 5

export function Payments() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(payments.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = payments.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, payments.length)

  return (
    <div className="space-y-6">
      <Card className="p-0 sm:p-0">
        <div className="p-4 sm:p-5">
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">Payment History</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            Track all transactions and billing activity.
          </p>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>User</Th>
                  <Th>Plan</Th>
                  <Th>Amount</Th>
                  <Th>Payment Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, i) => {
                  const last = i === pageItems.length - 1
                  return (
                    <tr key={p.id}>
                      <Td last={last} className="font-semibold text-ink">{p.user}</Td>
                      <Td last={last} className="text-ink">{p.plan}</Td>
                      <Td last={last} className="text-ink">${p.amount.toFixed(2)}</Td>
                      <Td last={last} className="text-ink">{p.date}</Td>
                      <Td last={last}>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatusStyles[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/subscriptions/payments/${p.id}`}
                            aria-label={`View ${p.id}`}
                            className="text-cyan-brand transition hover:opacity-70"
                          >
                            <CreditCard size={18} />
                          </Link>
                          <button
                            type="button"
                            aria-label="Delete"
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
        </div>

        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={12458}
          />
        </div>
      </Card>

      <Card className="p-0 sm:p-0">
        <div className="p-4 sm:p-5">
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">Failed Payments</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            Track all transactions and billing activity.
          </p>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>User</Th>
                  <Th>Plan</Th>
                  <Th>Amount</Th>
                  <Th>Attempt Date</Th>
                  <Th>Reason</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {failedPayments.map((p, i) => {
                  const last = i === failedPayments.length - 1
                  return (
                    <tr key={p.id}>
                      <Td last={last} className="font-semibold text-ink">{p.user}</Td>
                      <Td last={last} className="text-ink">{p.plan}</Td>
                      <Td last={last} className="text-ink">${p.amount.toFixed(2)}</Td>
                      <Td last={last} className="text-ink">{p.date}</Td>
                      <Td last={last} className="text-ink">{p.reason}</Td>
                      <Td last={last}>
                        <button
                          type="button"
                          aria-label="Delete"
                          className="text-rose-500 transition hover:text-rose-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </Td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
