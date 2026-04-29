import { Navigate, useLocation } from 'react-router-dom'
import { getStoredToken } from '@/hooks/useAuth'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = getStoredToken()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
