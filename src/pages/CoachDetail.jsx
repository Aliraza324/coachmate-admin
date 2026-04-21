import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CoachProfile } from '@/components/coaches/CoachProfile'
import { findCoachBySlug } from '@/data/coachesData'

export function CoachDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const coach = findCoachBySlug(slug)

  if (!coach) {
    return <Navigate to="/coaches" replace />
  }

  return <CoachProfile coach={coach} onBack={() => navigate('/coaches')} />
}
