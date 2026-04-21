import { Bell, Menu, Search } from 'lucide-react'

export function Topbar({ onMenuClick }) {
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
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink-muted hover:text-ink"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-ink">Bilal Khan</p>
            <p className="text-xs text-ink-muted">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
