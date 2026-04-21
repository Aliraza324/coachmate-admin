export function Card({ className = '', children }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5 ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
