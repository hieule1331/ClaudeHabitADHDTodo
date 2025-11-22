import { TrendingUp, Clock, Target, Zap, Calendar } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="space-y-xl">
      <div>
        <h1 className="section-header">Analytics & Insights</h1>
        <p className="text-gray-600">Understand your patterns and optimize your productivity</p>
      </div>

      {/* Time Period Selector */}
      <div className="widget">
        <div className="flex gap-sm">
          {['Today', 'Week', 'Month', 'Year'].map((period, i) => (
            <button
              key={i}
              className={`flex-1 py-sm rounded-lg font-medium transition-colors ${
                period === 'Week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        <div className="widget">
          <div className="flex items-center justify-between mb-sm">
            <p className="text-sm text-gray-600">Productivity Score</p>
            <TrendingUp className="h-5 w-5 text-success-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">87%</p>
          <p className="text-sm text-success-600 font-medium mt-xs">+5% vs last week</p>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between mb-sm">
            <p className="text-sm text-gray-600">Focus Time</p>
            <Clock className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">18.5h</p>
          <p className="text-sm text-primary-600 font-medium mt-xs">2.5h/day avg</p>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between mb-sm">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <Target className="h-5 w-5 text-success-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">47</p>
          <p className="text-sm text-gray-600 font-medium mt-xs">6.7/day avg</p>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between mb-sm">
            <p className="text-sm text-gray-600">Focus Quality</p>
            <Zap className="h-5 w-5 text-warning-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">92%</p>
          <p className="text-sm text-success-600 font-medium mt-xs">+8% vs last week</p>
        </div>
      </div>

      {/* Productivity Trend Chart */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Productivity Trend</h2>
        <div className="h-64 flex items-end justify-between gap-sm">
          {[65, 72, 68, 85, 78, 87, 92].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-sm">
              <div className="w-full bg-gray-200 rounded-t" style={{ height: '200px', position: 'relative' }}>
                <div
                  className="w-full bg-primary-600 rounded-t absolute bottom-0"
                  style={{ height: `${value}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        <div className="widget">
          <h2 className="text-xl font-bold mb-md">Time Distribution</h2>
          <div className="space-y-md">
            {[
              { category: 'Deep Work', hours: 12.5, percentage: 68, color: 'primary' },
              { category: 'Meetings', hours: 3.2, percentage: 17, color: 'purple' },
              { category: 'Learning', hours: 2.8, percentage: 15, color: 'blue' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-xs">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-gray-600">{item.hours}h ({item.percentage}%)</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`h-full bg-${item.color}-600 transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget">
          <h2 className="text-xl font-bold mb-md">Focus Quality by Hour</h2>
          <div className="h-48 flex items-end justify-between gap-xs">
            {[45, 55, 75, 85, 92, 88, 78, 65, 58, 62, 68, 55].map((quality, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-xs">
                <div className="w-full bg-gray-200 rounded-t" style={{ height: '150px', position: 'relative' }}>
                  <div
                    className={`w-full rounded-t absolute bottom-0 ${
                      quality >= 80 ? 'bg-success-600' :
                      quality >= 60 ? 'bg-warning-600' :
                      'bg-danger-600'
                    }`}
                    style={{ height: `${quality}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{9 + i}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-md text-center">
            Peak focus: 9 AM - 12 PM
          </p>
        </div>
      </div>

      {/* Habit Consistency */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Calendar className="h-5 w-5" />
          Habit Consistency (Last 30 Days)
        </h2>
        <div className="space-y-md">
          {[
            { habit: 'Morning Exercise', completion: 93, streak: 28 },
            { habit: 'Meditation', completion: 87, streak: 14 },
            { habit: 'Code Review', completion: 76, streak: 8 },
            { habit: 'Reading', completion: 71, streak: 12 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-xs">
                <span className="text-sm font-medium">{item.habit}</span>
                <div className="flex items-center gap-md">
                  <span className="text-sm text-gray-600">{item.completion}%</span>
                  <span className="streak-indicator text-xs">
                    🔥 {item.streak} days
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`h-full transition-all duration-300 ${
                    item.completion >= 90 ? 'bg-success-600' :
                    item.completion >= 70 ? 'bg-warning-600' :
                    'bg-danger-600'
                  }`}
                  style={{ width: `${item.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Insights */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Pattern Insights</h2>
        <div className="space-y-md">
          <div className="p-md rounded-lg bg-primary-50 border border-primary-200">
            <p className="text-sm font-medium text-primary-900">
              📊 Your productivity increases by 23% on days when you complete morning exercise
            </p>
          </div>
          <div className="p-md rounded-lg bg-success-50 border border-success-200">
            <p className="text-sm font-medium text-success-900">
              🎯 Tasks completed before 11 AM have 45% higher quality ratings
            </p>
          </div>
          <div className="p-md rounded-lg bg-warning-50 border border-warning-200">
            <p className="text-sm font-medium text-warning-900">
              ⏰ Your focus quality drops significantly after 2.5 hours without a break
            </p>
          </div>
          <div className="p-md rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-sm font-medium text-purple-900">
              💪 You complete 2x more high-energy tasks on days with consistent sleep schedule
            </p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Export Data</h2>
        <div className="flex gap-md">
          <button className="btn-secondary flex-1">Export as CSV</button>
          <button className="btn-secondary flex-1">Export as PDF</button>
          <button className="btn-secondary flex-1">Export as JSON</button>
        </div>
      </div>
    </div>
  )
}
