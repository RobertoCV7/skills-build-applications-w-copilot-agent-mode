import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    getCollection('leaderboard', controller.signal, leaderboardEndpoint).then(setEntries).catch((e) => {
      if (e.name !== 'AbortError') setError(e.message)
    })
    return () => controller.abort()
  }, [])
  return <section><h1>Leaderboard</h1>{error && <div className="alert alert-danger">{error}</div>}
    {entries.length === 0 ? <p className="text-muted">No leaderboard entries yet.</p> : <div className="list-group">
      {entries.sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity)).map((entry) => (
        <div className="list-group-item d-flex justify-content-between" key={entry._id || entry.id}>
          <span>#{entry.rank ?? '—'} {entry.user?.displayName || entry.user?.username || entry.user || 'Participant'}</span>
          <strong>{entry.points ?? 0} points</strong>
        </div>
      ))}
    </div>}
  </section>
}

export default Leaderboard
