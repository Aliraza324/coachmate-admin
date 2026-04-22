import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import {
  failedPayments,
  payments,
  paymentStatusStyles,
} from '@/data/subscriptionsData'

const PAGE_SIZE = 5

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ item, onClose, onConfirm, title = 'Delete Payment' }) {
  if (!item) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
            <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting this record will remove it from the system
            <br />
            permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(item); onClose() }}
            className="flex-1 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function Payments() {
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState('Delete Payment')

  const totalPages = Math.max(1, Math.ceil(payments.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = payments.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, payments.length)

  const handleDeleteConfirm = (item) => {
    // TODO: wire to API
    console.log('Delete payment record', item.id)
  }

  const openDeleteModal = (item, title) => {
    setDeleteTarget(item)
    setDeleteTitle(title)
  }

  return (
    <>
      <DeleteModal
        item={deleteTarget}
        title={deleteTitle}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

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
                              onClick={() => openDeleteModal(p, 'Delete Payment')}
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
                            onClick={() => openDeleteModal(p, 'Delete Failed Payment')}
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
    </>
  )
}
