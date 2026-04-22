import React from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Utensils,
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const OverView = () => {
  // --- Chart Data & Options ---

  // Revenue Overview (Area Chart)
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'june', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [2000, 5000, 10000, 18000, 23849, 32000, 38000],
        fill: true,
        borderColor: '#22A9F0',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(34, 169, 240, 0.3)');
          gradient.addColorStop(1, 'rgba(34, 169, 240, 0)');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#22A9F0',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 4,
        pointRadius: (context) => (context.dataIndex === 4 ? 8 : 0),
        pointHoverRadius: 10,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { size: 14, weight: 'bold' },
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40000,
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

  // User Growth Overview (Double Line)
  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Athlete',
        data: [90000, 110000, 80000, 140000, 120000, 80000],
        borderColor: '#F43F5E',
        borderWidth: 2,
        tension: 0.5,
        pointRadius: (context) => (context.dataIndex === 3 ? 8 : 0),
        pointBackgroundColor: '#F43F5E',
        pointBorderColor: '#FFE4E6',
        pointBorderWidth: 6,
      },
      {
        label: 'Coach',
        data: [60000, 95000, 60000, 75000, 90000, 65000],
        borderColor: '#4F46E5',
        borderWidth: 2,
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  const growthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          color: '#64748B',
          font: { size: 10 },
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 500000,
        grid: { color: '#F1F5F9' },
        ticks: {
          color: '#64748B',
          font: { size: 10 },
          stepSize: 100000,
          callback: (value) => {
            if (value === 0) return '0';
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
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
    <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12 pb-8 sm:pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-hidden">
      
      {/* --- Charts Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Revenue Overview */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-border shadow-sm relative group overflow-hidden">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-ink">Revenue Overview</h2>
            <p className="text-xs sm:text-sm text-ink-muted">Visualize monthly revenue performance and trends.</p>
          </div>
          <div className="h-[250px] sm:h-[300px] relative">
            <Line data={revenueData} options={revenueOptions} />
            
            {/* Custom Tooltip Mock (May point) - Hidden on very small screens for layout safety */}
            <div className="hidden sm:block absolute left-[58.5%] top-[30%] pointer-events-none transform -translate-x-1/2 -translate-y-full">
               <div className="bg-[#0F172A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xl mb-3 flex flex-col items-center">
                  $23,849
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0F172A] rotate-45"></div>
               </div>
               <div className="w-px h-16 sm:h-24 border-l-2 border-dashed border-cyan-brand mx-auto opacity-50"></div>
            </div>
          </div>
        </div>

        {/* User Growth Overview */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-border shadow-sm">
          <div className="mb-4 sm:mb-2">
            <h2 className="text-lg sm:text-xl font-bold text-ink">User Growth Overview</h2>
            <p className="text-xs sm:text-sm text-ink-muted">Track growth trends of athletes and coaches over time.</p>
          </div>
          <div className="h-[250px] sm:h-[300px] relative">
            <Line data={growthData} options={growthOptions} />
            {/* Custom vertical line for April point - Hidden on very small screens */}
            <div className="hidden sm:block absolute left-[64%] top-[15%] bottom-[12%] w-px border-l-2 border-dashed border-slate-200 pointer-events-none"></div>
          </div>
        </div>

      </div>

      {/* --- Key Insights Section --- */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-ink">Key Insights</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Insight: Most Popular Workout */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-border flex items-start gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-emerald-50 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shrink-0">
              <TrendingUp className="text-emerald-500 w-5 h-5 sm:w-6 sm:h-6" size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-medium text-ink-muted truncate">Most Popular Workout</p>
              <h4 className="text-xs sm:text-sm md:text-md font-bold text-ink truncate">Full Body Strength</h4>
              <p className="text-[10px] sm:text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> 1200+ users
              </p>
            </div>
          </div>

          {/* Insight: Lowest Competition */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-border flex items-start gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-rose-50 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shrink-0">
              <TrendingDown className="text-rose-500 w-5 h-5 sm:w-6 sm:h-6" size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-medium text-ink-muted truncate">Lowest Competition</p>
              <h4 className="text-xs sm:text-sm md:text-md font-bold text-ink truncate">HIIT Advanced</h4>
              <p className="text-[10px] sm:text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                <TrendingDown size={12} /> 45% Comp. rate
              </p>
            </div>
          </div>

          {/* Insight: Top Performing Coach */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-border flex items-start gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-indigo-50 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shrink-0">
              <Star className="text-indigo-500 fill-indigo-500 w-5 h-5 sm:w-6 sm:h-6" size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-medium text-ink-muted truncate">Top Performing Coach</p>
              <h4 className="text-xs sm:text-sm md:text-md font-bold text-ink truncate">Ahmad Raza</h4>
              <p className="text-[10px] sm:text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> 92% retention
              </p>
            </div>
          </div>

          {/* Insight: Nutrition Insight */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 border border-border flex items-start gap-3 sm:gap-4 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="bg-orange-50 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shrink-0">
              <Utensils className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-medium text-ink-muted truncate">Nutrition Insight</p>
              <h4 className="text-xs sm:text-sm md:text-md font-bold text-ink leading-tight">40% users below targets</h4>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default OverView