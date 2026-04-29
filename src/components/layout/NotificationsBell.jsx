import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Loader2, Trash2, UserPlus } from 'lucide-react'
import {
  useAdminNotificationsSocket,
  useClearNotifications,
  useNotificationsList,
  useUnreadCount,
  disconnectAdminSocket,
} from '@/hooks/useNotifications'
import { clearAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

function formatRelative(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  if (Number.isNaN(diffMs)) return ''
  const diffSec = Math.max(1, Math.floor(diffMs / 1000))
  if (diffSec < 60) return `${diffSec}s ago`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString()
}

function NotificationIcon({ type }) {
  if (type === 'user_signup') {
    return (
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan-soft text-cyan-brand">
        <UserPlus size={16} />
      </div>
    )
  }
  return (
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-ink-muted">
      <Bell size={16} />
    </div>
  )
}

export function NotificationsBell() {
  const navigate = useNavigate()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  const handleAuthError = useCallback(
    (reason) => {
      disconnectAdminSocket()
      clearAuth()
      toast.warning(
        reason === 'account_suspended'
          ? 'Your admin account has been suspended.'
          : 'Session expired. Please log in again.',
      )
      navigate('/login', { replace: true })
    },
    [navigate, toast],
  )

  useAdminNotificationsSocket({ onAuthError: handleAuthError })

  const unreadQuery = useUnreadCount()
  const listQuery = useNotificationsList({ enabled: open })
  const clearMutation = useClearNotifications({
    onSuccess: (res) => {
      toast.success(res?.message || 'All notifications cleared')
    },
    onError: (err) => {
      toast.error(err?.data?.message || err?.message || 'Failed to clear notifications')
    },
  })

  const unreadCount = unreadQuery.data?.data?.unreadCount ?? 0
  const notifications = listQuery.data?.data?.notifications ?? []
  const total = listQuery.data?.data?.total ?? notifications.length

  const badgeLabel = useMemo(() => {
    if (!unreadCount) return null
    return unreadCount > 99 ? '99+' : String(unreadCount)
  }, [unreadCount])

  useEffect(() => {
    if (!open) return undefined
    const handleClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleToggle = () => {
    setOpen((v) => !v)
  }

  const handleClearAll = () => {
    if (clearMutation.isPending || notifications.length === 0) return
    clearMutation.mutate()
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Notifications"
        onClick={handleToggle}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink-muted hover:text-ink"
      >
        <Bell size={18} />
        {badgeLabel && (
          <span className="absolute -top-1 -right-1 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white ring-2 ring-white">
            {badgeLabel}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 z-30 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">Notifications</p>
              <p className="text-xs text-ink-muted">
                {total > 0
                  ? `${total} total${unreadCount ? ` · ${unreadCount} unread` : ''}`
                  : 'No notifications yet'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={clearMutation.isPending || notifications.length === 0}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-ink-muted hover:bg-surface hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
            >
              {clearMutation.isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Trash2 size={12} />
              )}
              Clear all
            </button>
          </div>

          <div className="max-h-[28rem] overflow-y-auto">
            {listQuery.isLoading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-ink-muted">
                <Loader2 size={14} className="animate-spin" />
                Loading…
              </div>
            ) : listQuery.isError ? (
              <div className="px-4 py-10 text-center text-sm text-danger">
                {listQuery.error?.data?.message ||
                  listQuery.error?.message ||
                  'Failed to load notifications'}
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell size={22} className="mx-auto mb-2 text-ink-muted" />
                <p className="text-sm text-ink">You're all caught up</p>
                <p className="text-xs text-ink-muted">
                  New admin notifications will appear here in real time.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map((n) => (
                  <li
                    key={n._id}
                    className={`flex items-start gap-3 px-4 py-3 ${n.isRead ? '' : 'bg-cyan-soft/40'}`}
                  >
                    <NotificationIcon type={n.type} />
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-sm font-medium text-ink">
                        {n.title || 'Notification'}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">{n.message}</p>
                      <p className="mt-1 text-[11px] text-ink-muted">
                        {formatRelative(n.createdAt)}
                      </p>
                    </div>
                    {!n.isRead && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-brand" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
