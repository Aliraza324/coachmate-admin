import React, { useState } from 'react'
import { Image as ImageIcon, Save } from 'lucide-react'

const SystemSetting = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        sms: false
    })

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-700 rounded-[12px] border border-border shadow-sm p-3 sm:p-5 md:p-6 lg:p-8 bg-white mt-5">
            {/* General Settings Section */}
            <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">System Settings</h1>
                    <p className="text-ink-muted text-sm sm:text-base md:text-lg max-w-2xl">
                        Manage your platform configuration, app identity, and global communication preferences.
                    </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-lg sm:text-xl font-bold text-ink border-b border-border pb-4">General Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8">
                        {/* App Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">App Name</label>
                            <input
                                type="text"
                                placeholder="Community Connect"
                                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-border bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 focus:border-cyan-brand outline-none transition-all text-sm sm:text-base"
                            />
                        </div>

                        {/* Support Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">Support Email</label>
                            <input
                                type="email"
                                placeholder="support@communityapp.com"
                                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-border bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 focus:border-cyan-brand outline-none transition-all text-sm sm:text-base"
                            />
                        </div>

                        {/* App Logo */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">App Logo</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-border bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                                    <ImageIcon size={28} className="sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-2">
                                    <button className="bg-[#0F172A] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors w-fit">
                                        Upload Logo
                                    </button>
                                    <p className="text-[10px] sm:text-xs text-ink-muted">PNG/JPG, Max 2MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">Contact Number (Optional)</label>
                            <input
                                type="text"
                                placeholder="Enter support phone number"
                                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-border bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 focus:border-cyan-brand outline-none transition-all text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button className="w-full sm:w-auto bg-[#0F172A] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 text-sm sm:text-base">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Settings Section */}
            <div className="pt-4 sm:pt-6">
                <div className="space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-ink border-b border-border pb-4">Notification Settings</h2>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Push Notifications */}
                        <NotificationRow
                            title="Push Notifications"
                            description="Enable/disable push notifications for all users"
                            active={notifications.push}
                            onToggle={() => toggleNotification('push')}
                        />

                        {/* Email Notifications */}
                        <NotificationRow
                            title="Email Notifications"
                            description="Enable system-wide email alerts"
                            active={notifications.email}
                            onToggle={() => toggleNotification('email')}
                        />

                        {/* SMS Notifications */}
                        <NotificationRow
                            title="SMS Notifications"
                            description="Requires SMS Gateway setup"
                            active={notifications.sms}
                            onToggle={() => toggleNotification('sms')}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

// Helper Component for Notification Rows
const NotificationRow = ({ title, description, active, onToggle }) => (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/50 border border-transparent transition-all hover:border-slate-200 hover:bg-white group gap-4">
        <div className="space-y-1 min-w-0">
            <h4 className="font-bold text-sm sm:text-base text-ink group-hover:text-cyan-brand transition-colors truncate">{title}</h4>
            <p className="text-xs sm:text-sm text-ink-muted line-clamp-2">{description}</p>
        </div>
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 sm:h-7 w-11 sm:w-12 items-center rounded-full transition-colors duration-300 focus:outline-none shrink-0 ${active ? 'bg-[#0F172A]' : 'bg-slate-200'
                }`}
        >
            <span
                className={`inline-block h-4 sm:h-5 w-4 sm:h-5 transform rounded-full bg-white transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    </div>
)

export default SystemSetting