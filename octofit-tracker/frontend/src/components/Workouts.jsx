import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    getCollection('workouts', controller.signal).then(setWorkouts).catch((e) => {
      if (e.name !== 'AbortError') setError(e.message)
    })
    return () => controller.abort()
  }, [])
  return <section><h1>Workouts</h1>{error && <div className="alert alert-danger">{error}</div>}
    {workouts.length === 0 ? <p className="text-muted">No workouts are available yet.</p> : <div className="row g-3">
      {workouts.map((workout) => <div className="col-md-6" key={workout._id || workout.id}><article className="card h-100"><div className="card-body">
        <h2 className="h5">{workout.name || 'Unnamed workout'}</h2><p>{workout.description || 'No description provided.'}</p>
        <span className="badge text-bg-secondary">{workout.difficulty || 'unspecified'}</span>
        <span className="ms-2 text-muted">{workout.durationMinutes ?? '—'} min</span>
      </div></article></div>)}
    </div>}
  </section>
}

export default Workouts
