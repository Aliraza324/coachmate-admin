import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AthleteProfile } from '@/components/athletes/AthleteProfile'
import { findAthleteBySlug } from '@/data/athletesData'

export function AthleteDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const athlete = findAthleteBySlug(slug)

  if (!athlete) {
    return <Navigate to="/athletes" replace />
  }

  return <AthleteProfile athleteId={athlete.id} onBack={() => navigate('/athletes')} />
}
