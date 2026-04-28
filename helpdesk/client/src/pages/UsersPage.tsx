import { Navbar } from '../components/Navbar'

export function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
      </main>
    </div>
  )
}
