import { Navbar } from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export function HomePage() {
  const { session } = useAuth()
  const user = session?.user

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Welcome back, {user?.name ?? 'Agent'}
        </h2>
        <p className="text-gray-500 text-sm">Role: {(user as any)?.role ?? 'N/A'}</p>
      </main>
    </div>
  )
}
