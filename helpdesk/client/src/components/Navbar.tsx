import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const { session, signOut } = useAuth()
  const user = session?.user
  const isAdmin = (user as { role?: string } | undefined)?.role === 'admin'

  return (
    <nav className="bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <span className="font-semibold text-gray-800">Helpdesk</span>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/users" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Users
          </Link>
        )}
        <span className="text-sm text-gray-600">{user?.name ?? user?.email}</span>
        <button
          onClick={signOut}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
