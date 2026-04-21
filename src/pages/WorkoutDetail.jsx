import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { WorkoutDetailView } from '@/components/workouts/WorkoutDetailView'
import { findWorkoutBySlug } from '@/data/workoutsData'

export function WorkoutDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const workout = findWorkoutBySlug(slug)

  if (!workout) {
    return <Navigate to="/workouts/library" replace />
  }

  return <WorkoutDetailView workout={workout} onBack={() => navigate('/workouts/library')} />
}
