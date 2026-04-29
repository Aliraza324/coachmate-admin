import { useState } from 'react'
import {
  ArrowLeft,
  Ban,
  BadgeCheck,
  FileText,
  Loader2,
  Mail,
  Phone,
  Play,
  Trash2,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import {
  useCoachDetail,
  useSuspendCoach,
  useUnsuspendCoach,
  useDeleteCoach,
} from '@/hooks/useCoaches'
import { useToast } from '@/components/ui/Toast'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function CoachProfile({ coachId, onBack }) {
  const toast = useToast()
  const { data, isLoading, isError, error } = useCoachDetail(coachId)
  const [suspendOpen, setSuspendOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [reason, setReason] = useState('')

  const suspendMutation = useSuspendCoach({
    onSuccess: (res) => {
      toast.success(res?.message || 'Coach suspended')
      setSuspendOpen(false)
      setReason('')
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
      onBack?.()
    },
    onError: (err) =>
      toast.error(err?.data?.message || err?.message || 'Failed to delete coach'),
  })

  if (isLoading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-ink-muted">
        <Loader2 size={22} className="animate-spin" />
      </div>
    )
  }

  if (isError || !data?.data?.profile) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to Coaches
        </button>
        <Card>
          <p className="text-sm text-rose-500">
            {error?.data?.message || error?.message || 'Coach not found'}
          </p>
        </Card>
      </div>
    )
  }

  const profile = data.data.profile
  const user = profile.user || {}
  const personal = profile.personalInfo || {}
  const professional = profile.professional || {}
  const isSuspended = user.isSuspended
  const certifications = professional.certifications || []

  return (
    <div className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Coaches
      </button>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-ink sm:text-2xl">Coach Profile</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {isSuspended ? (
              <button
                type="button"
                disabled={unsuspendMutation.isPending}
                onClick={() => unsuspendMutation.mutate({ id: profile.coachId })}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-70"
              >
                {unsuspendMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Play size={16} fill="currentColor" />
                )}
                Unsuspend
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSuspendOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
              >
                <Ban size={16} />
                Suspend Coach
              </button>
            )}
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {personal.profilePhoto?.url ? (
                <img
                  src={personal.profilePhoto.url}
                  alt={user.fullName}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-soft text-2xl font-semibold text-cyan-brand">
                  {(user.fullName || '?').charAt(0).toUpperCase()}
                </div>
              )}
              <span
                className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white ${
                  isSuspended ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">{user.fullName || 'Unnamed'}</h2>
              <span
                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isSuspended ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {isSuspended ? 'Suspended' : 'Active'}
              </span>
              {isSuspended && user.suspensionReason && (
                <p className="mt-1 text-xs text-rose-500">Reason: {user.suspensionReason}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-ink">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-ink-muted" />
              <span>{user.email || '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-ink-muted" />
              <span>{personal.phoneNumber || '—'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <h3 className="text-base font-semibold text-ink">Personal Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <InfoField label="Full Name" value={user.fullName || '—'} />
            <InfoField label="Email" value={user.email || '—'} />
            <InfoField label="Phone" value={personal.phoneNumber || '—'} />
            <InfoField label="Gender" value={personal.gender || '—'} />
            <InfoField
              label="Experience"
              value={
                professional.yearsOfExperience != null
                  ? `${professional.yearsOfExperience} yr${professional.yearsOfExperience === 1 ? '' : 's'}`
                  : '—'
              }
            />
            <InfoField
              label="Specializations"
              value={(professional.specializations || []).join(', ') || '—'}
            />
          </dl>
          {professional.bio && (
            <div className="mt-5">
              <dt className="text-xs text-ink-muted">Bio</dt>
              <dd className="mt-1 text-sm text-ink">{professional.bio}</dd>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-5">
            <h3 className="text-base font-semibold text-ink">Performance</h3>
            <dl className="mt-4 grid grid-cols-2 gap-y-4 text-sm">
              <dt className="text-ink-muted">Athletes:</dt>
              <dd className="font-semibold text-ink">{profile.athletesCount ?? 0}</dd>
              <dt className="text-ink-muted">Referral Code:</dt>
              <dd className="font-semibold text-ink">{professional.referralCode || '—'}</dd>
              <dt className="text-ink-muted">Profile:</dt>
              <dd className="font-semibold text-ink">
                {professional.isProfileComplete ? 'Complete' : 'Incomplete'}
              </dd>
              <dt className="text-ink-muted">Joined:</dt>
              <dd className="font-semibold text-ink">{formatDate(user.createdAt)}</dd>
            </dl>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
              Certifications:
              <span
                className={`inline-flex items-center gap-1 text-sm font-medium ${
                  profile.verification === 'verified' ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {profile.verification === 'verified' && <BadgeCheck size={14} />}
                {(profile.verification || 'unknown').replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </h3>
            {certifications.length ? (
              <div className="mt-4 space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert._id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-border bg-slate-50 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{cert.name}</p>
                      <p className="truncate text-xs text-ink-muted">
                        {cert.issuer}
                        {cert.year ? ` · ${cert.year}` : ''}
                      </p>
                    </div>
                    {cert.file?.url && (
                      <a
                        href={cert.file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan-brand hover:underline"
                      >
                        <FileText size={14} />
                        View
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-ink-muted">No certifications uploaded</p>
            )}
          </div>
        </div>
      </Card>

      {suspendOpen && (
        <Modal onClose={() => !suspendMutation.isPending && setSuspendOpen(false)}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300">
              <Ban size={32} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">Suspend Coach</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              {user.fullName} will lose access until the suspension is lifted.
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
              disabled={suspendMutation.isPending}
              onClick={() => suspendMutation.mutate({ id: profile.coachId, reason })}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {suspendMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Confirm
            </button>
            <button
              type="button"
              disabled={suspendMutation.isPending}
              onClick={() => setSuspendOpen(false)}
              className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {deleteOpen && (
        <Modal onClose={() => !deleteMutation.isPending && setDeleteOpen(false)}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-rose-50">
              <Trash2 size={32} className="text-rose-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">Delete Coach</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Deleting {user.fullName} will remove their account, profile, and athlete
              assignments permanently. This action cannot be undone.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate({ id: profile.coachId })}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {deleteMutation.isPending && <Loader2 size={14} className="animate-spin" />}
              Confirm
            </button>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => setDeleteOpen(false)}
              className="flex-1 rounded-xl border border-[#E6E9EF] py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }) {
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
        {children}
      </div>
    </div>
  )
}

function InfoField({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
    </div>
  )
}
