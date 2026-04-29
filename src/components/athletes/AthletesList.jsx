import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, Ban, Trash2, X, Search, Loader2, Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import {
  useAthletesList,
  useSuspendAthlete,
  useUnsuspendAthlete,
  useDeleteAthlete,
} from '@/hooks/useAthletes'
import { useToast } from '@/components/ui/Toast'

const PAGE_SIZE = 10

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-600',
  suspended: 'bg-rose-50 text-rose-500',
}

function formatRelative(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return '—'
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

function SuspendModal({ athlete, onClose, onConfirm, isPending }) {
  const [reason, setReason] = useState('')
  useEffect(() => {
    if (!athlete) setReason('')
  }, [athlete])
  if (!athlete) return null
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
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300">
            <Ban size={32} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">Suspend Athlete</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            {athlete.athlete?.fullName} will lose access to their account
            <br />
            until the suspension is lifted.
          </p>
        </div>

        <div className="mt-5">
          <p className="mb-1.5 text-sm font-medium text-[#0F172A]">
            Reason for Suspension (optional)
          </p>
          <textarea
            rows={2}
            placeholder="Please specify a reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full resize-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20 transition"
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(athlete, reason)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-70"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteModal({ athlete, onClose, onConfirm, isPending }) {
  if (!athlete) return null
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
          <h2 className="text-lg font-bold text-[#0F172A]">Delete Athlete</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            Deleting {athlete.athlete?.fullName} will remove their account,
            <br />
            profile, and coach requests permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(athlete)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-70"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function AthletesList() {
  const toast = useToast()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [suspendTarget, setSuspendTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { data, isLoading, isError, error, isFetching } = useAthletesList({
    page,
    limit: PAGE_SIZE,
    search,
    status,
  })

  const athletes = data?.data?.athletes ?? []
  const pagination = data?.data?.pagination ?? { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 }
  const total = pagination.total
  const totalPages = Math.max(1, pagination.totalPages)

  const rangeStart = useMemo(
    () => (total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1),
    [page, total],
  )
  const rangeEnd = Math.min(page * PAGE_SIZE, total)

  const suspendMutation = useSuspendAthlete({
    onSuccess: (res) => {
      toast.success(res?.message || 'Athlete suspended')
      setSuspendTarget(null)
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to suspend athlete'),
  })

  const unsuspendMutation = useUnsuspendAthlete({
    onSuccess: (res) => toast.success(res?.message || 'Athlete unsuspended'),
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to unsuspend athlete'),
  })

  const deleteMutation = useDeleteAthlete({
    onSuccess: (res) => {
      toast.success(res?.message || 'Athlete deleted')
      setDeleteTarget(null)
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to delete athlete'),
  })

  return (
    <>
      <SuspendModal
        athlete={suspendTarget}
        onClose={() => !suspendMutation.isPending && setSuspendTarget(null)}
        onConfirm={(athlete, reason) =>
          suspendMutation.mutate({ id: athlete.athleteId, reason })
        }
        isPending={suspendMutation.isPending}
      />

      <DeleteModal
        athlete={deleteTarget}
        onClose={() => !deleteMutation.isPending && setDeleteTarget(null)}
        onConfirm={(athlete) => deleteMutation.mutate({ id: athlete.athleteId })}
        isPending={deleteMutation.isPending}
      />

      <div className="space-y-4">
        <Card className="p-0 sm:p-0">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">Athletes List</h2>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                {total > 0
                  ? `Showing ${rangeStart}–${rangeEnd} of ${total.toLocaleString()} athletes`
                  : 'No athletes found'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
                />
                <input
                  type="search"
                  placeholder="Search by name or email"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="h-9 w-56 rounded-lg border border-border bg-white pr-3 pl-8 text-sm placeholder:text-ink-muted focus:border-cyan-brand focus:outline-none"
                />
              </div>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(1)
                }}
                className="h-9 rounded-lg border border-border bg-white px-3 text-sm text-ink focus:border-cyan-brand focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
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
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-ink-muted">
                        <Loader2 size={18} className="mx-auto animate-spin" />
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-rose-500">
                        {error?.data?.message || error?.message || 'Failed to load athletes'}
                      </td>
                    </tr>
                  ) : athletes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-muted">
                        No athletes match your filters
                      </td>
                    </tr>
                  ) : (
                    athletes.map((row, i) => {
                      const isLast = i === athletes.length - 1
                      const fullName = row.athlete?.fullName || 'Unnamed'
                      const email = row.athlete?.email || '—'
                      return (
                        <tr key={row.athleteId} className="group">
                          <Td first last={isLast}>
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan-soft text-sm font-semibold text-cyan-brand">
                                {fullName.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-ink">{fullName}</div>
                                <div className="truncate text-xs text-ink-muted">{email}</div>
                              </div>
                            </div>
                          </Td>
                          <Td last={isLast}>
                            {row.coach ? (
                              <span className="text-ink">{row.coach}</span>
                            ) : (
                              <span className="text-ink-muted/60">Unassigned</span>
                            )}
                          </Td>
                          <Td last={isLast} className="text-ink-muted">
                            {row.subscription || '—'}
                          </Td>
                          <Td last={isLast} className="text-ink-muted">
                            {row.activity || '—'}
                          </Td>
                          <Td last={isLast} className="text-ink-muted">
                            {formatRelative(row.lastActivity || row.lastLoginAt)}
                          </Td>
                          <Td last={isLast}>
                            <Pill className={statusStyles[row.status] ?? 'bg-slate-100 text-ink-muted'}>
                              {(row.status || 'unknown').replace(/^\w/, (c) => c.toUpperCase())}
                            </Pill>
                          </Td>
                          <Td last={isLast}>
                            <div className="flex items-center gap-3 text-cyan-brand">
                              <Link
                                to={`/athletes/${row.athleteId}`}
                                aria-label={`View ${fullName}`}
                                className="transition hover:opacity-70"
                              >
                                <Eye size={18} />
                              </Link>
                              {row.status === 'suspended' ? (
                                <IconButton
                                  label="Unsuspend"
                                  className="text-emerald-500 hover:text-emerald-600"
                                  onClick={() =>
                                    unsuspendMutation.mutate({ id: row.athleteId })
                                  }
                                >
                                  <Play size={18} fill="currentColor" />
                                </IconButton>
                              ) : (
                                <IconButton
                                  label="Suspend"
                                  onClick={() => setSuspendTarget(row)}
                                >
                                  <Ban size={18} />
                                </IconButton>
                              )}
                              <IconButton
                                label="Delete"
                                className="text-rose-500 hover:text-rose-600"
                                onClick={() => setDeleteTarget(row)}
                              >
                                <Trash2 size={18} />
                              </IconButton>
                            </div>
                          </Td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            {isFetching && !isLoading && (
              <p className="mt-2 text-right text-xs text-ink-muted">Updating…</p>
            )}
          </div>
        </Card>

        {total > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={total}
          />
        )}
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
