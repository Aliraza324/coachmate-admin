import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, LogOut, Menu, Search } from 'lucide-react'
import { getStoredUser, useAdminLogout } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { NotificationsBell } from '@/components/layout/NotificationsBell'

export function Topbar({ onMenuClick }) {
  const navigate = useNavigate()
  const toast = useToast()
  const user = getStoredUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const logoutMutation = useAdminLogout({
    onSuccess: (res) => {
      toast.success(res?.message || 'Logged out successfully')
    },
    onError: (err) => {
      toast.warning(
        err?.data?.message || err?.message || 'Logged out locally (server request failed)',
      )
    },
    onSettled: () => {
      setMenuOpen(false)
      navigate('/login', { replace: true })
    },
  })

  const handleLogout = () => {
    if (logoutMutation.isPending) return
    logoutMutation.mutate()
  }

  const displayName = user?.fullName || 'Admin'
  const role = user?.role ? user.role.replace(/^\w/, (c) => c.toUpperCase()) : 'Admin'

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-white/80 px-4 py-3 backdrop-blur sm:gap-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-ink-muted hover:text-ink lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="relative min-w-0 flex-1 sm:max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="search"
          placeholder="Search here"
          className="h-9 w-full rounded-full border border-border bg-surface pr-10 pl-9 text-sm placeholder:text-ink-muted focus:border-cyan-brand focus:bg-white focus:outline-none"
        />
        <button
          type="button"
          aria-label="Search"
          className="absolute top-1/2 right-1 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-cyan-brand text-white"
        >
          <Search size={14} />
        </button>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <NotificationsBell />

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-3 rounded-full pr-1 hover:bg-slate-50"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-soft text-sm font-semibold text-cyan-brand">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold text-ink">{displayName}</p>
              <p className="text-xs text-ink-muted">{role}</p>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {logoutMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin text-ink-muted" />
                ) : (
                  <LogOut size={16} className="text-ink-muted" />
                )}
                {logoutMutation.isPending ? 'Logging out…' : 'Log out'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
