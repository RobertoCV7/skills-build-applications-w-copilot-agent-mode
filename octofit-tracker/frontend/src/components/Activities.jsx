import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getCollection('activities', controller.signal)
      .then(setActivities)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [])

  return (
    <ResourcePage title="Activities" error={error}>
      {activities.length === 0 ? (
        <EmptyState text="No activities have been logged yet." />
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead>
            <tbody>{activities.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{activity.type || 'Activity'}</td>
                <td>{activity.durationMinutes ?? '—'} min</td>
                <td>{activity.caloriesBurned ?? '—'}</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </ResourcePage>
  )
}

function ResourcePage({ title, error, children }) {
  return <section><h1>{title}</h1>{error && <div className="alert alert-danger">{error}</div>}{children}</section>
}

function EmptyState({ text }) {
  return <p className="text-muted">{text}</p>
}

export default Activities
