import { Target, Plus, Flame, TrendingUp } from 'lucide-react'

export default function Habits() {
  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Habit Tracking</h1>
          <p className="text-gray-600">Build sustainable routines with ADHD-friendly habit tracking</p>
        </div>
        <button className="btn-primary flex items-center gap-sm">
          <Plus className="h-5 w-5" />
          New Habit
        </button>
      </div>

      {/* Streak Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-3xl font-bold text-gray-900">14 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center">
              <Flame className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Longest Streak</p>
              <p className="text-3xl font-bold text-gray-900">28 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reward Points</p>
              <p className="text-3xl font-bold text-gray-900">342</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Habits */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">Today's Habits</h2>
        <div className="space-y-md">
          {[
            { name: 'Morning Exercise', streak: 14, completed: true, difficulty: 'medium', points: 15, category: 'Health' },
            { name: 'Meditation', streak: 14, completed: true, difficulty: 'easy', points: 10, category: 'Mindfulness' },
            { name: 'Code Review', streak: 8, completed: false, difficulty: 'hard', points: 20, category: 'Productivity' },
            { name: 'Read for 20 minutes', streak: 12, completed: false, difficulty: 'easy', points: 10, category: 'Learning' },
            { name: 'Drink 8 glasses of water', streak: 9, completed: false, difficulty: 'easy', points: 10, category: 'Health' },
          ].map((habit, i) => (
            <div
              key={i}
              className={`p-md rounded-lg border-2 transition-all ${
                habit.completed
                  ? 'bg-success-50 border-success-300'
                  : 'bg-white border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-md">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  className="h-6 w-6 rounded text-success-600"
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-sm">
                    <p className={`font-medium ${habit.completed ? 'line-through text-gray-600' : ''}`}>
                      {habit.name}
                    </p>
                    {habit.streak > 0 && (
                      <span className="streak-indicator">
                        <Flame className="h-3 w-3" />
                        {habit.streak} days
                      </span>
                    )}
                  </div>
                  <div className="flex gap-sm mt-xs">
                    <span className="text-xs px-sm py-xs rounded bg-blue-100 text-blue-800">
                      {habit.category}
                    </span>
                    <span className={`text-xs px-sm py-xs rounded ${
                      habit.difficulty === 'hard' ? 'bg-danger-100 text-danger-800' :
                      habit.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
                      'bg-success-100 text-success-800'
                    }`}>
                      {habit.difficulty}
                    </span>
                    <span className="text-xs px-sm py-xs rounded bg-purple-100 text-purple-800">
                      +{habit.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Calendar */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md">This Week's Progress</h2>
        <div className="grid grid-cols-7 gap-sm">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} className="text-center">
              <p className="text-xs text-gray-600 mb-sm">{day}</p>
              <div className={`h-12 rounded ${
                i < 4 ? 'bg-success-500' :
                i === 4 ? 'bg-success-300' :
                'bg-gray-200'
              }`}></div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-md text-center">
          4 of 5 habits completed today
        </p>
      </div>

      {/* Habit Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        <div className="widget">
          <h2 className="text-xl font-bold mb-md">Category Breakdown</h2>
          <div className="space-y-md">
            {[
              { category: 'Health', count: 2, color: 'green' },
              { category: 'Productivity', count: 1, color: 'blue' },
              { category: 'Learning', count: 1, color: 'purple' },
              { category: 'Mindfulness', count: 1, color: 'indigo' },
            ].map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className={`h-3 w-3 rounded-full bg-${cat.color}-500`}></div>
                  <span className="font-medium">{cat.category}</span>
                </div>
                <span className="text-gray-600">{cat.count} habits</span>
              </div>
            ))}
          </div>
        </div>

        <div className="widget">
          <h2 className="text-xl font-bold mb-md">Completion Rate</h2>
          <div className="text-center py-lg">
            <div className="text-6xl font-bold text-success-600">87%</div>
            <p className="text-gray-600 mt-sm">Last 30 days</p>
            <p className="text-sm text-success-600 font-medium mt-xs">+5% from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
