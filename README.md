# ADHD Productivity Dashboard

An ADHD-optimized all-in-one productivity dashboard with AI coaching, time tracking, task management, habit tracking, and Pomodoro timer.

## 🎯 Features

### Core Functionality
- **Time Tracking**: Manual activity logging with smart categorization
- **Task Management**: ADHD-friendly task organization with Eisenhower Matrix and energy-based views
- **Habit Tracking**: Streak-based habit building with gamification elements
- **Pomodoro Timer**: Customizable focus sessions with ambient sounds
- **AI Coaching**: Personalized productivity insights powered by Gemini/ChatGPT/Ollama
- **Analytics**: Comprehensive productivity metrics and pattern recognition

### ADHD-Specific Optimizations
- **Brain Dump Interface**: Quick capture without overthinking
- **Energy-Based Organization**: Tasks categorized by required mental energy
- **Flexible Structure**: Accommodates variable energy and non-linear workflows
- **Progressive Disclosure**: Features revealed gradually to prevent overwhelm
- **Visual Hierarchy**: Clear typography and spacing reduce cognitive load
- **Focus Mode**: Distraction-free interface for deep work
- **Reduced Motion**: Subtle animations that aid focus rather than distract

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend and database)
- API key for AI provider (Gemini/ChatGPT/Ollama)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/adhd-productivity-dashboard.git
   cd adhd-productivity-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**

   Run the SQL schema in your Supabase project:
   ```bash
   # See database/schema.sql for the complete schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TimeTracking.tsx # Time tracking interface
│   ├── Tasks.tsx       # Task management
│   ├── Habits.tsx      # Habit tracking
│   ├── Pomodoro.tsx    # Pomodoro timer
│   ├── Analytics.tsx   # Analytics dashboard
│   ├── AICoach.tsx     # AI coaching interface
│   └── Settings.tsx    # User settings
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── store/              # State management (Zustand)
├── lib/                # Third-party integrations
│   └── supabase.ts     # Supabase client
└── styles/             # CSS and styling
    └── index.css       # Global styles with Tailwind
```

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- **users**: User accounts and authentication
- **user_profiles**: ADHD-specific preferences and settings
- **activity_categories**: Time tracking categories
- **time_entries**: Activity log entries
- **categorization_rules**: Auto-categorization rules
- **pomodoro_sessions**: Focus session history
- **tasks**: Task management with priority and energy levels
- **habits**: Habit definitions
- **habit_completions**: Daily habit check-ins
- **ai_conversations**: AI coaching chat history
- **ai_recommendations**: AI-generated insights
- **notifications**: User notifications

See `database/schema.sql` for the complete schema with indexes and RLS policies.

## 🎨 Design Philosophy

### ADHD-Friendly Principles

1. **Immediate Feedback**: Quick visual confirmations for actions
2. **Reduced Context Switching**: Unified dashboard minimizes app switching
3. **Flexible Timing**: Customizable pomodoro durations
4. **Visual Hierarchy**: Color-coded priorities and clear typography
5. **Progressive Disclosure**: Features revealed based on user comfort
6. **Forgiveness**: Easy undo and flexible scheduling
7. **External Structure**: AI coaching provides accountability

### Color System

- **Primary (Blue)**: Main actions and navigation
- **Success (Green)**: Completions and positive feedback
- **Warning (Orange)**: Attention needed, high energy
- **Danger (Red)**: Urgent items
- **Purple**: Insights and AI features
- **Gray**: Neutral, low energy

## 🤖 AI Integration

The AI coaching system supports three providers:

### Gemini (Google)
```typescript
// Set in Settings page
AI Provider: Gemini
API Key: your_gemini_api_key
```

### ChatGPT (OpenAI)
```typescript
AI Provider: ChatGPT
API Key: your_openai_api_key
```

### Ollama (Local)
```typescript
AI Provider: Ollama
API Endpoint: http://localhost:11434
```

The AI coach has context of:
- Recent activities and time distribution
- Habit completion patterns
- Task priorities and deadlines
- Productivity trends
- Focus quality metrics

## 📊 Analytics Features

- **Productivity Score**: Daily score based on focus time, tasks completed, and habit consistency
- **Time Distribution**: Category breakdown of time usage
- **Focus Patterns**: Identify peak productivity hours
- **Habit Consistency**: Track habit completion rates
- **Correlation Insights**: Discover patterns (e.g., exercise impact on productivity)
- **Export Options**: CSV, PDF, and JSON export for external analysis

## 🔒 Privacy & Security

- All sensitive data encrypted at rest
- API keys stored with encryption
- Row Level Security (RLS) in Supabase
- No third-party analytics without consent
- Data export and deletion options
- Configurable data retention periods

## 🛠️ Development

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint code
```bash
npm run lint
```

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with React + TypeScript + Vite
- [x] Tailwind CSS with ADHD-friendly design system
- [x] Page layouts and routing
- [x] Type definitions

### Phase 2: Core Features (In Progress)
- [ ] Supabase integration
- [ ] Authentication system
- [ ] Time tracking implementation
- [ ] Task management functionality
- [ ] Habit tracking with streaks
- [ ] Pomodoro timer with audio

### Phase 3: Intelligence Layer
- [ ] AI coaching integration
- [ ] Pattern recognition
- [ ] Smart categorization
- [ ] Personalized recommendations

### Phase 4: Advanced Features
- [ ] Browser extension for automatic tracking
- [ ] Mobile app
- [ ] Team/accountability features
- [ ] Advanced analytics
- [ ] Gamification system

## 🤝 Contributing

Contributions are welcome! This project is designed specifically for ADHD users, so maintaining that focus is critical.

### Guidelines
- Keep features ADHD-friendly (reduce overwhelm, provide structure)
- Maintain visual clarity and hierarchy
- Add animations sparingly and subtly
- Test with reduced motion preferences
- Document new features thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Designed with input from ADHD community
- Inspired by Habitica's gamification approach
- Built with modern web technologies for optimal performance
- AI coaching powered by leading language models

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check existing discussions
- Review the documentation

## 💡 Tips for ADHD Users

1. **Start Small**: Don't try to use all features at once. Begin with the dashboard and one feature.
2. **Brain Dump Daily**: Use quick capture to externalize your thoughts.
3. **Review Weekly**: Check analytics to understand your patterns.
4. **Trust the AI**: Let the AI coach help prioritize when overwhelmed.
5. **Celebrate Wins**: Acknowledge completed tasks and habits, no matter how small.
6. **Adjust Settings**: Customize notification frequency and focus duration to your needs.
7. **Use Energy Levels**: Match tasks to your current energy, not urgency alone.

---

Built with ❤️ for the ADHD community
