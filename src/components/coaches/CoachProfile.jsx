import { ArrowLeft, Ban, FileText, Mail, Phone } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
  Suspended: 'bg-rose-50 text-rose-500',
}

export function CoachProfile({ coach, onBack }) {
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
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50"
            >
              <FileText size={16} />
              View Certifications
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100"
            >
              <Ban size={16} />
              Suspend Coach
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={coach.avatar}
                alt={coach.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">{coach.name}</h2>
              <span
                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[coach.status]}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {coach.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-ink">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-ink-muted" />
              <span>{coach.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-ink-muted" />
              <span>{coach.phone}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border p-5">
          <h3 className="text-base font-semibold text-ink">Personal Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <InfoField label="Full Name" value={coach.name} />
            <InfoField label="Email" value={coach.email} />
            <InfoField label="Phone" value={coach.phone} />
            <InfoField label="Gender" value={coach.gender} />
            <InfoField label="Experience" value={coach.experience} />
            <InfoField label="Specialization" value={coach.specialization} />
          </dl>
          <div className="mt-5">
            <dt className="text-xs text-ink-muted">Bio</dt>
            <dd className="mt-1 text-sm text-ink">{coach.bio}</dd>
          </div>
        </div>
      </Card>
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
