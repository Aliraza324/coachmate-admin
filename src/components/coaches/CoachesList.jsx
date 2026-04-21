import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Eye,
  Pencil,
  Award,
  Ban,
  Trash2,
  Play,
  Check,
  X,
  Star,
  BadgeCheck,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { coaches, specializationMeta } from '@/data/coachesData'

const PAGE_SIZE = 5
const TOTAL_DISPLAY = 12458

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
  Suspended: 'bg-rose-50 text-rose-500',
}

const verificationStyles = {
  Verified: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
}

export function CoachesList() {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(coaches.length / PAGE_SIZE))
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return coaches.slice(start, start + PAGE_SIZE)
  }, [page])

  const rangeStart = (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, coaches.length)

  return (
    <div className="space-y-4">
      <Card className="p-0 sm:p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div>
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Coach Management</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Manage coach profiles, verify certifications, assign athletes, and monitor coach performance.
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
                  <Th>Coach</Th>
                  <Th>Specialization</Th>
                  <Th>Experience</Th>
                  <Th>Athletes</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                  <Th>Verification</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((coach, i) => {
                  const isLast = i === pageItems.length - 1
                  const spec = specializationMeta[coach.specialization]
                  const SpecIcon = spec?.icon
                  return (
                    <tr key={coach.id}>
                      <Td last={isLast}>
                        <div className="flex items-center gap-3">
                          <img
                            src={coach.avatar}
                            alt={coach.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold text-ink">{coach.name}</div>
                            <div className="text-xs text-ink-muted">{coach.email}</div>
                          </div>
                        </div>
                      </Td>
                      <Td last={isLast}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${spec?.className ?? ''}`}
                        >
                          {SpecIcon && <SpecIcon size={12} />}
                          {coach.specialization}
                        </span>
                      </Td>
                      <Td last={isLast} className="text-ink">
                        {coach.experience}
                      </Td>
                      <Td last={isLast} className="text-ink">
                        {coach.athletes}
                      </Td>
                      <Td last={isLast}>
                        <RatingStars value={coach.rating} />
                      </Td>
                      <Td last={isLast}>
                        <Pill className={statusStyles[coach.status]}>{coach.status}</Pill>
                      </Td>
                      <Td last={isLast}>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${verificationStyles[coach.verification]}`}
                        >
                          {coach.verification === 'Verified' && <Check size={12} />}
                          {coach.verification}
                        </span>
                      </Td>
                      <Td last={isLast}>
                        <ActionIcons coach={coach} />
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
        total={TOTAL_DISPLAY}
      />
    </div>
  )
}

function ActionIcons({ coach }) {
  if (coach.status === 'Pending') {
    return (
      <div className="flex items-center gap-3 text-cyan-brand">
        <Link to={`/coaches/${coach.slug}`} aria-label={`View ${coach.name}`} className="transition hover:opacity-70">
          <Eye size={18} />
        </Link>
        <IconButton label="Edit"><Pencil size={18} /></IconButton>
        <IconButton label="Certifications" className="text-slate-400 hover:text-slate-600">
          <BadgeCheck size={18} />
        </IconButton>
        <IconButton label="Approve" className="text-emerald-500 hover:text-emerald-600">
          <Check size={18} />
        </IconButton>
        <IconButton label="Reject" className="text-rose-500 hover:text-rose-600">
          <X size={18} />
        </IconButton>
      </div>
    )
  }
  if (coach.status === 'Suspended') {
    return (
      <div className="flex items-center gap-3 text-cyan-brand">
        <Link to={`/coaches/${coach.slug}`} aria-label={`View ${coach.name}`} className="transition hover:opacity-70">
          <Eye size={18} />
        </Link>
        <IconButton label="Edit"><Pencil size={18} /></IconButton>
        <IconButton label="Certifications" className="text-slate-400 hover:text-slate-600">
          <BadgeCheck size={18} />
        </IconButton>
        <IconButton label="Reactivate" className="text-emerald-500 hover:text-emerald-600">
          <Play size={18} fill="currentColor" />
        </IconButton>
        <IconButton label="Delete" className="text-rose-500 hover:text-rose-600">
          <Trash2 size={18} />
        </IconButton>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 text-cyan-brand">
      <Link to={`/coaches/${coach.slug}`} aria-label={`View ${coach.name}`} className="transition hover:opacity-70">
        <Eye size={18} />
      </Link>
      <IconButton label="Edit"><Pencil size={18} /></IconButton>
      <IconButton label="Certifications" className="text-slate-400 hover:text-slate-600">
        <Award size={18} />
      </IconButton>
      <IconButton label="Suspend"><Ban size={18} /></IconButton>
      <IconButton label="Delete" className="text-rose-500 hover:text-rose-600">
        <Trash2 size={18} />
      </IconButton>
    </div>
  )
}

function RatingStars({ value }) {
  const rounded = Math.round(value)
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className={i <= rounded ? 'text-amber-400' : 'text-slate-200'}
            fill="currentColor"
          />
        ))}
      </div>
      <span className="text-xs font-medium text-ink">{value.toFixed(1)}</span>
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

