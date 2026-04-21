import { NavLink, Outlet } from 'react-router-dom'

const TABS = [
  { label: 'Workout Library', to: '/workouts/library' },
  { label: 'Exercise Library', to: '/workouts/exercises' },
  { label: 'Workout Templates', to: '/workouts/templates' },
]

export function Workouts() {
  return (
    <div className="space-y-5">
      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${isActive
                ? 'border-cyan-brand text-cyan-brand'
                : 'border-transparent text-ink-muted hover:text-ink'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
