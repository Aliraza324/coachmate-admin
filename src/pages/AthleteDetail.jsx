import { useNavigate, useParams } from 'react-router-dom'
import { AthleteProfile } from '@/components/athletes/AthleteProfile'

export function AthleteDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  return <AthleteProfile athleteId={slug} onBack={() => navigate('/athletes')} />
}
