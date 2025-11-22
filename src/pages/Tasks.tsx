import { Plus, Zap, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

type ViewMode = 'list' | 'eisenhower' | 'energy'

export default function Tasks() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Tasks</h1>
          <p className="text-gray-600">Organize your tasks the ADHD-friendly way</p>
        </div>
        <button className="btn-primary flex items-center gap-sm">
          <Plus className="h-5 w-5" />
          Brain Dump
        </button>
      </div>

      {/* View Mode Selector */}
      <div className="widget">
        <div className="flex gap-sm">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-sm rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('eisenhower')}
            className={`flex-1 py-sm rounded-lg font-medium transition-colors ${
              viewMode === 'eisenhower'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Eisenhower Matrix
          </button>
          <button
            onClick={() => setViewMode('energy')}
            className={`flex-1 py-sm rounded-lg font-medium transition-colors ${
              viewMode === 'energy'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Energy Levels
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-lg">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="p-md rounded-lg bg-primary-50 border border-primary-200">
              <p className="text-sm text-primary-700">In Progress</p>
              <p className="text-2xl font-bold text-primary-900">4</p>
            </div>
            <div className="p-md rounded-lg bg-warning-50 border border-warning-200">
              <p className="text-sm text-warning-700">Due Today</p>
              <p className="text-2xl font-bold text-warning-900">2</p>
            </div>
            <div className="p-md rounded-lg bg-success-50 border border-success-200">
              <p className="text-sm text-success-700">Completed Today</p>
              <p className="text-2xl font-bold text-success-900">8</p>
            </div>
          </div>

          {/* Task Sections */}
          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <AlertCircle className="h-5 w-5 text-danger-600" />
              Urgent & Important
            </h2>
            <div className="space-y-sm">
              {[
                { title: 'Fix critical bug in production', time: '30m', energy: 'high', due: '2h' },
                { title: 'Submit project proposal', time: '1h', energy: 'high', due: '4h' },
              ].map((task, i) => (
                <TaskCard key={i} {...task} />
              ))}
            </div>
          </div>

          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <Clock className="h-5 w-5 text-primary-600" />
              Important, Not Urgent
            </h2>
            <div className="space-y-sm">
              {[
                { title: 'Plan next quarter goals', time: '2h', energy: 'high', due: '2 days' },
                { title: 'Review and update documentation', time: '1h', energy: 'medium', due: '3 days' },
                { title: 'Learn new framework basics', time: '1.5h', energy: 'high', due: '1 week' },
              ].map((task, i) => (
                <TaskCard key={i} {...task} />
              ))}
            </div>
          </div>

          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <CheckCircle className="h-5 w-5 text-success-600" />
              Quick Wins (Low Energy)
            </h2>
            <div className="space-y-sm">
              {[
                { title: 'Respond to non-urgent emails', time: '15m', energy: 'low', due: 'today' },
                { title: 'Update project README', time: '10m', energy: 'low', due: 'this week' },
              ].map((task, i) => (
                <TaskCard key={i} {...task} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Eisenhower Matrix View */}
      {viewMode === 'eisenhower' && (
        <div className="grid grid-cols-2 gap-md h-[600px]">
          <div className="widget bg-danger-50 border-danger-300">
            <h3 className="font-bold text-danger-900 mb-sm">Urgent & Important</h3>
            <p className="text-xs text-danger-700 mb-md">Do First</p>
            <div className="space-y-xs">
              <div className="p-sm bg-white rounded border border-danger-200 text-sm">
                Fix critical bug
              </div>
              <div className="p-sm bg-white rounded border border-danger-200 text-sm">
                Submit proposal
              </div>
            </div>
          </div>

          <div className="widget bg-warning-50 border-warning-300">
            <h3 className="font-bold text-warning-900 mb-sm">Urgent, Not Important</h3>
            <p className="text-xs text-warning-700 mb-md">Delegate/Minimize</p>
            <div className="space-y-xs">
              <div className="p-sm bg-white rounded border border-warning-200 text-sm">
                Respond to emails
              </div>
            </div>
          </div>

          <div className="widget bg-primary-50 border-primary-300">
            <h3 className="font-bold text-primary-900 mb-sm">Not Urgent, Important</h3>
            <p className="text-xs text-primary-700 mb-md">Schedule Time</p>
            <div className="space-y-xs">
              <div className="p-sm bg-white rounded border border-primary-200 text-sm">
                Plan quarterly goals
              </div>
              <div className="p-sm bg-white rounded border border-primary-200 text-sm">
                Learn new framework
              </div>
            </div>
          </div>

          <div className="widget bg-gray-100 border-gray-300">
            <h3 className="font-bold text-gray-900 mb-sm">Not Urgent, Not Important</h3>
            <p className="text-xs text-gray-700 mb-md">Do Later/Eliminate</p>
            <div className="space-y-xs">
              <div className="p-sm bg-white rounded border border-gray-200 text-sm">
                Organize old files
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Energy Levels View */}
      {viewMode === 'energy' && (
        <div className="space-y-lg">
          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <Zap className="h-5 w-5 text-warning-600" />
              High Energy Tasks
            </h2>
            <p className="text-sm text-gray-600 mb-md">
              Save these for your peak focus hours (typically morning)
            </p>
            <div className="space-y-sm">
              {[
                { title: 'Fix critical bug in production', time: '30m' },
                { title: 'Plan next quarter goals', time: '2h' },
                { title: 'Learn new framework basics', time: '1.5h' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-md p-md rounded-lg bg-warning-50 border border-warning-200">
                  <input type="checkbox" className="h-5 w-5 rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                  </div>
                  <span className="text-sm text-gray-600">{task.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <Clock className="h-5 w-5 text-primary-600" />
              Medium Energy Tasks
            </h2>
            <p className="text-sm text-gray-600 mb-md">
              Good for mid-day or after a break
            </p>
            <div className="space-y-sm">
              {[
                { title: 'Review and update documentation', time: '1h' },
                { title: 'Submit project proposal', time: '1h' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-md p-md rounded-lg bg-primary-50 border border-primary-200">
                  <input type="checkbox" className="h-5 w-5 rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                  </div>
                  <span className="text-sm text-gray-600">{task.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="widget">
            <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
              <CheckCircle className="h-5 w-5 text-success-600" />
              Low Energy Tasks
            </h2>
            <p className="text-sm text-gray-600 mb-md">
              Perfect for low-focus periods or when you're feeling drained
            </p>
            <div className="space-y-sm">
              {[
                { title: 'Respond to non-urgent emails', time: '15m' },
                { title: 'Update project README', time: '10m' },
                { title: 'Organize old files', time: '20m' },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-md p-md rounded-lg bg-success-50 border border-success-200">
                  <input type="checkbox" className="h-5 w-5 rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                  </div>
                  <span className="text-sm text-gray-600">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ title, time, energy, due }: { title: string; time: string; energy: string; due: string }) {
  return (
    <div className="flex items-center gap-md p-md rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <input type="checkbox" className="h-5 w-5 rounded text-primary-600" />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <div className="flex gap-sm mt-xs">
          <span className="text-xs px-sm py-xs rounded bg-blue-100 text-blue-800">
            {time}
          </span>
          <span className={`text-xs px-sm py-xs rounded ${
            energy === 'high' ? 'bg-warning-100 text-warning-800' :
            energy === 'medium' ? 'bg-primary-100 text-primary-800' :
            'bg-success-100 text-success-800'
          }`}>
            {energy} energy
          </span>
          <span className="text-xs px-sm py-xs rounded bg-gray-200 text-gray-800">
            Due: {due}
          </span>
        </div>
      </div>
    </div>
  )
}
