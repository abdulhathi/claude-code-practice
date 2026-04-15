import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const navigate = useNavigate()

  const signOut = async () => {
    await authClient.signOut()
    navigate('/login')
  }

  return (
    <AuthContext value={{ session, isPending, signOut }}>
      {children}
    </AuthContext>
  )
}
