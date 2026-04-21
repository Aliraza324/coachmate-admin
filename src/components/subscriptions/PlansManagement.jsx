import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Th, Td } from '@/components/workouts/SharedTable'
import { plans } from '@/data/subscriptionsData'

const PAGE_SIZE = 5

export function PlansManagement() {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(plans.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageItems = plans.slice(start, start + PAGE_SIZE)
  const rangeStart = start + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, plans.length)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Plans Management</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Manage subscription plans for athletes and coaches.
            </p>
          </div>
          <Link
            to="/subscriptions/plans/new"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Plus size={16} />
            Add Plan
          </Link>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <Th>Plan Name</Th>
                  <Th>Type</Th>
                  <Th>Price</Th>
                  <Th>Billing Cycle</Th>
                  <Th>Users</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, i) => {
                  const last = i === pageItems.length - 1
                  return (
                    <tr key={p.id}>
                      <Td last={last}>
                        <div className="font-semibold text-ink">{p.name}</div>
                      </Td>
                      <Td last={last} className="text-ink">{p.type}</Td>
                      <Td last={last} className="text-ink">${p.price}</Td>
                      <Td last={last} className="text-ink">{p.billingCycle}</Td>
                      <Td last={last} className="text-ink">{p.users.toLocaleString()}</Td>
                      <Td last={last}>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {p.status}
                        </span>
                      </Td>
                      <Td last={last}>
                        <div className="flex items-center gap-3 text-cyan-brand">
                          <Link
                            to={`/subscriptions/plans/${p.slug}`}
                            aria-label={`View ${p.name}`}
                            className="transition hover:opacity-70"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/subscriptions/plans/${p.slug}/edit`}
                            aria-label={`Edit ${p.name}`}
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
