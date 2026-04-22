import React from 'react'
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  CheckCircle2,
  Calendar
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
          font: { size: 10 },
          callback: (value) => value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: '#64748B',
          font: { size: 10 }
        },
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
        barThickness: 'flex',
        maxBarThickness: 40,
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
        grid: { color: '#F1F5F9' },
        ticks: {
          stepSize: 10,
          color: '#64748B',
          font: { size: 10 },
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: '#64748B',
          font: { size: 10 }
        },
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-700 overflow-hidden">
      
      {/* --- Header --- */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-ink">{title || 'Analytics Overview'}</h1>
        <p className="text-ink-muted text-sm sm:text-base md:text-lg">
          {description || 'Monitor platform performance, user activity, and system health in real time.'}
        </p>
      </div>

      {/* --- Stat Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Athletes (Active Style) */}
        <div className="relative overflow-hidden group bg-cyan-brand rounded-[24px] p-4 text-white shadow-xl shadow-cyan-brand/20 transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-2 sm:p-3 rounded-xl backdrop-blur-md">
              <Users size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-md">
              +324 this month
            </span>
          </div>
          <div className="mt-4 sm:mt-6 space-y-0.5 sm:space-y-1">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">12,458</h3>
            <p className="text-white/80 font-medium text-xs sm:text-sm md:text-md">Total Athletes</p>
          </div>
        </div>

        {/* Total Coaches */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-2 sm:p-3 rounded-xl">
              <img src={user} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-success flex items-center gap-1">
              +18 new this week
            </span>
          </div>
          <div className="mt-4 sm:mt-6 space-y-0.5 sm:space-y-1">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">458</h3>
            <p className="text-ink-muted font-medium text-xs sm:text-sm md:text-md">Total Coaches</p>
          </div>
        </div>

        {/* Workout Completion */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-2 sm:p-3 rounded-xl">
              <img src={user} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-danger flex items-center gap-1">
              -3% this week
            </span>
          </div>
          <div className="mt-4 sm:mt-6 space-y-0.5 sm:space-y-1">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">76%</h3>
            <p className="text-ink-muted font-medium text-xs sm:text-sm md:text-md">Workout Completion</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="group bg-white rounded-[24px] p-4 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="bg-cyan-soft p-2 sm:p-3 rounded-xl">
              <img src={card} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-success flex items-center gap-1">
              <TrendingUp size={10} className="sm:w-3 sm:h-3" /> +8%
            </span>
          </div>
          <div className="mt-4 sm:mt-6 space-y-0.5 sm:space-y-1">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">$12,450</h3>
            <p className="text-ink-muted font-medium text-xs sm:text-sm md:text-md">Revenue</p>
          </div>
        </div>

      </div>

      {/* --- Charts Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pb-4 sm:pb-8">
        
        {/* Daily Active Users Chart */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-ink">Daily Active Users</h2>
            <div className="flex items-center gap-2 text-ink-muted text-[10px] sm:text-xs border border-border rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 w-fit cursor-pointer hover:bg-slate-50 transition-colors">
              <Calendar size={14} />
              <span>Jan - July 2024</span>
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <Line data={dauData} options={dauOptions} />
          </div>
        </div>

        {/* Workout Completion Rate Chart */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-ink">Workout Completion Rate</h2>
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-brand"></div>
                <span className="text-[10px] sm:text-xs font-medium text-ink-muted">Completion</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-ink"></div>
                <span className="text-[10px] sm:text-xs font-medium text-ink-muted">Trend</span>
              </div>
            </div>
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <Bar data={completionData} options={completionOptions} />
          </div>
        </div>

      </div>

    </div>
  )
}
