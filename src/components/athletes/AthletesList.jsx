import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, Pencil, UserPlus, Ban, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { athletes } from '@/data/athletesData'

const PAGE_SIZE = 4
const TOTAL_DISPLAY = 12458

const subscriptionStyles = {
  Premium: 'bg-emerald-50 text-emerald-600',
  Pro: 'bg-sky-50 text-sky-600',
  Free: 'bg-slate-100 text-ink-muted',
}

const activityStyles = {
  High: 'bg-emerald-50 text-emerald-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-rose-50 text-rose-500',
}

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  Inactive: 'bg-slate-100 text-ink-muted',
}

export function AthletesList() {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(athletes.length / PAGE_SIZE))
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return athletes.slice(start, start + PAGE_SIZE)
  }, [page])

  const rangeStart = (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, athletes.length)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Athletes List</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Showing {rangeStart}–{rangeEnd} of {TOTAL_DISPLAY.toLocaleString()} athletes
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="px-1 pb-4 sm:px-5 sm:pb-5">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-xs text-ink-muted">
                  <Th>Athlete</Th>
                  <Th>Coach</Th>
                  <Th>Subscription</Th>
                  <Th>Activity</Th>
                  <Th>Last Activity</Th>
                  <Th>Status</Th>
                  <Th>Progress</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((athlete, i) => (
                  <tr key={athlete.id} className="group">
                    <Td first last={i === pageItems.length - 1}>
                      <div className="flex items-center gap-3">
                        <img
                          src={athlete.avatar}
                          alt={athlete.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-ink">{athlete.name}</div>
                          <div className="text-xs text-ink-muted">{athlete.email}</div>
                        </div>
                      </div>
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      {athlete.coach ? (
                        <span className="text-ink">{athlete.coach}</span>
                      ) : (
                        <span className="text-ink-muted/60">Unassigned</span>
                      )}
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      <Pill className={subscriptionStyles[athlete.subscription]}>
                        {athlete.subscription}
                      </Pill>
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      <Pill className={activityStyles[athlete.activity]}>{athlete.activity}</Pill>
                    </Td>
                    <Td last={i === pageItems.length - 1} className="text-ink-muted">
                      {athlete.lastActivity}
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      <Pill className={statusStyles[athlete.status]}>{athlete.status}</Pill>
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${athlete.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-ink">{athlete.progress}%</span>
                      </div>
                    </Td>
                    <Td last={i === pageItems.length - 1}>
                      <div className="flex items-center gap-3 text-cyan-brand">
                        <Link
                          to={`/athletes/${athlete.slug}`}
                          aria-label={`View ${athlete.name}`}
                          className="transition hover:opacity-70"
                        >
                          <Eye size={18} />
                        </Link>
                        <IconButton label="Edit">
                          <Pencil size={18} />
                        </IconButton>
                        <IconButton label="Assign coach">
                          <UserPlus size={18} />
                        </IconButton>
                        <IconButton label="Suspend">
                          <Ban size={18} />
                        </IconButton>
                        <IconButton label="Delete" className="text-rose-500 hover:text-rose-600">
                          <Trash2 size={18} />
                        </IconButton>
                      </div>
                    </Td>
                  </tr>
                ))}
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
        total={TOTAL_DISPLAY}
      />
    </div>
  )
}

function Th({ children }) {
  return (
    <th className="border-b border-border bg-slate-50 px-4 py-3 font-medium first:rounded-tl-xl last:rounded-tr-xl">
      {children}
    </th>
  )
}

function Td({ children, first = false, last = false, className = '' }) {
  const base = `border-b border-border px-4 py-4 ${className}`
  const rounded = last ? (first ? 'first:rounded-bl-xl' : 'last:rounded-br-xl') : ''
  const noBorder = last ? 'border-b-0' : ''
  return <td className={`${base} ${rounded} ${noBorder}`}>{children}</td>
}

function Pill({ children, className = '' }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

function IconButton({ children, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`transition hover:opacity-70 ${className}`}
    >
      {children}
    </button>
  )
}

