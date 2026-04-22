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
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 mt-5">
            {/* Data Retention & Password Policy Card */}
            <div className="bg-white rounded-[12px] border border-border shadow-sm overflow-hidden p-4">
                {/* Header */}
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Privacy & Security Settings</h1>

                <div className="p-8 space-y-10">

                    {/* Data Retention */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-ink">Data Retention</h2>
                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-semibold text-ink">Retention Period</label>
                            <div className="relative">
                                <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all">
                                    <option>30 Days</option>
                                    <option>60 Days</option>
                                    <option>90 Days</option>
                                    <option>1 Year</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                            <p className="text-sm text-ink-muted">Old logs and deleted items will be removed automatically</p>
                        </div>
                    </div>

                    {/* Password Policy */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-ink">Password Policy</h2>

                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-semibold text-ink">Minimum Password Length</label>
                            <div className="relative">
                                <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all">
                                    <option>6 characters</option>
                                    <option>8 characters</option>
                                    <option>12 characters</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm font-semibold text-ink">Password Requirements</p>
                            <div className="space-y-3">
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

                        <div className="pt-4">
                            <button className="bg-[#0F172A] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                Save Security Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Language & Localization Card */}
            <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
                <div className="p-8">
                    <h2 className="text-xl font-bold text-ink mb-6">Language & Localization</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ink">Default Language</label>
                            <div className="relative">
                                <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-slate-50/50 appearance-none focus:bg-white focus:ring-2 focus:ring-cyan-brand/20 outline-none transition-all">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-border/50">
                            <div className="space-y-0.5">
                                <p className="font-bold text-ink">Multiple Languages</p>
                                <p className="text-xs text-ink-muted">Enable multi-language support</p>
                            </div>
                            <button
                                onClick={() => setMultiLanguage(!multiLanguage)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${multiLanguage ? 'bg-[#0F172A]' : 'bg-slate-200'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${multiLanguage ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Super Admin Accounts Card */}
            <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-ink">Super Admin Accounts</h2>
                        <button className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md">
                            <Plus size={18} />
                            Add Super Admin
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-ink-muted uppercase tracking-wider rounded-l-xl">Admin ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-ink-muted uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-ink-muted uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-ink-muted uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-ink-muted uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-ink-muted uppercase tracking-wider rounded-r-xl">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 text-sm font-medium text-ink">ADM-001</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-cyan-brand flex items-center justify-center text-white font-bold overflow-hidden">
                                                <img src="https://ui-avatars.com/api/?name=John+Smith&background=22A9F0&color=fff" alt="Avatar" />
                                            </div>
                                            <span className="text-sm font-bold text-ink">John Smith</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-ink-muted">john@admin.com</td>
                                    <td className="px-6 py-5 text-sm font-medium text-ink">Owner</td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-3">
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
    )
}

// Helper Component for Checkbox items
const RequirementItem = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div
            onClick={onChange}
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${checked ? 'bg-[#0F172A] border-[#0F172A]' : 'border-slate-300 bg-white group-hover:border-slate-400'
                }`}
        >
            {checked && <CheckSquare className="text-white" size={14} />}
        </div>
        <span className="text-sm font-medium text-ink-muted group-hover:text-ink transition-colors">{label}</span>
    </label>
)

export default PrivacySetting