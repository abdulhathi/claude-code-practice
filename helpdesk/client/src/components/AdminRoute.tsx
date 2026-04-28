import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { session, isPending } = useAuth()

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  const role = (session.user as any)?.role
  if (role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
