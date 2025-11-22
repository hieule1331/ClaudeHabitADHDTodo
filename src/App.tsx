import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import TimeTracking from './pages/TimeTracking'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'
import Pomodoro from './pages/Pomodoro'
import Analytics from './pages/Analytics'
import AICoach from './pages/AICoach'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="time" element={<TimeTracking />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="habits" element={<Habits />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="coach" element={<AICoach />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
