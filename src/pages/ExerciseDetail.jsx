import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ExerciseDetailView } from '@/components/workouts/ExerciseDetailView'
import { findExerciseBySlug } from '@/data/workoutsData'

export function ExerciseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const exercise = findExerciseBySlug(slug)

  if (!exercise) {
    return <Navigate to="/workouts/exercises" replace />
  }

  return <ExerciseDetailView exercise={exercise} onBack={() => navigate('/workouts/exercises')} />
}
