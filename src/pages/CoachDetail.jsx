import { useNavigate, useParams } from 'react-router-dom'
import { CoachProfile } from '@/components/coaches/CoachProfile'

export function CoachDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  return <CoachProfile coachId={slug} onBack={() => navigate('/coaches')} />
}
