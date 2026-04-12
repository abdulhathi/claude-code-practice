import { useEffect, useState } from 'react'

type Status = 'loading' | 'ok' | 'error'

function App() {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status === 'ok' ? 'ok' : 'error'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Helpdesk</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>API status:</span>
          {status === 'loading' && (
            <span className="text-yellow-500 font-medium">checking...</span>
          )}
          {status === 'ok' && (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              online
            </span>
          )}
          {status === 'error' && (
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              offline
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
