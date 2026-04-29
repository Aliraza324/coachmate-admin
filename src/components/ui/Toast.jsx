import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from 'lucide-react'

const ToastContext = createContext(null)

const variantStyles = {
  success: {
    bar: 'bg-success',
    icon: CheckCircle2,
    iconClass: 'text-success',
  },
  error: {
    bar: 'bg-danger',
    icon: CircleAlert,
    iconClass: 'text-danger',
  },
  warning: {
    bar: 'bg-warning',
    icon: TriangleAlert,
    iconClass: 'text-warning',
  },
  info: {
    bar: 'bg-cyan-brand',
    icon: Info,
    iconClass: 'text-cyan-brand',
  },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (message, { variant = 'info', title, duration = 3500 } = {}) => {
      const id = ++idRef.current
      setToasts((prev) => [...prev, { id, message, variant, title }])
      if (duration > 0) {
        setTimeout(() => remove(id), duration)
      }
      return id
    },
    [remove],
  )

  const toast = useMemo(
    () => ({
      show,
      success: (message, opts) => show(message, { ...opts, variant: 'success' }),
      error: (message, opts) => show(message, { ...opts, variant: 'error' }),
      warning: (message, opts) => show(message, { ...opts, variant: 'warning' }),
      info: (message, opts) => show(message, { ...opts, variant: 'info' }),
      dismiss: remove,
    }),
    [show, remove],
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => {
          const { bar, icon: Icon, iconClass } = variantStyles[t.variant] ?? variantStyles.info
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto flex overflow-hidden rounded-xl border border-border bg-white shadow-lg"
            >
              <div className={`w-1 shrink-0 ${bar}`} />
              <div className="flex flex-1 items-start gap-3 p-3">
                <Icon size={18} className={`mt-0.5 shrink-0 ${iconClass}`} />
                <div className="min-w-0 flex-1 leading-tight">
                  {t.title && <p className="text-sm font-semibold text-ink">{t.title}</p>}
                  <p className="text-sm text-ink-muted">{t.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Dismiss"
                  className="shrink-0 rounded-full p-1 text-ink-muted hover:bg-surface hover:text-ink"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
