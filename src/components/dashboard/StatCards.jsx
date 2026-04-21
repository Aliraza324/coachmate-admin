import { stats } from '@/data/dashboardData'

export function StatCards() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </section>
  )
}

function StatCard({ label, value, icon: Icon, trend, highlighted, iconFilled }) {
  const isHighlighted = Boolean(highlighted)

  const card = isHighlighted
    ? 'bg-cyan-brand text-white shadow-[0_4px_14px_rgba(34,169,240,0.35)]'
    : 'bg-white border border-border shadow-[0_1px_2px_rgba(15,23,42,0.04)]'

  const iconTile = isHighlighted ? 'bg-white' : 'bg-[#F1F5F9]'
  const iconColor = 'text-cyan-brand'
  const trendText = isHighlighted ? 'text-white/90' : 'text-success'
  const valueText = isHighlighted ? 'text-white' : 'text-ink'
  const labelText = isHighlighted ? 'text-white/85' : 'text-ink-muted'

  return (
    <div className={`rounded-2xl p-4 sm:p-5 ${card}`}>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 ${iconTile}`}
        >
          <Icon
            size={22}
            className={iconColor}
            {...(iconFilled ? { fill: 'currentColor' } : {})}
          />
        </span>
        {trend && (
          <span
            className={`pt-1 text-right text-[11px] font-medium sm:text-xs ${trendText}`}
          >
            {trend.value}
          </span>
        )}
      </div>

      <p
        className={`mt-6 text-2xl leading-none font-bold sm:mt-8 sm:text-3xl ${valueText}`}
      >
        {value}
      </p>
      <p className={`mt-2 text-xs sm:text-sm ${labelText}`}>{label}</p>
    </div>
  )
}
