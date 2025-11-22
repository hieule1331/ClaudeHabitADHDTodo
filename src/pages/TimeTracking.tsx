import { Play, Square, Plus, Filter } from 'lucide-react'
import { useState } from 'react'

export default function TimeTracking() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentActivity, setCurrentActivity] = useState('')

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="section-header">Time Tracking</h1>
        <p className="text-gray-600">Track your activities and understand where your time goes</p>
      </div>

      {/* Active Timer */}
      <div className="widget">
        <div className="flex items-center justify-between mb-md">
          <h2 className="text-xl font-bold">Current Activity</h2>
          {isTracking && (
            <span className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-success-100 text-success-800 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-success-600 animate-pulse"></span>
              Tracking
            </span>
          )}
        </div>

        <div className="space-y-md">
          <input
            type="text"
            placeholder="What are you working on?"
            className="input"
            value={currentActivity}
            onChange={(e) => setCurrentActivity(e.target.value)}
            disabled={isTracking}
          />

          <div className="flex gap-md">
            {!isTracking ? (
              <button
                className="btn-primary flex items-center gap-sm"
                onClick={() => setIsTracking(true)}
                disabled={!currentActivity}
              >
                <Play className="h-5 w-5" />
                Start Tracking
              </button>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-center">
                  <div className="timer-display text-4xl">00:15:32</div>
                </div>
                <button
                  className="btn-danger flex items-center gap-sm"
                  onClick={() => setIsTracking(false)}
                >
                  <Square className="h-5 w-5" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Log */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Plus className="h-5 w-5" />
          Quick Log Past Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <input type="text" placeholder="Activity name" className="input" />
          <select className="input">
            <option>Select category</option>
            <option>Work - Coding</option>
            <option>Work - Meetings</option>
            <option>Learning</option>
            <option>Break</option>
            <option>Exercise</option>
          </select>
          <input type="datetime-local" className="input" />
          <input type="number" placeholder="Duration (minutes)" className="input" />
          <button className="btn-primary md:col-span-2">Log Activity</button>
        </div>
      </div>

      {/* Today's Timeline */}
      <div className="widget">
        <div className="flex items-center justify-between mb-md">
          <h2 className="text-xl font-bold">Today's Activity</h2>
          <button className="btn-secondary flex items-center gap-sm text-sm">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="space-y-sm">
          {[
            { activity: 'Morning planning', category: 'Work', duration: '15m', time: '9:00 AM', color: 'blue' },
            { activity: 'Deep work - Feature development', category: 'Work - Coding', duration: '1h 45m', time: '9:15 AM', color: 'green' },
            { activity: 'Coffee break', category: 'Break', duration: '10m', time: '11:00 AM', color: 'gray' },
            { activity: 'Team standup', category: 'Work - Meetings', duration: '15m', time: '11:10 AM', color: 'purple' },
            { activity: 'Code review', category: 'Work - Coding', duration: '30m', time: '11:25 AM', color: 'green' },
          ].map((entry, i) => (
            <div key={i} className="flex items-center gap-md p-md rounded-lg bg-gray-50">
              <div className={`h-10 w-1 rounded-full bg-${entry.color}-500`}></div>
              <div className="flex-1">
                <p className="font-medium">{entry.activity}</p>
                <p className="text-sm text-gray-600">{entry.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{entry.duration}</p>
                <p className="text-sm text-gray-600">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Distribution */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Time Distribution (Today)</h2>
        <div className="space-y-md">
          {[
            { category: 'Work - Coding', time: '2h 15m', percentage: 60, color: 'green' },
            { category: 'Work - Meetings', time: '45m', percentage: 20, color: 'purple' },
            { category: 'Learning', time: '30m', percentage: 13, color: 'blue' },
            { category: 'Break', time: '15m', percentage: 7, color: 'gray' },
          ].map((cat, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-xs">
                <span className="text-sm font-medium">{cat.category}</span>
                <span className="text-sm text-gray-600">{cat.time} ({cat.percentage}%)</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`h-full bg-${cat.color}-500 transition-all duration-300`}
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
