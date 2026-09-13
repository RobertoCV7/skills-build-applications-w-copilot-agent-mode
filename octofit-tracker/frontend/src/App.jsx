import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const navigation = [
  ['/', 'Dashboard'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <nav aria-label="Main navigation">
            <ul className="navbar-nav flex-row flex-wrap gap-2">
              {navigation.map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link px-2 ${isActive ? 'active fw-bold' : ''}`
                    }
                    end={to === '/'}
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container py-4">
        {!apiBaseUrl && (
          <div className="alert alert-warning" role="alert">
            Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to
            connect to the Codespace API. Requests currently use the relative
            <code>/api</code> path.
          </div>
        )}
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <section>
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">
        Track activities, discover workouts, and compete with your teams.
      </p>
      <div className="row g-3 mt-2">
        {navigation.slice(1).map(([to, label]) => (
          <div className="col-sm-6 col-lg-4" key={to}>
            <NavLink className="card h-100 text-decoration-none" to={to}>
              <div className="card-body">
                <h2 className="h5">{label}</h2>
                <span className="text-primary">View {label.toLowerCase()} →</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
