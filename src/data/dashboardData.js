import { User, UserSquare, Circle, CreditCard } from 'lucide-react'

export const stats = [
  {
    id: 'athletes',
    label: 'Total Athletes',
    value: '12,458',
    icon: User,
    trend: { value: '+324 this month' },
    highlighted: true,
  },
  {
    id: 'coaches',
    label: 'Total Coaches',
    value: '458',
    icon: UserSquare,
    trend: { value: '+18 new this week' },
  },
  {
    id: 'active-users',
    label: 'Active Users (Today)',
    value: '4,458',
    icon: Circle,
    iconFilled: true,
    trend: { value: '↑ 8% from yesterday' },
  },
  {
    id: 'subscriptions',
    label: 'Active Subscriptions',
    value: '7,320',
    icon: CreditCard,
    trend: { value: '92% renewal rate' },
  },
]

export const recentActivity = [
  {
    name: 'Alex Johnson',
    role: 'Athlete',
    activity: 'Completed Workout',
    date: 'Mar 10',
    status: 'success',
  },
  {
    name: 'Emma Watson',
    role: 'Coach',
    activity: 'Assigned Workout',
    date: 'Mar 10',
    status: 'success',
  },
  {
    name: 'Jessica Lee',
    role: 'Athlete',
    activity: 'Missed Workout',
    date: 'Mar 9',
    status: 'warning',
  },
]

export const systemAlerts = [
  {
    id: 1,
    title: 'Jessica Lee missed 3 workouts',
    meta: '2 hours ago',
    tone: 'danger',
  },
  {
    id: 2,
    title: 'High injury risk detected',
    meta: 'Michael Torres',
    tone: 'warning',
  },
  {
    id: 3,
    title: 'New Coach Registration',
    meta: 'Pending Approval',
    tone: 'info',
  },
  {
    id: 4,
    title: 'New milestone achieved',
    meta: 'Sophia Chen reached 100 goal weight',
    tone: 'success',
  },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const workoutActivity = {
  labels: months,
  values: [320, 410, 380, 520, 470, 610, 540, 680, 760, 700, 640, 720],
}

export const riskAlerts = {
  labels: ['High Risk', 'Medium Risk', 'Low Risk'],
  values: [50, 30, 34],
  colors: ['#12274A', '#6B7280', '#22A9F0'],
}

export const revenueOverview = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
  values: [8000, 12000, 15000, 18000, 23869, 30000, 37000],
}

export const userGrowth = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  athletes: [120000, 180000, 240000, 260000, 210000, 180000],
  coaches: [60000, 80000, 95000, 120000, 110000, 95000],
}
