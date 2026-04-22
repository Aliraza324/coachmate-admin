import React from 'react'
import {
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  CreditCard,
  CheckCircle2,
  Calendar,
  User
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import user from "../assets/images/userscreen.svg";
import card from "../assets/images/card.svg";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function PlaceholderPage({ title, description }) {
  // --- Chart Data & Options ---

  // Daily Active Users (Line Chart)
  const dauData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Active Users',
        data: [5000, 13000, 24000, 36000, 25000, 42000, 48000],
        fill: true,
        borderColor: '#0F172A',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
          gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#0F172A',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const dauOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { borderDash: [5, 5], color: '#E2E8F0' },
        ticks: {
          color: '#64748B',
          callback: (value) => value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
    },
  };

  // Workout Completion Rate (Bar + Line)
  const completionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        type: 'line',
        label: 'Trend',
        data: [25, 42, 68, 85, 75, 95, 88],
        borderColor: '#0F172A',
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
        order: 1,
      },
      {
        type: 'bar',
        label: 'Completion',
        data: [100, 85, 52, 72, 45, 36, 25],
        backgroundColor: '#22A9F0',
        borderRadius: 12,
        barThickness: 40,
        order: 2,
      },
    ],
  };

  const completionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        callbacks: {
          label: (context) => `${context.formattedValue}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#E2E8F0' },
        ticks: {
          stepSize: 10,
          color: '#64748B',
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B' },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

      {/* --- Header --- */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{title || 'Analytics Overview'}</h1>
        <p className="text-ink-muted text-lg">
          {description || 'Monitor platform performance, user activity, and system health in real time.'}
        </p>
      </div>

      {/* --- Stat Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Athletes (Active Style) */}
        <div className="relative overflow-hidden group bg-cyan-brand rounded-[24px] p-4 text-white shadow-xl shadow-cyan-brand/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <Users size={24} className="text-white" />
            </div>
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              +324 this month
            </span>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-3xl font-semibold tracking-tight">12,458</h3>
            <p className="text-white/80 font-medium text-md">Total Athletes</p>
          </div>
        </div>

        {/* Total Coaches */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-3 rounded-xl">
              <img src={user} alt="" />
            </div>
            <span className="text-xs font-semibold text-success flex items-center gap-1">
              +18 new this week
            </span>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-3xl font-semibold tracking-tight text-ink">458</h3>
            <p className="text-ink-muted font-medium text-md">Total Coaches</p>
          </div>
        </div>

        {/* Workout Completion */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-3 rounded-xl">
              <img src={user} alt="" />
            </div>
            <span className="text-xs font-semibold text-danger flex items-center gap-1">
              -3% this week
            </span>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-3xl font-semibold tracking-tight text-ink">76%</h3>
            <p className="text-ink-muted font-medium text-md">Workout Completion</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-3 rounded-xl">
              <img src={card} alt="" />
            </div>
            <span className="text-xs font-semibold text-success flex items-center gap-1">
              <TrendingUp size={12} /> +8%
            </span>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-3xl font-semibold tracking-tight text-ink">$12,450</h3>
            <p className="text-ink-muted font-medium text-md">Revenue</p>
          </div>
        </div>

      </div>

      {/* --- Charts Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">

        {/* Daily Active Users Chart */}
        <div className="bg-white rounded-[32px] p-8 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ink">Daily Active Users</h2>
            <div className="flex items-center gap-2 text-ink-muted text-sm border border-border rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors">
              <Calendar size={14} />
              <span>Jan - July 2024</span>
            </div>
          </div>
          <div className="h-[350px]">
            <Line data={dauData} options={dauOptions} />
          </div>
        </div>

        {/* Workout Completion Rate Chart */}
        <div className="bg-white rounded-[32px] p-8 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ink">Workout Completion Rate</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-brand"></div>
                <span className="text-xs font-medium text-ink-muted text-lg">Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-ink"></div>
                <span className="text-xs font-medium text-ink-muted text-lg">Trend</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <Bar data={completionData} options={completionOptions} />
          </div>
        </div>

      </div>

    </div>
  )
}
