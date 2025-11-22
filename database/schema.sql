-- ADHD Productivity Dashboard - Database Schema
-- Supabase (PostgreSQL) Schema with Row Level Security

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- USER PROFILES TABLE
-- ==============================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    timezone TEXT DEFAULT 'UTC',

    -- ADHD-specific preferences
    notification_frequency TEXT CHECK (notification_frequency IN ('high', 'medium', 'low', 'minimal')) DEFAULT 'medium',
    distraction_level TEXT CHECK (distraction_level IN ('high', 'medium', 'low')) DEFAULT 'medium',
    preferred_focus_duration INTEGER DEFAULT 25, -- minutes
    preferred_break_duration INTEGER DEFAULT 5, -- minutes
    focus_mode_enabled BOOLEAN DEFAULT false,
    theme TEXT CHECK (theme IN ('light', 'dark', 'high-contrast')) DEFAULT 'light',
    reduce_motion BOOLEAN DEFAULT false,

    -- AI preferences
    ai_coaching_enabled BOOLEAN DEFAULT true,
    ai_provider TEXT CHECK (ai_provider IN ('gemini', 'chatgpt', 'ollama')),
    ai_api_key_encrypted TEXT, -- Encrypted API key

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- ACTIVITY CATEGORIES TABLE
-- ==============================================
CREATE TABLE activity_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#3B82F6', -- hex color
    is_productive BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TIME ENTRIES TABLE
-- ==============================================
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_name TEXT NOT NULL,
    category_id UUID REFERENCES activity_categories(id) ON DELETE SET NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration INTEGER, -- seconds, calculated from start_time and end_time
    auto_categorized BOOLEAN DEFAULT false,
    categorization_confidence DECIMAL(3,2), -- 0.00 to 1.00
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- CATEGORIZATION RULES TABLE
-- ==============================================
CREATE TABLE categorization_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    pattern TEXT NOT NULL, -- regex or keyword
    category_id UUID REFERENCES activity_categories(id) ON DELETE CASCADE,
    priority INTEGER DEFAULT 0, -- higher number = higher priority
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- POMODORO SESSIONS TABLE
-- ==============================================
CREATE TABLE pomodoro_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    work_duration INTEGER NOT NULL, -- minutes
    break_duration INTEGER NOT NULL, -- minutes
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    completed BOOLEAN DEFAULT false,
    interruptions INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TASKS TABLE
-- ==============================================
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('todo', 'in-progress', 'completed', 'archived')) DEFAULT 'todo',
    priority TEXT CHECK (priority IN ('urgent-important', 'not-urgent-important', 'urgent-not-important', 'not-urgent-not-important')) DEFAULT 'not-urgent-important',
    energy_level TEXT CHECK (energy_level IN ('high', 'medium', 'low')) DEFAULT 'medium',
    estimated_duration INTEGER, -- minutes
    actual_duration INTEGER, -- minutes, tracked via pomodoro or manual
    due_date TIMESTAMPTZ,
    tags TEXT[], -- array of tags
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE, -- for subtasks
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern TEXT, -- cron-like pattern or simple description
    context TEXT, -- location or situation context
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- HABITS TABLE
-- ==============================================
CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'custom')) DEFAULT 'daily',
    frequency_count INTEGER, -- for custom frequency (e.g., 3 times per week)
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
    reward_points INTEGER DEFAULT 10,
    color TEXT DEFAULT '#22C55E',
    icon TEXT,
    reminder_time TIME,
    flexible_timing BOOLEAN DEFAULT true,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- HABIT COMPLETIONS TABLE
-- ==============================================
CREATE TABLE habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    mood TEXT CHECK (mood IN ('great', 'good', 'okay', 'difficult'))
);

-- ==============================================
-- AI CONVERSATIONS TABLE
-- ==============================================
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    messages JSONB NOT NULL DEFAULT '[]', -- array of {role, content, timestamp}
    context_type TEXT CHECK (context_type IN ('productivity', 'health', 'programming', 'general')) DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- AI RECOMMENDATIONS TABLE
-- ==============================================
CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('task-priority', 'break-reminder', 'habit-suggestion', 'focus-time', 'health-tip')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    actionable BOOLEAN DEFAULT false,
    action_url TEXT,
    priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
    dismissed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- NOTIFICATIONS TABLE
-- ==============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('reminder', 'achievement', 'break', 'habit', 'task', 'ai-insight')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- PRODUCTIVITY SCORES TABLE
-- ==============================================
CREATE TABLE productivity_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    productive_time INTEGER DEFAULT 0, -- minutes
    distraction_time INTEGER DEFAULT 0, -- minutes
    focus_quality INTEGER CHECK (focus_quality >= 0 AND focus_quality <= 100),
    habits_completed INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    pomodoros_completed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- ==============================================
-- DASHBOARD LAYOUTS TABLE
-- ==============================================
CREATE TABLE dashboard_layouts (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    widgets JSONB NOT NULL DEFAULT '[]', -- array of widget configurations
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- INDEXES for Performance
-- ==============================================

-- Time entries indexes
CREATE INDEX idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX idx_time_entries_start_time ON time_entries(start_time);
CREATE INDEX idx_time_entries_category_id ON time_entries(category_id);

-- Tasks indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_energy_level ON tasks(energy_level);

-- Habits indexes
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_completions_habit_id ON habit_completions(habit_id);
CREATE INDEX idx_habit_completions_completed_at ON habit_completions(completed_at);

-- Pomodoro sessions indexes
CREATE INDEX idx_pomodoro_sessions_user_id ON pomodoro_sessions(user_id);
CREATE INDEX idx_pomodoro_sessions_task_id ON pomodoro_sessions(task_id);
CREATE INDEX idx_pomodoro_sessions_start_time ON pomodoro_sessions(start_time);

-- AI tables indexes
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_recommendations_user_id ON ai_recommendations(user_id);
CREATE INDEX idx_ai_recommendations_dismissed ON ai_recommendations(dismissed);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Productivity scores index
CREATE INDEX idx_productivity_scores_user_date ON productivity_scores(user_id, date);

-- ==============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorization_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE productivity_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_layouts ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Activity Categories Policies
CREATE POLICY "Users can view own categories" ON activity_categories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own categories" ON activity_categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own categories" ON activity_categories FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own categories" ON activity_categories FOR DELETE USING (auth.uid() = user_id);

-- Time Entries Policies
CREATE POLICY "Users can view own time entries" ON time_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own time entries" ON time_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own time entries" ON time_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own time entries" ON time_entries FOR DELETE USING (auth.uid() = user_id);

-- Categorization Rules Policies
CREATE POLICY "Users can view own rules" ON categorization_rules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own rules" ON categorization_rules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rules" ON categorization_rules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own rules" ON categorization_rules FOR DELETE USING (auth.uid() = user_id);

-- Pomodoro Sessions Policies
CREATE POLICY "Users can view own sessions" ON pomodoro_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own sessions" ON pomodoro_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON pomodoro_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON pomodoro_sessions FOR DELETE USING (auth.uid() = user_id);

-- Tasks Policies
CREATE POLICY "Users can view own tasks" ON tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);

-- Habits Policies
CREATE POLICY "Users can view own habits" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own habits" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habits" ON habits FOR DELETE USING (auth.uid() = user_id);

-- Habit Completions Policies
CREATE POLICY "Users can view own completions" ON habit_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own completions" ON habit_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own completions" ON habit_completions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own completions" ON habit_completions FOR DELETE USING (auth.uid() = user_id);

-- AI Conversations Policies
CREATE POLICY "Users can view own conversations" ON ai_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own conversations" ON ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON ai_conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON ai_conversations FOR DELETE USING (auth.uid() = user_id);

-- AI Recommendations Policies
CREATE POLICY "Users can view own recommendations" ON ai_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own recommendations" ON ai_recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recommendations" ON ai_recommendations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own recommendations" ON ai_recommendations FOR DELETE USING (auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Productivity Scores Policies
CREATE POLICY "Users can view own scores" ON productivity_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own scores" ON productivity_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scores" ON productivity_scores FOR UPDATE USING (auth.uid() = user_id);

-- Dashboard Layouts Policies
CREATE POLICY "Users can view own layout" ON dashboard_layouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own layout" ON dashboard_layouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own layout" ON dashboard_layouts FOR UPDATE USING (auth.uid() = user_id);

-- ==============================================
-- FUNCTIONS & TRIGGERS
-- ==============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_habits_updated_at BEFORE UPDATE ON habits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dashboard_layouts_updated_at BEFORE UPDATE ON dashboard_layouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate time entry duration
CREATE OR REPLACE FUNCTION calculate_time_entry_duration()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.end_time IS NOT NULL AND NEW.start_time IS NOT NULL THEN
        NEW.duration = EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time))::INTEGER;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_duration_trigger
BEFORE INSERT OR UPDATE ON time_entries
FOR EACH ROW EXECUTE FUNCTION calculate_time_entry_duration();

-- Function to update habit streaks
CREATE OR REPLACE FUNCTION update_habit_streak()
RETURNS TRIGGER AS $$
DECLARE
    yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    completed_yesterday BOOLEAN;
BEGIN
    -- Check if habit was completed yesterday
    SELECT EXISTS(
        SELECT 1 FROM habit_completions
        WHERE habit_id = NEW.habit_id
        AND DATE(completed_at) = yesterday
    ) INTO completed_yesterday;

    -- Update streak
    UPDATE habits
    SET
        current_streak = CASE
            WHEN completed_yesterday THEN current_streak + 1
            ELSE 1
        END,
        longest_streak = GREATEST(longest_streak, CASE
            WHEN completed_yesterday THEN current_streak + 1
            ELSE 1
        END),
        total_completions = total_completions + 1
    WHERE id = NEW.habit_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_streak_trigger
AFTER INSERT ON habit_completions
FOR EACH ROW EXECUTE FUNCTION update_habit_streak();

-- ==============================================
-- DEFAULT DATA
-- ==============================================

-- Insert default activity categories (will be created for each new user via app logic)
-- Examples of categories to be seeded:
-- Work - Coding, Work - Meetings, Learning, Exercise, Break, Social, Entertainment, etc.

-- ==============================================
-- VIEWS for Analytics
-- ==============================================

-- View for daily productivity summary
CREATE OR REPLACE VIEW daily_productivity_summary AS
SELECT
    te.user_id,
    DATE(te.start_time) as date,
    SUM(CASE WHEN ac.is_productive THEN te.duration ELSE 0 END) / 60.0 as productive_minutes,
    SUM(CASE WHEN NOT ac.is_productive THEN te.duration ELSE 0 END) / 60.0 as distraction_minutes,
    COUNT(DISTINCT ps.id) as pomodoros_completed,
    COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as tasks_completed,
    COUNT(DISTINCT hc.id) as habits_completed
FROM time_entries te
LEFT JOIN activity_categories ac ON te.category_id = ac.id
LEFT JOIN pomodoro_sessions ps ON ps.user_id = te.user_id AND DATE(ps.start_time) = DATE(te.start_time)
LEFT JOIN tasks t ON t.user_id = te.user_id AND DATE(t.completed_at) = DATE(te.start_time)
LEFT JOIN habit_completions hc ON hc.user_id = te.user_id AND DATE(hc.completed_at) = DATE(te.start_time)
GROUP BY te.user_id, DATE(te.start_time);

-- ==============================================
-- NOTES
-- ==============================================
-- To use this schema:
-- 1. Create a Supabase project
-- 2. Run this SQL in the Supabase SQL editor
-- 3. Enable authentication providers in Supabase settings
-- 4. Copy your project URL and anon key to .env file
-- 5. The app will handle default category creation on first login
