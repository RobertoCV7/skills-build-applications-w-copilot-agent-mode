import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    getCollection('users', controller.signal).then(setUsers).catch((e) => {
      if (e.name !== 'AbortError') setError(e.message)
    })
    return () => controller.abort()
  }, [])
  return <section><h1>Users</h1>{error && <div className="alert alert-danger">{error}</div>}
    {users.length === 0 ? <p className="text-muted">No users are available yet.</p> : <div className="row g-3">
      {users.map((user) => <div className="col-md-6 col-lg-4" key={user._id || user.id}><article className="card h-100"><div className="card-body">
        <h2 className="h5">{user.displayName || user.username || 'Unnamed user'}</h2><p className="mb-1">{user.email || 'No email provided'}</p>
        {user.profile?.fitnessLevel && <small className="text-muted">{user.profile.fitnessLevel}</small>}
      </div></article></div>)}
    </div>}
  </section>
}

export default Users
