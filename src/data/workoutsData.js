import { Dumbbell, HeartPulse, PersonStanding } from 'lucide-react'

export const nameToSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

export const categoryMeta = {
  Strength: { icon: Dumbbell, className: 'bg-sky-50 text-sky-600' },
  Cardio: { icon: HeartPulse, className: 'bg-emerald-50 text-emerald-600' },
  Bodyweight: { icon: PersonStanding, className: 'bg-amber-50 text-amber-700' },
}

export const difficultyStyles = {
  Beginner: 'text-sky-600',
  Intermediate: 'text-emerald-600',
  Advanced: 'text-rose-500',
}

const baseWorkouts = [
  {
    id: 1,
    name: 'Full Body Strength',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '45 min',
    createdBy: 'Admin',
    targetMuscles: 'Chest, Back, Legs, Shoulders',
    equipment: 'Dumbbells, Barbell',
    description: 'Full-body workout designed to improve strength and endurance.',
    exercises: [
      { id: 1, name: 'Barbell Squat', sets: 4, reps: 10, rest: '60 sec' },
      { id: 2, name: 'Bench Press', sets: 4, reps: 10, rest: '60 sec' },
      { id: 3, name: 'Deadlift', sets: 4, reps: 10, rest: '60 sec' },
    ],
  },
  {
    id: 2,
    name: 'HIIT Fat Burn',
    category: 'Cardio',
    difficulty: 'Advanced',
    duration: '45 min',
    createdBy: 'Coach',
    targetMuscles: 'Full Body',
    equipment: 'None',
    description: 'High-intensity interval training to maximize calorie burn.',
    exercises: [
      { id: 1, name: 'Burpees', sets: 4, reps: 15, rest: '30 sec' },
      { id: 2, name: 'Mountain Climbers', sets: 4, reps: 20, rest: '30 sec' },
      { id: 3, name: 'Jump Squats', sets: 4, reps: 15, rest: '30 sec' },
    ],
  },
  {
    id: 3,
    name: 'Beginner Home Plan',
    category: 'Bodyweight',
    difficulty: 'Beginner',
    duration: '45 min',
    createdBy: 'Admin',
    targetMuscles: 'Full Body',
    equipment: 'None',
    description: 'Simple bodyweight routine perfect for beginners at home.',
    exercises: [
      { id: 1, name: 'Push Ups', sets: 3, reps: 10, rest: '45 sec' },
      { id: 2, name: 'Air Squats', sets: 3, reps: 15, rest: '45 sec' },
      { id: 3, name: 'Plank', sets: 3, reps: 30, rest: '45 sec' },
    ],
  },
  {
    id: 4,
    name: 'Upper Body Power',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '45 min',
    createdBy: 'Admin',
    targetMuscles: 'Chest, Back, Arms',
    equipment: 'Dumbbells',
    description: 'Focused upper body session for building muscle and power.',
    exercises: [
      { id: 1, name: 'Pull Ups', sets: 4, reps: 8, rest: '60 sec' },
      { id: 2, name: 'Dumbbell Row', sets: 4, reps: 10, rest: '60 sec' },
    ],
  },
  {
    id: 5,
    name: 'Core Crusher',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '45 min',
    createdBy: 'Admin',
    targetMuscles: 'Core, Obliques',
    equipment: 'Mat',
    description: 'Dedicated core workout to build a strong midsection.',
    exercises: [
      { id: 1, name: 'Russian Twists', sets: 4, reps: 20, rest: '45 sec' },
      { id: 2, name: 'Leg Raises', sets: 4, reps: 15, rest: '45 sec' },
    ],
  },
]

export const workouts = baseWorkouts.map((w) => ({ ...w, slug: nameToSlug(w.name) }))
export const findWorkoutBySlug = (slug) => workouts.find((w) => w.slug === slug)

const baseExercises = [
  {
    id: 1,
    name: 'Push Ups',
    muscleGroup: 'Chest',
    difficulty: 'Intermediate',
    equipment: 'Bodyweight',
    description: 'A basic upper body exercise targeting chest, shoulders, and triceps.',
    steps: [
      'Place hands shoulder-width apart',
      'Lower your body slowly',
      'Push back up',
    ],
    tips: ['Keep core tight', 'Do not let hips sag'],
    videoThumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
  },
  {
    id: 2,
    name: 'Squats',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
    equipment: 'None',
    description: 'Fundamental lower body movement for leg strength and mobility.',
    steps: [
      'Stand feet shoulder-width apart',
      'Lower hips back and down',
      'Drive through heels to stand up',
    ],
    tips: ['Keep chest up', 'Knees track over toes'],
    videoThumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    id: 3,
    name: 'Pull Ups',
    muscleGroup: 'Back',
    difficulty: 'Advanced',
    equipment: 'Bodyweight',
    description: 'Upper body pulling movement primarily targeting the back and biceps.',
    steps: [
      'Grip bar slightly wider than shoulders',
      'Pull chin above the bar',
      'Lower with control',
    ],
    tips: ['Engage lats first', 'Avoid swinging'],
    videoThumb: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800',
  },
  {
    id: 4,
    name: 'Plank',
    muscleGroup: 'Core',
    difficulty: 'Beginner',
    equipment: 'Bodyweight',
    description: 'Isometric core hold for stability and endurance.',
    steps: [
      'Set up on forearms and toes',
      'Keep body in a straight line',
      'Hold for target duration',
    ],
    tips: ['Breathe steadily', 'Squeeze glutes'],
    videoThumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  },
  {
    id: 5,
    name: 'Lunges',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
    equipment: 'Bodyweight',
    description: 'Unilateral leg exercise that builds balance and strength.',
    steps: [
      'Step forward with one leg',
      'Lower back knee toward floor',
      'Push through front heel to return',
    ],
    tips: ['Keep torso upright', 'Front knee over ankle'],
    videoThumb: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
  },
]

export const exercises = baseExercises.map((e) => ({ ...e, slug: nameToSlug(e.name) }))
export const findExerciseBySlug = (slug) => exercises.find((e) => e.slug === slug)

export const workoutTemplates = [
  { id: 1, name: '4-Week Strength Builder', category: 'Strength', level: 'Intermediate', workouts: 12 },
  { id: 2, name: '30-Day Shred', category: 'Cardio', level: 'Advanced', workouts: 30 },
  { id: 3, name: 'Beginner Foundations', category: 'Bodyweight', level: 'Beginner', workouts: 8 },
  { id: 4, name: 'Upper/Lower Split', category: 'Strength', level: 'Intermediate', workouts: 16 },
]
