import { StatCards } from '@/components/dashboard/StatCards'
import { WorkoutActivity } from '@/components/dashboard/WorkoutActivity'
import { RiskAlerts } from '@/components/dashboard/RiskAlerts'
import { RevenueOverview } from '@/components/dashboard/RevenueOverview'
import { UserGrowth } from '@/components/dashboard/UserGrowth'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { SystemAlerts } from '@/components/dashboard/SystemAlerts'

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4">
      <PageHeader />
      <StatCards />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <WorkoutActivity />
        </div>
        <RiskAlerts />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <RevenueOverview />
        <UserGrowth />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>
        <SystemAlerts />
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink sm:text-2xl">
        Dashboard Overview
      </h1>
      <p className="mt-1 text-xs text-ink-muted sm:text-sm">
        Monitor platform performance, user activity, and system health in real time.
      </p>
    </div>
  )
}
