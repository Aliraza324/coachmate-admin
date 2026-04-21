import { AlertOctagon, ShieldAlert, UserPlus, Trophy } from 'lucide-react'
import { systemAlerts } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

const toneStyles = {
  danger: { bg: 'bg-red-50', text: 'text-danger', Icon: AlertOctagon },
  warning: { bg: 'bg-amber-50', text: 'text-warning', Icon: ShieldAlert },
  info: { bg: 'bg-sky-50', text: 'text-cyan-brand', Icon: UserPlus },
  success: { bg: 'bg-emerald-50', text: 'text-success', Icon: Trophy },
}

export function SystemAlerts() {
  return (
    <Card>
      <CardHeader title="System Alerts & Notifications" />
      <ul className="space-y-2.5">
        {systemAlerts.map((alert) => {
          const tone = toneStyles[alert.tone]
          const Icon = tone.Icon
          return (
            <li
              key={alert.id}
              className={`flex items-start gap-3 rounded-xl ${tone.bg} px-3 py-2.5`}
            >
              <span className={`mt-0.5 ${tone.text}`}>
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{alert.title}</p>
                <p className="truncate text-xs text-ink-muted">{alert.meta}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
