import { Bot, Send, Lightbulb, TrendingUp, Code, Heart } from 'lucide-react'
import { useState } from 'react'

type CoachingContext = 'productivity' | 'health' | 'programming' | 'general'

export default function AICoach() {
  const [context, setContext] = useState<CoachingContext>('productivity')
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-xl max-w-6xl mx-auto">
      <div>
        <h1 className="section-header">AI Productivity Coach</h1>
        <p className="text-gray-600">Get personalized guidance and insights powered by AI</p>
      </div>

      {/* Context Selector */}
      <div className="widget">
        <h2 className="text-lg font-medium mb-md">Coaching Focus</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
          {[
            { id: 'productivity', name: 'Productivity', icon: TrendingUp },
            { id: 'health', name: 'Health & Wellness', icon: Heart },
            { id: 'programming', name: 'Programming', icon: Code },
            { id: 'general', name: 'General', icon: Bot },
          ].map((ctx) => {
            const Icon = ctx.icon
            return (
              <button
                key={ctx.id}
                onClick={() => setContext(ctx.id as CoachingContext)}
                className={`p-md rounded-lg border-2 transition-colors ${
                  context === ctx.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-sm ${context === ctx.id ? 'text-primary-600' : 'text-gray-600'}`} />
                <div className="text-sm font-medium">{ctx.name}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Chat Interface */}
        <div className="lg:col-span-2 widget flex flex-col h-[600px]">
          <h2 className="text-xl font-bold mb-md flex items-center gap-sm">
            <Bot className="h-5 w-5 text-primary-600" />
            Chat with AI Coach
          </h2>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-md mb-md scrollbar-thin">
            {/* AI Message */}
            <div className="flex gap-md">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-md">
                  <p className="text-sm">
                    Hi! I'm your AI productivity coach. I've been analyzing your patterns, and I have some insights to share.
                    Based on your data, you're most productive in the morning between 9-11 AM. Would you like me to help you
                    optimize your schedule around this?
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-xs">2 minutes ago</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-md justify-end">
              <div className="flex-1 max-w-md">
                <div className="bg-primary-600 text-white rounded-lg p-md ml-auto">
                  <p className="text-sm">
                    Yes, that would be great! I struggle with prioritizing tasks.
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-xs text-right">1 minute ago</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                U
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-md">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-md">
                  <p className="text-sm mb-sm">
                    Perfect! Here's a strategy tailored to your ADHD needs:
                  </p>
                  <ol className="text-sm space-y-xs list-decimal list-inside">
                    <li>Schedule your high-energy tasks (like "Fix critical bug") during your peak hours (9-11 AM)</li>
                    <li>Use the Eisenhower Matrix to categorize tasks - you have 2 urgent-important items today</li>
                    <li>Break down large tasks into 25-minute pomodoro sessions</li>
                    <li>Save low-energy tasks (like email) for after lunch when focus naturally dips</li>
                  </ol>
                  <p className="text-sm mt-sm">
                    Would you like me to create a suggested schedule for today?
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-xs">Just now</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-md">
            <input
              type="text"
              placeholder="Ask me anything about productivity, health, or programming..."
              className="input flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMessage('')
                }
              }}
            />
            <button className="btn-primary">
              <Send className="h-5 w-5" />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-sm">
            💡 Tip: The AI has context of your recent activities, habits, and tasks for personalized advice
          </p>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-lg">
          <div className="widget">
            <h2 className="text-lg font-bold mb-md flex items-center gap-sm">
              <Lightbulb className="h-5 w-5 text-warning-600" />
              Quick Insights
            </h2>
            <div className="space-y-md">
              {[
                {
                  type: 'priority',
                  title: 'Task Priority Shift',
                  description: 'Move "Fix critical bug" to top priority - it\'s urgent and important',
                  color: 'danger',
                },
                {
                  type: 'break',
                  title: 'Break Reminder',
                  description: 'You\'ve been working for 2 hours. Take a 5-minute break to maintain focus quality.',
                  color: 'warning',
                },
                {
                  type: 'habit',
                  title: 'Habit Suggestion',
                  description: 'Add "Code review" as a daily habit - you do it often but inconsistently',
                  color: 'primary',
                },
              ].map((insight, i) => (
                <div key={i} className={`p-md rounded-lg bg-${insight.color}-50 border border-${insight.color}-200`}>
                  <p className={`text-sm font-medium text-${insight.color}-900 mb-xs`}>{insight.title}</p>
                  <p className={`text-xs text-${insight.color}-800`}>{insight.description}</p>
                  <button className="text-xs font-medium text-primary-600 mt-sm hover:underline">
                    Apply suggestion →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="widget">
            <h2 className="text-lg font-bold mb-md">AI Settings</h2>
            <div className="space-y-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-xs">
                  AI Provider
                </label>
                <select className="input">
                  <option>Gemini (Google)</option>
                  <option>ChatGPT (OpenAI)</option>
                  <option>Ollama (Local)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-xs">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  className="input"
                />
                <p className="text-xs text-gray-500 mt-xs">
                  Your API key is encrypted and stored securely
                </p>
              </div>

              <div className="space-y-sm">
                <label className="flex items-center gap-sm">
                  <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
                  <span className="text-sm">Daily check-ins</span>
                </label>
                <label className="flex items-center gap-sm">
                  <input type="checkbox" className="h-5 w-5 rounded" defaultChecked />
                  <span className="text-sm">Smart recommendations</span>
                </label>
                <label className="flex items-center gap-sm">
                  <input type="checkbox" className="h-5 w-5 rounded" />
                  <span className="text-sm">Code review assistance</span>
                </label>
              </div>

              <button className="btn-primary w-full">Save Settings</button>
            </div>
          </div>

          <div className="widget">
            <h2 className="text-lg font-bold mb-md">Suggested Prompts</h2>
            <div className="space-y-xs">
              {[
                'Help me prioritize my tasks for today',
                'Why is my productivity lower this week?',
                'Suggest a better morning routine',
                'Review my code from the last commit',
                'How can I maintain my habit streaks?',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(prompt)}
                  className="w-full text-left p-sm rounded hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
