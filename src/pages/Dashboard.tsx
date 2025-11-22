import { Activity, Clock, Target, CheckSquare, TrendingUp, Zap } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-xl">
      {/* Welcome Section */}
      <div>
        <h1 className="section-header">Welcome Back!</h1>
        <p className="text-gray-600">Here's your productivity overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Focus Time</p>
              <p className="text-3xl font-bold text-gray-900">2h 34m</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-sm">
            <span className="text-sm text-success-600 font-medium">+12% from yesterday</span>
          </div>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasks Done</p>
              <p className="text-3xl font-bold text-gray-900">8/12</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-sm">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Habit Streak</p>
              <p className="text-3xl font-bold text-gray-900">14 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-sm">
            <span className="streak-indicator">🔥 Keep it up!</span>
          </div>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Productivity</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-sm">
            <span className="text-sm text-purple-600 font-medium">Above average</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Quick Capture */}
        <div className="widget">
          <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
            <Zap className="h-5 w-5 text-primary-600" />
            Quick Capture
          </h2>
          <input
            type="text"
            placeholder="Brain dump your task here... (Press Enter)"
            className="input"
          />
          <p className="text-xs text-gray-500 mt-sm">
            Don't overthink it - just capture the thought and organize later
          </p>
        </div>

        {/* Active Pomodoro */}
        <div className="widget">
          <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
            <Activity className="h-5 w-5 text-primary-600" />
            Focus Session
          </h2>
          <div className="text-center py-lg">
            <div className="timer-display text-primary-600">25:00</div>
            <p className="text-gray-600 mt-sm">Ready to focus?</p>
            <button className="btn-primary mt-md">Start Pomodoro</button>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="widget lg:col-span-2">
          <h2 className="text-xl font-bold mb-md">Today's Top Tasks</h2>
          <div className="space-y-sm">
            {[
              { title: 'Review project documentation', energy: 'high', priority: 'urgent-important' },
              { title: 'Respond to emails', energy: 'medium', priority: 'urgent-not-important' },
              { title: 'Plan next sprint', energy: 'high', priority: 'not-urgent-important' },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-md p-md rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <input type="checkbox" className="h-5 w-5 rounded text-primary-600" />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <div className="flex gap-sm mt-xs">
                    <span className="text-xs px-sm py-xs rounded bg-blue-100 text-blue-800">
                      {task.energy} energy
                    </span>
                    <span className="text-xs px-sm py-xs rounded bg-purple-100 text-purple-800">
                      {task.priority.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full mt-md">View All Tasks</button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Target className="h-5 w-5 text-primary-600" />
          AI Coach Insights
        </h2>
        <div className="space-y-md">
          <div className="p-md rounded-lg bg-primary-50 border border-primary-200">
            <p className="text-sm font-medium text-primary-900">
              ✨ Your focus is best between 9-11 AM. Schedule high-energy tasks during this window.
            </p>
          </div>
          <div className="p-md rounded-lg bg-warning-50 border border-warning-200">
            <p className="text-sm font-medium text-warning-900">
              ⏰ You haven't taken a break in 2 hours. Time for a 5-minute stretch!
            </p>
          </div>
          <div className="p-md rounded-lg bg-success-50 border border-success-200">
            <p className="text-sm font-medium text-success-900">
              🎯 You're on a 14-day streak with your morning exercise habit. Amazing work!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
