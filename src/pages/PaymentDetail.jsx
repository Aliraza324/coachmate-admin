import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { PaymentDetailView } from '@/components/subscriptions/PaymentDetailView'
import { findPaymentById } from '@/data/subscriptionsData'

export function PaymentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const payment = findPaymentById(id)

  if (!payment) {
    return <Navigate to="/subscriptions/payments" replace />
  }

  return (
    <PaymentDetailView
      payment={payment}
      onBack={() => navigate('/subscriptions/payments')}
    />
  )
}
