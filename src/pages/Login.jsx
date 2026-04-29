import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useAdminLogin, getStoredToken } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/'

  const { mutate, isPending } = useAdminLogin({
    onSuccess: (response) => {
      toast.success(response?.message || 'Logged in successfully', {
        title: 'Welcome back',
      })
      navigate(redirectTo, { replace: true })
    },
    onError: (error) => {
      toast.error(error?.data?.message || error?.message || 'Invalid credentials', {
        title: 'Login failed',
      })
    },
  })

  if (getStoredToken()) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.warning('Please enter both email and password')
      return
    }
    mutate({ email: email.trim(), password })
  }

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-semibold text-ink">CoachMate Admin</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in to access the dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@coachmate.com"
                  className="h-11 w-full rounded-lg border border-border bg-white pr-3 pl-9 text-sm text-ink placeholder:text-ink-muted focus:border-cyan-brand focus:outline-none focus:ring-2 focus:ring-cyan-soft"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-border bg-white pr-10 pl-9 text-sm text-ink placeholder:text-ink-muted focus:border-cyan-brand focus:outline-none focus:ring-2 focus:ring-cyan-soft"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-ink-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy text-sm font-semibold text-white transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} CoachMate. All rights reserved.
        </p>
      </div>
    </div>
  )
}
