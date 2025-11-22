import { Settings as SettingsIcon, User, Bell, Palette, Shield, Database } from 'lucide-react'

export default function Settings() {
  return (
    <div className="space-y-xl max-w-4xl mx-auto">
      <div>
        <h1 className="section-header">Settings</h1>
        <p className="text-gray-600">Customize your ADHD productivity dashboard</p>
      </div>

      {/* Profile Settings */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <User className="h-5 w-5" />
          Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Full Name
            </label>
            <input type="text" defaultValue="John Doe" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Email
            </label>
            <input type="email" defaultValue="john@example.com" className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Timezone
            </label>
            <select className="input">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (CET)</option>
            </select>
          </div>
        </div>
        <button className="btn-primary mt-md">Save Profile</button>
      </div>

      {/* ADHD Preferences */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <SettingsIcon className="h-5 w-5" />
          ADHD Preferences
        </h2>

        <div className="space-y-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-sm">
              Distraction Level
            </label>
            <p className="text-xs text-gray-600 mb-sm">
              How easily are you distracted? This affects interface complexity and notification frequency.
            </p>
            <div className="grid grid-cols-3 gap-sm">
              {['Low', 'Medium', 'High'].map((level, i) => (
                <button
                  key={i}
                  className={`py-sm rounded-lg font-medium transition-colors ${
                    level === 'Medium'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-sm">
              Preferred Focus Duration
            </label>
            <p className="text-xs text-gray-600 mb-sm">
              How long can you typically maintain focus before needing a break?
            </p>
            <div className="grid grid-cols-4 gap-sm">
              {['15 min', '25 min', '45 min', '60 min'].map((duration, i) => (
                <button
                  key={i}
                  className={`py-sm rounded-lg font-medium transition-colors ${
                    duration === '25 min'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-sm">
              Preferred Break Duration
            </label>
            <div className="grid grid-cols-4 gap-sm">
              {['3 min', '5 min', '10 min', '15 min'].map((duration, i) => (
                <button
                  key={i}
                  className={`py-sm rounded-lg font-medium transition-colors ${
                    duration === '5 min'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="btn-primary mt-md">Save Preferences</button>
      </div>

      {/* Notifications */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>

        <div className="space-y-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-sm">
              Notification Frequency
            </label>
            <select className="input">
              <option>Minimal (only critical)</option>
              <option>Low (important only)</option>
              <option>Medium (balanced)</option>
              <option>High (all notifications)</option>
            </select>
          </div>

          <div className="space-y-sm">
            <p className="text-sm font-medium text-gray-700">Enable notifications for:</p>
            {[
              'Break reminders',
              'Habit check-ins',
              'Task deadlines',
              'AI insights',
              'Achievement celebrations',
              'Pomodoro completions',
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-sm">
                <input type="checkbox" className="h-5 w-5 rounded" defaultChecked={i < 4} />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Quiet Hours
            </label>
            <div className="grid grid-cols-2 gap-sm">
              <input type="time" defaultValue="22:00" className="input" />
              <input type="time" defaultValue="08:00" className="input" />
            </div>
          </div>
        </div>
        <button className="btn-primary mt-md">Save Notification Settings</button>
      </div>

      {/* Appearance */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Palette className="h-5 w-5" />
          Appearance
        </h2>

        <div className="space-y-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-sm">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-sm">
              {['Light', 'Dark', 'High Contrast'].map((theme, i) => (
                <button
                  key={i}
                  className={`py-sm rounded-lg font-medium transition-colors ${
                    theme === 'Light'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-sm">
            <label className="flex items-center gap-sm">
              <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
              <span className="text-sm">Reduce motion and animations</span>
            </label>
            <label className="flex items-center gap-sm">
              <input type="checkbox" className="h-5 w-5 rounded" />
              <span className="text-sm">Enable focus mode by default</span>
            </label>
            <label className="flex items-center gap-sm">
              <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
              <span className="text-sm">Show productivity score on dashboard</span>
            </label>
          </div>
        </div>
        <button className="btn-primary mt-md">Save Appearance Settings</button>
      </div>

      {/* Privacy & Data */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Shield className="h-5 w-5" />
          Privacy & Data
        </h2>

        <div className="space-y-md">
          <div className="space-y-sm">
            <label className="flex items-center gap-sm">
              <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
              <span className="text-sm">Allow AI to access my activity data</span>
            </label>
            <label className="flex items-center gap-sm">
              <input type="checkbox" className="h-5 w-5 rounded" />
              <span className="text-sm">Participate in anonymous analytics</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-xs">
              Data Retention
            </label>
            <select className="input">
              <option>Keep forever</option>
              <option>1 year</option>
              <option>6 months</option>
              <option>3 months</option>
            </select>
          </div>
        </div>
        <button className="btn-primary mt-md">Save Privacy Settings</button>
      </div>

      {/* Data Management */}
      <div className="widget">
        <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
          <Database className="h-5 w-5" />
          Data Management
        </h2>

        <div className="space-y-md">
          <div>
            <p className="text-sm text-gray-700 mb-sm">Export your data</p>
            <div className="flex gap-sm">
              <button className="btn-secondary flex-1">Export as JSON</button>
              <button className="btn-secondary flex-1">Export as CSV</button>
            </div>
          </div>

          <div className="pt-md border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-sm">Danger Zone</p>
            <button className="btn-danger">Delete All Data</button>
            <p className="text-xs text-gray-500 mt-xs">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
