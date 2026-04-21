import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import { coupons } from '@/data/subscriptionsData'

const PAGE_SIZE = 5

export function Coupons() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(coupons.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = coupons.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, coupons.length)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Coupons Management</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Create and manage discount codes.
            </p>
          </div>
          <Link
            to="/subscriptions/coupons/new"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            + Create Coupon
          </Link>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Code</Th>
                  <Th>Discount</Th>
                  <Th>Type</Th>
                  <Th>Usage Limit</Th>
                  <Th>Used</Th>
                  <Th>Expiry Date</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((c, i) => {
                  const last = i === pageItems.length - 1
                  return (
                    <tr key={c.id}>
                      <Td last={last} className="font-semibold text-ink">{c.code}</Td>
                      <Td last={last} className="text-ink">{c.discount}</Td>
                      <Td last={last} className="text-ink">{c.type}</Td>
                      <Td last={last} className="text-ink">{c.usageLimit}</Td>
                      <Td last={last} className="text-ink">{c.used}</Td>
                      <Td last={last} className="text-ink">{c.expiryDate}</Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <Link
                            to={`/subscriptions/coupons/${c.id}/edit`}
                            aria-label={`Edit ${c.code}`}
                            className="transition hover:opacity-70"
                          >
                            <Pencil size={18} />
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
      </Card>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={12458}
      />
    </div>
  )
}
