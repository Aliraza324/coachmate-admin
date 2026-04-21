import { Dumbbell, Leaf, HeartPulse, Flame, Trophy } from 'lucide-react'

const nameToSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

export const specializationMeta = {
  'Strength Training': { icon: Dumbbell, className: 'bg-sky-50 text-sky-600' },
  Nutrition: { icon: Leaf, className: 'bg-emerald-50 text-emerald-600' },
  Rehabilitation: { icon: HeartPulse, className: 'bg-violet-50 text-violet-600' },
  'Weight Loss': { icon: Flame, className: 'bg-rose-50 text-rose-500' },
  Bodybuilding: { icon: Trophy, className: 'bg-amber-50 text-amber-600' },
}

const baseCoaches = [
  {
    id: 1,
    name: 'Michael Ross',
    email: 'michael@email.com',
    phone: '+1 234 567 890',
    avatar: 'https://i.pravatar.cc/80?img=12',
    specialization: 'Strength Training',
    experience: '8 Years',
    athletes: 24,
    rating: 4.8,
    status: 'Active',
    verification: 'Verified',
    gender: 'Male',
    bio: 'Certified strength coach with 8+ years of experience helping athletes build strength and endurance.',
  },
  {
    id: 2,
    name: 'Emma Watson',
    email: 'emma@email.com',
    phone: '+1 234 567 891',
    avatar: 'https://i.pravatar.cc/80?img=32',
    specialization: 'Nutrition',
    experience: '5 Years',
    athletes: 18,
    rating: 4.6,
    status: 'Active',
    verification: 'Verified',
    gender: 'Female',
    bio: 'Registered dietitian specializing in sports nutrition and meal planning for peak performance.',
  },
  {
    id: 3,
    name: 'Daniel Cooper',
    email: 'daniel@email.com',
    phone: '+1 234 567 892',
    avatar: 'https://i.pravatar.cc/80?img=33',
    specialization: 'Rehabilitation',
    experience: '3 Years',
    athletes: 12,
    rating: 4.2,
    status: 'Pending',
    verification: 'Pending',
    gender: 'Male',
    bio: 'Physical therapist focused on injury recovery and pre-habilitation protocols.',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1 234 567 893',
    avatar: 'https://i.pravatar.cc/80?img=45',
    specialization: 'Weight Loss',
    experience: '6 Years',
    athletes: 31,
    rating: 4.9,
    status: 'Active',
    verification: 'Verified',
    gender: 'Female',
    bio: 'Weight-loss specialist with a proven track record guiding clients to sustainable results.',
  },
  {
    id: 5,
    name: 'Alex Turner',
    email: 'alex@email.com',
    phone: '+1 234 567 894',
    avatar: 'https://i.pravatar.cc/80?img=8',
    specialization: 'Bodybuilding',
    experience: '12 Years',
    athletes: 42,
    rating: 4.7,
    status: 'Suspended',
    verification: 'Verified',
    gender: 'Male',
    bio: 'Competitive bodybuilding coach focused on hypertrophy programming and contest prep.',
  },
]

const extraNames = [
  'Laura Chen', 'David Kim', 'Rachel Green', 'Tom Harris', 'Nina Patel',
  'Chris Walker', 'Olivia Reed', 'Peter Nguyen', 'Isla Murphy', 'Victor Hugo',
  'Zara Ali', 'Leo Martin', 'Hannah Scott', 'Marcus Bell', 'Amira Khan',
]
const specList = Object.keys(specializationMeta)
const statuses = ['Active', 'Pending', 'Active', 'Suspended', 'Active']
const verifications = ['Verified', 'Pending', 'Verified', 'Verified', 'Verified']

const generated = extraNames.map((name, i) => {
  const specialization = specList[i % specList.length]
  const status = statuses[i % statuses.length]
  const verification = status === 'Pending' ? 'Pending' : verifications[i % verifications.length]
  return {
    id: 6 + i,
    name,
    email: `${name.toLowerCase().split(' ')[0]}@email.com`,
    phone: `+1 234 567 ${String(900 + i).padStart(3, '0')}`,
    avatar: `https://i.pravatar.cc/80?img=${55 + i}`,
    specialization,
    experience: `${2 + (i % 12)} Years`,
    athletes: 8 + ((i * 5) % 40),
    rating: Number((3.8 + ((i * 0.17) % 1.2)).toFixed(1)),
    status,
    verification,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    bio: `Experienced ${specialization.toLowerCase()} coach dedicated to helping athletes reach their goals.`,
  }
})

export const coaches = [...baseCoaches, ...generated].map((c) => ({
  ...c,
  slug: nameToSlug(c.name),
}))

export const findCoachBySlug = (slug) => coaches.find((c) => c.slug === slug)
