import {
  LayoutDashboard,
  Users,
  UserCog,
  Dumbbell,
  Apple,
  MessageSquare,
  CreditCard,
  BarChart3,
  LayoutTemplate,
  Settings,
} from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, end: true },
  { label: 'Athletes Management', path: '/athletes', icon: Users },
  { label: 'Coach Management', path: '/coaches', icon: UserCog },
  { label: 'Workouts', path: '/workouts', icon: Dumbbell },
  { label: 'Nutrition', path: '/nutrition', icon: Apple },
  { label: 'Messaging', path: '/messaging', icon: MessageSquare },
  { label: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Template Management', path: '/templates', icon: LayoutTemplate },
  { label: 'Settings', path: '/settings', icon: Settings },
]
