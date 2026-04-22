import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, Ban, Trash2, X } from 'lucide-react'
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

/* ── Suspend Modal ───────────────────────────────────────── */
function SuspendModal({ athlete, onClose, onConfirm }) {
  const [reason, setReason] = useState('')
  if (!athlete) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300">
            <Ban size={32} className="text-slate-400" strokeWidth={1.5} />
          </div>

          <h2 className="text-lg font-bold text-[#0F172A]">Suspend User Account</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Are you sure you want to suspend this user?
            <br />
            The user will lose access to their account until the
            <br />
            suspension is lifted.
          </p>
        </div>

        {/* Reason */}
        <div className="mt-5">
          <p className="mb-1.5 text-sm font-medium text-[#0F172A]">
            Reason for Suspension (optional)
          </p>
          <textarea
            rows={1}
            placeholder="Please specify a reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full resize-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20 transition"
          />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(athlete, reason); onClose() }}
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

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ athlete, onClose, onConfirm }) {
  if (!athlete) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
            <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>

          <h2 className="text-lg font-bold text-[#0F172A]">Delete Athlete</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting this user will remove all associated access,
            <br />
            and activity permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => { onConfirm(athlete); onClose() }}
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

/* ── Main List ───────────────────────────────────────────── */
export function AthletesList() {
  const [page, setPage] = useState(1)
  const [suspendTarget, setSuspendTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const totalPages = Math.max(1, Math.ceil(athletes.length / PAGE_SIZE))
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return athletes.slice(start, start + PAGE_SIZE)
  }, [page])

  const rangeStart = (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, athletes.length)

  const handleSuspendConfirm = (athlete, reason) => {
    // TODO: wire to API
    console.log('Suspend', athlete.name, reason)
  }

  const handleDeleteConfirm = (athlete) => {
    // TODO: wire to API
    console.log('Delete', athlete.name)
  }

  return (
    <>
      {/* ── Suspend Modal ── */}
      <SuspendModal
        athlete={suspendTarget}
        onClose={() => setSuspendTarget(null)}
        onConfirm={handleSuspendConfirm}
      />

      {/* ── Delete Modal ── */}
      <DeleteModal
        athlete={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

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
                          <IconButton
                            label="Suspend"
                            onClick={() => setSuspendTarget(athlete)}
                          >
                            <Ban size={18} />
                          </IconButton>
                          <IconButton
                            label="Delete"
                            className="text-[#00A5D9]"
                            onClick={() => setDeleteTarget(athlete)}
                          >
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
    </>
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
