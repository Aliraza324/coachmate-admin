import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { recentActivity } from '@/data/dashboardData'
import { Card, CardHeader } from '@/components/ui/Card'

const statusIcon = {
  success: <CheckCircle2 size={16} className="text-success" />,
  warning: <AlertTriangle size={16} className="text-warning" />,
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader title="Recent Platform Activity" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-muted">
              <th className="pb-3 font-medium">User Name</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Activity</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row) => (
              <tr key={row.name} className="border-t border-border">
                <td className="py-3 font-medium text-ink">{row.name}</td>
                <td className="py-3 text-ink-muted">{row.role}</td>
                <td className="py-3 text-ink-muted">{row.activity}</td>
                <td className="py-3 text-ink-muted">{row.date}</td>
                <td className="py-3">{statusIcon[row.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
