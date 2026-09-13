import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    getCollection('teams', controller.signal).then(setTeams).catch((e) => {
      if (e.name !== 'AbortError') setError(e.message)
    })
    return () => controller.abort()
  }, [])
  return <section><h1>Teams</h1>{error && <div className="alert alert-danger">{error}</div>}
    {teams.length === 0 ? <p className="text-muted">No teams have been created yet.</p> : <div className="row g-3">
      {teams.map((team) => <div className="col-md-6" key={team._id || team.id}><article className="card h-100"><div className="card-body">
        <h2 className="h5">{team.name || 'Unnamed team'}</h2><p>{team.description || 'No description provided.'}</p>
        <small className="text-muted">{team.members?.length ?? 0} members</small>
      </div></article></div>)}
    </div>}
  </section>
}

export default Teams
