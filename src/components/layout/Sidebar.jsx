import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import logoUrl from '@/assets/images/logo.png'
import promoUrl from '@/assets/images/bgBottom.png'
import { navItems } from '@/data/nav'

export function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col bg-navy text-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-6">
          <img src={logoUrl} alt="CoachMate" className="h-9 w-9" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
          <ul className="space-y-1">
            {navItems.map(({ path, label, icon: Icon, end }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      isActive
                        ? 'bg-white/10 font-medium text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-cyan-brand" />
                      )}
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? 'text-cyan-brand'
                            : 'text-white/60 group-hover:text-white'
                        }
                      />
                      <span className="truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <PromoCard />
      </aside>
    </>
  )
}

function PromoCard() {
  return (
    <div className="m-4 overflow-hidden rounded-2xl shadow-lg">
      <div
        className="relative flex min-h-[150px] flex-col justify-end gap-2 p-4"
        style={{
          backgroundImage: `url(${promoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <span className="relative mb-auto grid h-8 w-8 place-items-center rounded-lg bg-cyan-brand text-xs font-semibold text-white">
          BA
        </span>

        <p className="relative text-sm leading-snug font-medium text-white">
          All Manage In One Place
        </p>
        <button
          type="button"
          className="relative w-fit rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:bg-white/90"
        >
          View Analytics
        </button>
      </div>
    </div>
  )
}
