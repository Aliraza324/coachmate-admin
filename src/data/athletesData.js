const baseAthletes = [
  {
    id: 1,
    name: 'Jessica Lee',
    email: 'jessica@email.com',
    phone: '+1 234 567 890',
    avatar: 'https://i.pravatar.cc/80?img=47',
    coach: 'Michael Ross',
    subscription: 'Premium',
    activity: 'High',
    lastActivity: '2 hours ago',
    status: 'Active',
    progress: 75,
    age: 27,
    gender: 'Female',
    height: '165 cm',
    weight: '62 kg',
    goals: ['Lose Weight', 'Improve Endurance'],
    assignedCoach: { name: 'Coach Michael', title: 'Fitness Expert', avatar: 'https://i.pravatar.cc/80?img=12' },
    plan: 'Premium Plan',
    renewalDate: 'June 25, 2026',
  },
  {
    id: 2,
    name: 'Daniel Smith',
    email: 'daniel@email.com',
    phone: '+1 234 567 891',
    avatar: 'https://i.pravatar.cc/80?img=15',
    coach: 'Emma Watson',
    subscription: 'Pro',
    activity: 'Medium',
    lastActivity: 'Yesterday',
    status: 'Active',
    progress: 60,
    age: 31,
    gender: 'Male',
    height: '180 cm',
    weight: '78 kg',
    goals: ['Build Muscle'],
    assignedCoach: { name: 'Emma Watson', title: 'Strength Coach', avatar: 'https://i.pravatar.cc/80?img=32' },
    plan: 'Pro Plan',
    renewalDate: 'Aug 10, 2026',
  },
  {
    id: 3,
    name: 'Olivia Brown',
    email: 'olivia@email.com',
    phone: '+1 234 567 892',
    avatar: 'https://i.pravatar.cc/80?img=49',
    coach: null,
    subscription: 'Free',
    activity: 'Low',
    lastActivity: '3 days ago',
    status: 'Inactive',
    progress: 35,
    age: 24,
    gender: 'Female',
    height: '170 cm',
    weight: '58 kg',
    goals: ['Flexibility'],
    assignedCoach: null,
    plan: 'Free Plan',
    renewalDate: '—',
  },
  {
    id: 4,
    name: 'Ethan Carter',
    email: 'ethan@email.com',
    phone: '+1 234 567 893',
    avatar: 'https://i.pravatar.cc/80?img=13',
    coach: 'Sophia Miller',
    subscription: 'Premium',
    activity: 'High',
    lastActivity: '1 hour ago',
    status: 'Active',
    progress: 90,
    age: 29,
    gender: 'Male',
    height: '175 cm',
    weight: '72 kg',
    goals: ['Marathon Prep', 'Improve Endurance'],
    assignedCoach: { name: 'Sophia Miller', title: 'Endurance Coach', avatar: 'https://i.pravatar.cc/80?img=5' },
    plan: 'Premium Plan',
    renewalDate: 'May 5, 2026',
  },
]

const extraNames = [
  'Mia Johnson', 'Liam Walker', 'Ava Wilson', 'Noah Davis', 'Sophia Chen',
  'Lucas Martin', 'Isabella Garcia', 'Mason Lopez', 'Amelia Taylor', 'James Anderson',
  'Charlotte Thomas', 'Benjamin Moore', 'Harper Jackson', 'Elijah White', 'Evelyn Harris',
  'Logan Clark', 'Abigail Lewis', 'Aiden Young', 'Ella Hall', 'Henry Allen',
  'Scarlett King', 'Jackson Wright', 'Grace Scott', 'Sebastian Green',
]

const subscriptions = ['Premium', 'Pro', 'Free']
const activities = ['High', 'Medium', 'Low']
const coaches = ['Michael Ross', 'Emma Watson', 'Sophia Miller', 'David Kim', 'Laura Chen', null]
const lastActivities = ['2 hours ago', 'Yesterday', '3 days ago', '1 hour ago', '5 hours ago', '1 week ago']

const generated = extraNames.map((name, i) => {
  const [first] = name.toLowerCase().split(' ')
  const subscription = subscriptions[i % subscriptions.length]
  const activity = activities[i % activities.length]
  const coach = coaches[i % coaches.length]
  const status = activity === 'Low' && subscription === 'Free' ? 'Inactive' : 'Active'
  return {
    id: 5 + i,
    name,
    email: `${first}@email.com`,
    phone: `+1 234 567 ${String(900 + i).padStart(3, '0')}`,
    avatar: `https://i.pravatar.cc/80?img=${20 + i}`,
    coach,
    subscription,
    activity,
    lastActivity: lastActivities[i % lastActivities.length],
    status,
    progress: 30 + ((i * 7) % 65),
    age: 22 + (i % 18),
    gender: i % 2 === 0 ? 'Female' : 'Male',
    height: `${160 + (i % 25)} cm`,
    weight: `${55 + (i % 30)} kg`,
    goals: ['Improve Endurance'],
    assignedCoach: coach
      ? { name: coach, title: 'Fitness Coach', avatar: `https://i.pravatar.cc/80?img=${40 + i}` }
      : null,
    plan: `${subscription} Plan`,
    renewalDate: 'Jul 15, 2026',
  }
})

export const nameToSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

export const athletes = [...baseAthletes, ...generated].map((a) => ({
  ...a,
  slug: nameToSlug(a.name),
}))

export const findAthleteBySlug = (slug) => athletes.find((a) => a.slug === slug)

export const workoutCompletionRate = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [85, 87, 90, 89, 93, 91, 94, 96, 95, 96, 95, 97],
}

export const recentWorkouts = [
  {
    id: 1,
    name: 'Full Body Training',
    type: 'Strength & Conditioning',
    date: 'Mar 10, 2024',
    status: 'Completed',
    duration: '45 min',
  },
  {
    id: 2,
    name: 'Cardio Session',
    type: 'Endurance Training',
    date: 'Mar 8, 2024',
    status: 'Completed',
    duration: '30 min',
  },
  {
    id: 3,
    name: 'Upper Body Focus',
    type: 'Strength Training',
    date: 'Mar 6, 2024',
    status: 'In Progress',
    duration: '50 min',
  },
  {
    id: 4,
    name: 'Leg Day Workout',
    type: 'Strength Training',
    date: 'Mar 4, 2024',
    status: 'Missed',
    duration: '60 min',
  },
]
