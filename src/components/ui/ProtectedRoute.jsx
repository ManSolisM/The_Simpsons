import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" replace />
}
