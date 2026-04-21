import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-cyan-brand">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-ink-muted">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-cyan-brand px-4 py-2 text-sm font-medium text-white hover:bg-cyan-brand/90"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
