import { Timer, Play, Pause, RotateCcw, Settings, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer completed
      setIsRunning(false)
      if (mode === 'work') {
        setSessionCount((count) => count + 1)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, mode])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60)
  }

  const handleModeSwitch = (newMode: 'work' | 'break') => {
    setMode(newMode)
    setIsRunning(false)
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60)
  }

  return (
    <div className="space-y-xl max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="section-header">Pomodoro Timer</h1>
        <p className="text-gray-600">ADHD-optimized focus sessions with flexible timing</p>
      </div>

      {/* Main Timer */}
      <div className="widget text-center">
        <div className="flex justify-center gap-md mb-xl">
          <button
            onClick={() => handleModeSwitch('work')}
            className={`px-lg py-sm rounded-lg font-medium transition-colors ${
              mode === 'work'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Focus Time
          </button>
          <button
            onClick={() => handleModeSwitch('break')}
            className={`px-lg py-sm rounded-lg font-medium transition-colors ${
              mode === 'break'
                ? 'bg-success-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Break Time
          </button>
        </div>

        <div className={`timer-display mb-xl ${mode === 'work' ? 'text-primary-600' : 'text-success-600'}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-md mb-lg">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={mode === 'work' ? 'btn-primary' : 'btn-success'}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-sm inline" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-sm inline" />
                Start
              </>
            )}
          </button>
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw className="h-5 w-5 mr-sm inline" />
            Reset
          </button>
        </div>

        <p className="text-gray-600">
          {mode === 'work' ? 'Time to focus!' : 'Take a well-deserved break'}
        </p>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
        <div className="widget text-center">
          <p className="text-sm text-gray-600">Sessions Today</p>
          <p className="text-3xl font-bold text-gray-900">{sessionCount}</p>
        </div>
        <div className="widget text-center">
          <p className="text-sm text-gray-600">Focus Time Today</p>
          <p className="text-3xl font-bold text-gray-900">{sessionCount * 25}m</p>
        </div>
        <div className="widget text-center">
          <p className="text-sm text-gray-600">Current Streak</p>
          <p className="text-3xl font-bold text-gray-900">7 days</p>
        </div>
      </div>

      {/* Current Task */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Timer className="h-5 w-5" />
          Working On
        </h2>
        <input
          type="text"
          placeholder="What are you focusing on?"
          className="input"
          defaultValue="Review project documentation"
        />
        <p className="text-xs text-gray-500 mt-sm">
          Link this session to a task for better tracking
        </p>
      </div>

      {/* Settings */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Settings className="h-5 w-5" />
          Timer Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Focus Duration (minutes)
            </label>
            <input type="number" defaultValue={25} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Short Break (minutes)
            </label>
            <input type="number" defaultValue={5} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Long Break (minutes)
            </label>
            <input type="number" defaultValue={15} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Sessions Until Long Break
            </label>
            <input type="number" defaultValue={4} className="input" />
          </div>
        </div>

        <div className="mt-md space-y-sm">
          <label className="flex items-center gap-sm">
            <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
            <span className="text-sm">Auto-start breaks</span>
          </label>
          <label className="flex items-center gap-sm">
            <input type="checkbox" className="h-5 w-5 rounded" />
            <span className="text-sm">Auto-start next work session</span>
          </label>
          <label className="flex items-center gap-sm">
            <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
            <span className="text-sm">Show timer in browser tab</span>
          </label>
        </div>
      </div>

      {/* Ambient Sounds */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Volume2 className="h-5 w-5" />
          Ambient Sounds
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
          {[
            { name: 'None', icon: '🔇' },
            { name: 'Rain', icon: '🌧️' },
            { name: 'Cafe', icon: '☕' },
            { name: 'Nature', icon: '🌿' },
          ].map((sound, i) => (
            <button
              key={i}
              className={`p-md rounded-lg border-2 transition-colors ${
                i === 0
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="text-3xl mb-xs">{sound.icon}</div>
              <div className="text-sm font-medium">{sound.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Sessions */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Today's Completed Sessions</h2>
        <div className="space-y-sm">
          {[
            { task: 'Review project docs', duration: '25m', completed: true, interruptions: 0 },
            { task: 'Bug fixing', duration: '25m', completed: true, interruptions: 1 },
            { task: 'Code review', duration: '25m', completed: true, interruptions: 0 },
            { task: 'Team meeting prep', duration: '15m', completed: false, interruptions: 2 },
          ].map((session, i) => (
            <div
              key={i}
              className={`flex items-center gap-md p-md rounded-lg ${
                session.completed ? 'bg-success-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <p className="font-medium">{session.task}</p>
                <p className="text-sm text-gray-600">{session.duration}</p>
              </div>
              {session.interruptions > 0 && (
                <span className="text-xs px-sm py-xs rounded bg-warning-100 text-warning-800">
                  {session.interruptions} interruption{session.interruptions > 1 ? 's' : ''}
                </span>
              )}
              {session.completed && (
                <span className="text-success-600">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
