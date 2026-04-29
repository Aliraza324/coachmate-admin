import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Eye,
  Ban,
  Trash2,
  Play,
  Check,
  X,
  BadgeCheck,
  Search,
  Loader2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import {
  useCoachesList,
  useSuspendCoach,
  useUnsuspendCoach,
  useDeleteCoach,
} from '@/hooks/useCoaches'
import { useToast } from '@/components/ui/Toast'

const PAGE_SIZE = 10

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-600',
  suspended: 'bg-rose-50 text-rose-500',
}

const verificationStyles = {
  verified: 'bg-emerald-50 text-emerald-600',
  pending: 'bg-amber-50 text-amber-600',
}

function SuspendModal({ coach, onClose, onConfirm, isPending }) {
  const [reason, setReason] = useState('')
  useEffect(() => {
    if (!coach) setReason('')
  }, [coach])
  if (!coach) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300">
            <Ban size={32} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">Suspend Coach</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            {coach.coach?.fullName} will lose access until the suspension is lifted.
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
            className="w-full resize-none rounded-xl border border-[#E6E9EF] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#22A9F0] focus:ring-2 focus:ring-[#22A9F0]/20"
          />
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(coach, reason)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteModal({ coach, onClose, onConfirm, isPending }) {
  if (!coach) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-ink-muted hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
            <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">Delete Coach</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Deleting {coach.coach?.fullName} will remove their account, profile, and
            athlete assignments permanently.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirm(coach)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function CoachesList() {
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

  const { data, isLoading, isError, error, isFetching } = useCoachesList({
    page,
    limit: PAGE_SIZE,
    search,
    status,
  })

  const coaches = data?.data?.coaches ?? []
  const pagination = data?.data?.pagination ?? { total: 0, totalPages: 1 }
  const total = pagination.total
  const totalPages = Math.max(1, pagination.totalPages)

  const rangeStart = useMemo(
    () => (total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1),
    [page, total],
  )
  const rangeEnd = Math.min(page * PAGE_SIZE, total)

  const suspendMutation = useSuspendCoach({
    onSuccess: (res) => {
      toast.success(res?.message || 'Coach suspended')
      setSuspendTarget(null)
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to suspend coach'),
  })

  const unsuspendMutation = useUnsuspendCoach({
    onSuccess: (res) => toast.success(res?.message || 'Coach unsuspended'),
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to unsuspend coach'),
  })

  const deleteMutation = useDeleteCoach({
    onSuccess: (res) => {
      toast.success(res?.message || 'Coach deleted')
      setDeleteTarget(null)
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to delete coach'),
  })

  return (
    <>
      <SuspendModal
        coach={suspendTarget}
        onClose={() => !suspendMutation.isPending && setSuspendTarget(null)}
        onConfirm={(coach, reason) => suspendMutation.mutate({ id: coach.coachId, reason })}
        isPending={suspendMutation.isPending}
      />

      <DeleteModal
        coach={deleteTarget}
        onClose={() => !deleteMutation.isPending && setDeleteTarget(null)}
        onConfirm={(coach) => deleteMutation.mutate({ id: coach.coachId })}
        isPending={deleteMutation.isPending}
      />

      <div className="space-y-4">
        <Card className="p-0 sm:p-0">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink sm:text-2xl">Coach Management</h2>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                {total > 0
                  ? `Showing ${rangeStart}–${rangeEnd} of ${total.toLocaleString()} coaches`
                  : 'No coaches found'}
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
                    <Th>Coach</Th>
                    <Th>Specialization</Th>
                    <Th>Experience</Th>
                    <Th>Athletes</Th>
                    <Th>Status</Th>
                    <Th>Verification</Th>
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
                        {error?.data?.message || error?.message || 'Failed to load coaches'}
                      </td>
                    </tr>
                  ) : coaches.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-muted">
                        No coaches match your filters
                      </td>
                    </tr>
                  ) : (
                    coaches.map((row, i) => {
                      const isLast = i === coaches.length - 1
                      const fullName = row.coach?.fullName || 'Unnamed'
                      const email = row.coach?.email || '—'
                      const specs = row.specializations || []
                      return (
                        <tr key={row.coachId}>
                          <Td last={isLast}>
                            <div className="flex items-center gap-3">
                              {row.coach?.profilePhoto?.url ? (
                                <img
                                  src={row.coach.profilePhoto.url}
                                  alt={fullName}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-soft text-sm font-semibold text-cyan-brand">
                                  {fullName.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-ink">{fullName}</div>
                                <div className="truncate text-xs text-ink-muted">{email}</div>
                              </div>
                            </div>
                          </Td>
                          <Td last={isLast}>
                            {specs.length ? (
                              <div className="flex flex-wrap gap-1">
                                {specs.slice(0, 2).map((s) => (
                                  <span
                                    key={s}
                                    className="inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-600"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {specs.length > 2 && (
                                  <span className="text-xs text-ink-muted">
                                    +{specs.length - 2}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-ink-muted/60">—</span>
                            )}
                          </Td>
                          <Td last={isLast} className="text-ink">
                            {row.yearsOfExperience != null
                              ? `${row.yearsOfExperience} yr${row.yearsOfExperience === 1 ? '' : 's'}`
                              : '—'}
                          </Td>
                          <Td last={isLast} className="text-ink">
                            {row.athletesCount ?? 0}
                          </Td>
                          <Td last={isLast}>
                            <Pill className={statusStyles[row.status] ?? 'bg-slate-100 text-ink-muted'}>
                              {(row.status || 'unknown').replace(/^\w/, (c) => c.toUpperCase())}
                            </Pill>
                          </Td>
                          <Td last={isLast}>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                verificationStyles[row.verification] ??
                                'bg-slate-100 text-ink-muted'
                              }`}
                            >
                              {row.verification === 'verified' && <BadgeCheck size={12} />}
                              {(row.verification || 'unknown').replace(/^\w/, (c) =>
                                c.toUpperCase(),
                              )}
                            </span>
                          </Td>
                          <Td last={isLast}>
                            <div className="flex items-center gap-3 text-cyan-brand">
                              <Link
                                to={`/coaches/${row.coachId}`}
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
                                    unsuspendMutation.mutate({ id: row.coachId })
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

function Td({ children, last = false, className = '' }) {
  return (
    <td
      className={`border-b border-border px-4 py-4 ${last ? 'border-b-0' : ''} ${className}`}
    >
      {children}
    </td>
  )
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
