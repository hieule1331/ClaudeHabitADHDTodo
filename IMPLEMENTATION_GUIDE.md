# Implementation Guide

This guide provides step-by-step instructions for implementing the remaining features of the ADHD Productivity Dashboard.

## Current Status

### ✅ Completed (Phase 1: Foundation)
- [x] React + TypeScript + Vite project setup
- [x] Tailwind CSS with ADHD-friendly design system
- [x] Complete page layouts and routing
- [x] TypeScript type definitions
- [x] Database schema design
- [x] UI components for all main features
- [x] Responsive navigation and layout

### 🚧 Next Steps (Phase 2: Core Features)

#### 1. Supabase Integration

**Priority: HIGH**

```bash
# Already included in package.json
npm install
```

Setup steps:
1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `database/schema.sql` in Supabase SQL Editor
3. Copy `.env.example` to `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
4. The Supabase client is already configured in `src/lib/supabase.ts`

#### 2. Authentication System

**Files to implement:**
- `src/pages/Auth.tsx` - Login/signup page
- `src/hooks/useAuth.ts` - Authentication hook
- `src/components/ProtectedRoute.tsx` - Route protection

**Key features:**
- Email/password authentication
- OAuth providers (Google, GitHub)
- User profile creation on signup
- Session management
- Password reset flow

**Implementation outline:**
```typescript
// src/hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return { user, loading, signIn, signUp, signOut }
}
```

#### 3. Time Tracking Implementation

**Files to implement:**
- `src/hooks/useTimeTracking.ts` - Time tracking logic
- `src/hooks/useCategories.ts` - Category management
- `src/store/timeStore.ts` - Zustand store for active timer

**Key features:**
- Start/stop timer for activities
- Manual time entry
- Activity categorization
- Daily timeline view
- Category statistics

**Implementation outline:**
```typescript
// src/hooks/useTimeTracking.ts
export function useTimeTracking() {
  const startTracking = async (activityName: string, categoryId: string) => {
    const { data, error } = await supabase
      .from('time_entries')
      .insert({
        user_id: user.id,
        activity_name: activityName,
        category_id: categoryId,
        start_time: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const stopTracking = async (entryId: string) => {
    const { error } = await supabase
      .from('time_entries')
      .update({
        end_time: new Date().toISOString(),
      })
      .eq('id', entryId)

    if (error) throw error
  }

  // Add more functions...
}
```

#### 4. Task Management Functionality

**Files to implement:**
- `src/hooks/useTasks.ts` - Task CRUD operations
- `src/components/TaskForm.tsx` - Task creation/edit form
- `src/components/BrainDump.tsx` - Quick capture modal

**Key features:**
- Quick brain dump capture
- Task CRUD operations
- Priority and energy level filtering
- Eisenhower Matrix view
- Due date management
- Subtasks support

#### 5. Habit Tracking with Streaks

**Files to implement:**
- `src/hooks/useHabits.ts` - Habit operations
- `src/components/HabitCard.tsx` - Individual habit display
- `src/utils/streakCalculator.ts` - Streak calculation logic

**Key features:**
- Habit check-in
- Streak calculation (handled by DB trigger)
- Habit calendar visualization
- Reward points system
- Category filtering

#### 6. Pomodoro Timer with Audio

**Files to implement:**
- `src/hooks/usePomodoro.ts` - Timer logic
- `src/utils/audioPlayer.ts` - Sound management
- `public/sounds/` - Audio files for timer

**Key features:**
- Customizable work/break durations
- Browser notification on completion
- Ambient sound playback
- Session history
- Task linking

### 🎨 Phase 3: Intelligence Layer

#### 7. AI Coaching Integration

**Files to implement:**
- `src/lib/ai/gemini.ts` - Gemini integration
- `src/lib/ai/openai.ts` - OpenAI integration
- `src/lib/ai/ollama.ts` - Ollama integration
- `src/lib/ai/index.ts` - Unified AI interface
- `src/hooks/useAI.ts` - AI coaching hook

**Implementation outline:**
```typescript
// src/lib/ai/index.ts
export interface AIProvider {
  generateResponse(prompt: string, context: AIContext): Promise<string>
}

export async function getAIResponse(
  provider: 'gemini' | 'chatgpt' | 'ollama',
  prompt: string,
  context: AIContext
): Promise<string> {
  const aiProvider = getProvider(provider)
  return aiProvider.generateResponse(prompt, context)
}
```

#### 8. Pattern Recognition

**Files to implement:**
- `src/utils/analytics/patterns.ts` - Pattern detection
- `src/utils/analytics/correlations.ts` - Correlation analysis
- `src/hooks/useAnalytics.ts` - Analytics hook

**Key features:**
- Identify peak productivity hours
- Habit-productivity correlations
- Focus quality trends
- Weekly/monthly comparisons

#### 9. Smart Categorization

**Files to implement:**
- `src/utils/categorization.ts` - Auto-categorization logic
- `src/hooks/useRules.ts` - Rule management

**Key features:**
- Pattern matching for activities
- Machine learning-ready structure
- User feedback integration
- Confidence scoring

### 🚀 Phase 4: Advanced Features

#### 10. Browser Extension

**New directory: `extension/`**

Features:
- Automatic website/app tracking
- Quick capture from any page
- Timer controls in toolbar
- Activity detection

#### 11. Mobile Optimization

**Key improvements:**
- Touch-friendly interfaces
- Offline support with service workers
- Progressive Web App (PWA) configuration
- Mobile-specific gestures

#### 12. Advanced Analytics

**Files to implement:**
- `src/components/charts/` - Custom chart components
- Integration with recharts library
- Export to CSV/PDF

## Testing Strategy

### Unit Tests
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Test files to create:
- `src/utils/__tests__/streakCalculator.test.ts`
- `src/hooks/__tests__/useTimeTracking.test.ts`
- `src/components/__tests__/TaskCard.test.tsx`

### Integration Tests
- Auth flow testing
- Timer accuracy testing
- Database operations testing

### E2E Tests
```bash
npm install --save-dev playwright
```

Critical user journeys:
1. Sign up → Create habit → Complete habit → Check streak
2. Start timer → Track activity → View analytics
3. Brain dump → Prioritize → Complete task

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const Analytics = lazy(() => import('./pages/Analytics'))
const AICoach = lazy(() => import('./pages/AICoach'))
```

### Database Optimization
- Use Supabase real-time subscriptions for live updates
- Implement pagination for large datasets
- Cache frequently accessed data

### Bundle Size
```bash
npm run build
# Analyze with
npx vite-bundle-visualizer
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## Environment Variables for Production

Required variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional:
- `VITE_ENABLE_ANALYTICS` (true/false)
- `VITE_SENTRY_DSN` (error tracking)

## Security Checklist

- [ ] API keys encrypted in database
- [ ] Row Level Security enabled on all tables
- [ ] Input validation on all forms
- [ ] XSS protection (React handles most)
- [ ] CSRF protection (Supabase handles)
- [ ] Rate limiting on AI endpoints
- [ ] Secure password requirements
- [ ] OAuth properly configured

## Accessibility Checklist

- [ ] Keyboard navigation works everywhere
- [ ] Screen reader friendly labels
- [ ] ARIA attributes where needed
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion respects preference
- [ ] Alt text on all images

## Next Immediate Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test the build:**
   ```bash
   npm run dev
   ```

3. **Set up Supabase:**
   - Create project
   - Run schema
   - Configure .env

4. **Implement authentication:**
   - Create Auth page
   - Add useAuth hook
   - Protect routes

5. **Start with one feature:**
   - Choose time tracking OR task management
   - Implement CRUD operations
   - Add to dashboard

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [ADHD Design Principles](https://adhd-design.com)

## Support

For implementation questions:
1. Check existing code comments
2. Review TypeScript types in `src/types/index.ts`
3. Reference database schema in `database/schema.sql`
4. Open an issue on GitHub

---

**Remember:** Build iteratively! Don't try to implement everything at once. Start with authentication, then add one feature at a time, testing thoroughly before moving to the next.
