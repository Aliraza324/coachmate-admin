import { Card } from '@/components/ui/Card'

export function PlaceholderPage({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        )}
      </div>
      <Card className="flex min-h-[260px] items-center justify-center text-sm text-ink-muted">
        This screen is coming soon.
      </Card>
    </div>
  )
}
