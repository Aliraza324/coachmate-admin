import React, { useState } from 'react'
import {
    Edit2,
    Lock,
    Trash2,
    Plus,
    CheckSquare,
    ChevronDown
} from 'lucide-react'

const PrivacySetting = () => {
    const [multiLanguage, setMultiLanguage] = useState(false)
    const [requirements, setRequirements] = useState({
        uppercase: true,
        numbers: true,
        special: true
    })

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-700 mt-5">
            
            {/* Data Retention & Password Policy Card */}
            <div className="bg-white rounded-[12px] border border-border shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-6 sm:mb-8">Privacy & Security Settings</h1>

                <div className="space-y-8 sm:space-y-10">

                    {/* Data Retention */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-ink border-b border-border/50 pb-2">Data Retention</h2>
                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-semibold text-ink">Retention Period</label>
                            <div className="relative">
                                <select className="w-full h-11 sm:h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all text-sm sm:text-base">
                                    <option>30 Days</option>
                                    <option>60 Days</option>
                                    <option>90 Days</option>
                                    <option>1 Year</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">Old logs and deleted items will be removed automatically from the primary database.</p>
                        </div>
                    </div>

                    {/* Password Policy */}
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-lg font-semibold text-ink border-b border-border/50 pb-2">Password Policy</h2>

                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-semibold text-ink">Minimum Password Length</label>
                            <div className="relative">
                                <select className="w-full h-11 sm:h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all text-sm sm:text-base">
                                    <option>6 characters</option>
                                    <option>8 characters</option>
                                    <option>12 characters</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm font-bold text-ink">Password Requirements</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                                <RequirementItem
                                    label="Must include uppercase letters"
                                    checked={requirements.uppercase}
                                    onChange={() => setRequirements(r => ({ ...r, uppercase: !r.uppercase }))}
                                />
                                <RequirementItem
                                    label="Must include numbers"
                                    checked={requirements.numbers}
                                    onChange={() => setRequirements(r => ({ ...r, numbers: !r.numbers }))}
                                />
                                <RequirementItem
                                    label="Must include special characters"
                                    checked={requirements.special}
                                    onChange={() => setRequirements(r => ({ ...r, special: !r.special }))}
                                />
                            </div>
                        </div>

                        <div className="pt-2 sm:pt-4">
                            <button className="w-full sm:w-auto bg-[#0F172A] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 text-sm sm:text-base">
                                Save Security Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Language & Localization Card */}
            <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
                <div className="space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-ink mb-2">Language & Localization</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start sm:items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">Default Language</label>
                            <div className="relative">
                                <select className="w-full h-11 sm:h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all text-sm sm:text-base">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/50 border border-border/50 gap-4">
                            <div className="space-y-0.5 min-w-0">
                                <p className="font-bold text-sm sm:text-base text-ink truncate">Multiple Languages</p>
                                <p className="text-[10px] sm:text-xs text-ink-muted">Enable multi-language support</p>
                            </div>
                            <button
                                onClick={() => setMultiLanguage(!multiLanguage)}
                                className={`relative inline-flex h-6 sm:h-7 w-11 sm:w-12 items-center rounded-full transition-colors duration-300 shrink-0 ${multiLanguage ? 'bg-[#0F172A]' : 'bg-slate-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 sm:h-5 w-4 sm:h-5 transform rounded-full bg-white transition-transform duration-300 ${multiLanguage ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Super Admin Accounts Card */}
            <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg sm:text-xl font-bold text-ink">Super Admin Accounts</h2>
                        <button className="w-full sm:w-auto bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md">
                            <Plus size={18} />
                            Add Super Admin
                        </button>
                    </div>

                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                            <table className="min-w-full border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="bg-slate-50/80">
                                        <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider rounded-l-xl">Admin ID</th>
                                        <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider">Name</th>
                                        <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider">Email</th>
                                        <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider hidden md:table-cell">Role</th>
                                        <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider">Status</th>
                                        <th className="px-4 sm:px-6 py-4 text-center text-[10px] sm:text-xs font-bold text-ink-muted uppercase tracking-wider rounded-r-xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    <tr className="group hover:bg-slate-50/50 transition-colors bg-white">
                                        <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm font-medium text-ink">ADM-001</td>
                                        <td className="px-4 sm:px-6 py-5">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-brand flex items-center justify-center text-white font-bold overflow-hidden shrink-0">
                                                    <img src="https://ui-avatars.com/api/?name=John+Smith&background=22A9F0&color=fff" alt="Avatar" />
                                                </div>
                                                <span className="text-xs sm:text-sm font-bold text-ink truncate max-w-[80px] sm:max-w-none">John Smith</span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm text-ink-muted truncate max-w-[120px] sm:max-w-none">john@admin.com</td>
                                        <td className="px-4 sm:px-6 py-5 text-xs sm:text-sm font-medium text-ink hidden md:table-cell">Owner</td>
                                        <td className="px-4 sm:px-6 py-5">
                                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-600">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-5">
                                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                                                <button className="text-cyan-brand hover:scale-110 transition-transform"><Edit2 size={16} /></button>
                                                <button className="text-orange-400 hover:scale-110 transition-transform"><Lock size={16} /></button>
                                                <button className="text-rose-500 hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

// Helper Component for Checkbox items
const RequirementItem = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div
            onClick={onChange}
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${checked ? 'bg-[#0F172A] border-[#0F172A]' : 'border-slate-300 bg-white group-hover:border-slate-400'
                }`}
        >
            {checked && <CheckSquare className="text-white" size={14} />}
        </div>
        <span className="text-xs sm:text-sm font-medium text-ink-muted group-hover:text-ink transition-colors leading-tight">{label}</span>
    </label>
)

export default PrivacySetting