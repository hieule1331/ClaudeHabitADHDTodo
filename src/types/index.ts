// User and Authentication Types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  full_name?: string
  avatar_url?: string
  timezone: string
  // ADHD-specific preferences
  notification_frequency: 'high' | 'medium' | 'low' | 'minimal'
  distraction_level: 'high' | 'medium' | 'low'
  preferred_focus_duration: number // in minutes
  preferred_break_duration: number // in minutes
  focus_mode_enabled: boolean
  theme: 'light' | 'dark' | 'high-contrast'
  reduce_motion: boolean
  ai_coaching_enabled: boolean
  ai_provider?: 'gemini' | 'chatgpt' | 'ollama'
  ai_api_key_encrypted?: string
  created_at: string
  updated_at: string
}

// Time Tracking Types
export interface ActivityCategory {
  id: string
  user_id: string
  name: string
  color: string
  is_productive: boolean
  is_default: boolean
  created_at: string
}

export interface TimeEntry {
  id: string
  user_id: string
  activity_name: string
  category_id: string
  start_time: string
  end_time?: string
  duration?: number // in seconds
  auto_categorized: boolean
  categorization_confidence?: number // 0-1
  notes?: string
  created_at: string
  updated_at: string
}

export interface CategorizationRule {
  id: string
  user_id: string
  pattern: string // regex or keyword
  category_id: string
  priority: number
  created_at: string
}

// Pomodoro Types
export interface PomodoroSession {
  id: string
  user_id: string
  task_id?: string
  work_duration: number // in minutes
  break_duration: number // in minutes
  start_time: string
  end_time?: string
  completed: boolean
  interruptions: number
  notes?: string
  created_at: string
}

export interface PomodoroSettings {
  work_duration: number
  short_break: number
  long_break: number
  sessions_until_long_break: number
  auto_start_breaks: boolean
  auto_start_work: boolean
  ambient_sound?: 'none' | 'rain' | 'cafe' | 'nature'
  show_in_tab_title: boolean
}

// Task Management Types
export type TaskPriority = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important'
export type TaskEnergyLevel = 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'archived'

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  energy_level: TaskEnergyLevel
  estimated_duration?: number // in minutes
  actual_duration?: number // in minutes
  due_date?: string
  tags: string[]
  parent_task_id?: string // for subtasks
  is_recurring: boolean
  recurrence_pattern?: string
  context?: string // location or situation
  completed_at?: string
  created_at: string
  updated_at: string
}

// Habit Tracking Types
export type HabitFrequency = 'daily' | 'weekly' | 'custom'
export type HabitDifficulty = 'easy' | 'medium' | 'hard'

export interface Habit {
  id: string
  user_id: string
  name: string
  description?: string
  category: string
  frequency: HabitFrequency
  frequency_count?: number // for custom frequency
  difficulty: HabitDifficulty
  reward_points: number
  color: string
  icon?: string
  reminder_time?: string
  flexible_timing: boolean // allow completion within window
  current_streak: number
  longest_streak: number
  total_completions: number
  created_at: string
  updated_at: string
}

export interface HabitCompletion {
  id: string
  habit_id: string
  user_id: string
  completed_at: string
  notes?: string
  mood?: 'great' | 'good' | 'okay' | 'difficult'
}

// Analytics Types
export interface ProductivityScore {
  date: string
  score: number // 0-100
  productive_time: number // in minutes
  distraction_time: number // in minutes
  focus_quality: number // 0-100
  habits_completed: number
  tasks_completed: number
  pomodoros_completed: number
}

export interface TimeDistribution {
  category: string
  duration: number // in seconds
  percentage: number
}

export interface FocusPattern {
  hour: number
  focus_quality: number
  productivity: number
}

// AI Coaching Types
export interface AIConversation {
  id: string
  user_id: string
  messages: AIMessage[]
  context_type: 'productivity' | 'health' | 'programming' | 'general'
  created_at: string
  updated_at: string
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIRecommendation {
  id: string
  user_id: string
  type: 'task-priority' | 'break-reminder' | 'habit-suggestion' | 'focus-time' | 'health-tip'
  title: string
  description: string
  actionable: boolean
  action_url?: string
  priority: 'high' | 'medium' | 'low'
  dismissed: boolean
  created_at: string
}

export interface AIContext {
  recent_activities: TimeEntry[]
  habits_status: { habit: Habit; recent_completions: number }[]
  tasks_pending: Task[]
  productivity_trend: 'improving' | 'stable' | 'declining'
  focus_quality: number
  last_break: string
  current_streak: number
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  type: 'reminder' | 'achievement' | 'break' | 'habit' | 'task' | 'ai-insight'
  title: string
  message: string
  action_url?: string
  read: boolean
  created_at: string
}

// Widget and Dashboard Types
export type WidgetType =
  | 'quick-capture'
  | 'active-timer'
  | 'daily-summary'
  | 'habit-tracker'
  | 'task-list'
  | 'time-distribution'
  | 'productivity-score'
  | 'ai-insights'
  | 'focus-mode'
  | 'quick-stats'

export interface DashboardWidget {
  id: string
  type: WidgetType
  position: number
  size: 'small' | 'medium' | 'large'
  visible: boolean
  settings?: Record<string, unknown>
}

export interface DashboardLayout {
  user_id: string
  widgets: DashboardWidget[]
  updated_at: string
}
