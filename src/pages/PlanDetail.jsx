import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { PlanDetailView } from '@/components/subscriptions/PlanDetailView'
import { findPlanBySlug } from '@/data/subscriptionsData'

export function PlanDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const plan = findPlanBySlug(slug)

  if (!plan) {
    return <Navigate to="/subscriptions/plans" replace />
  }

  return <PlanDetailView plan={plan} onBack={() => navigate('/subscriptions/plans')} />
}
