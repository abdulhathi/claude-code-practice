import { createContext, useContext } from 'react'
import type { authClient } from '../lib/auth-client'

type Session = ReturnType<typeof authClient.useSession>

interface AuthContextValue {
  session: Session['data']
  isPending: Session['isPending']
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
