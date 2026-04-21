import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-1 py-4 sm:px-6 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
