# Contributing to ADHD Productivity Dashboard

Thank you for your interest in contributing to the ADHD Productivity Dashboard! This project is designed specifically for people with ADHD, and we welcome contributions that maintain this focus.

## 🎯 Core Principles

When contributing, please keep these ADHD-friendly design principles in mind:

1. **Reduce Cognitive Load**: Simplify interfaces, use clear visual hierarchy
2. **Provide Immediate Feedback**: Users should see results of their actions quickly
3. **Minimize Context Switching**: Keep related features together
4. **Progressive Disclosure**: Don't overwhelm with all options at once
5. **Flexible Structure**: Accommodate variable energy and non-linear workflows
6. **Forgiveness**: Make it easy to undo, edit, and recover from mistakes

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/adhd-productivity-dashboard.git
   cd adhd-productivity-dashboard
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add TypeScript types
   - Keep components focused and small

3. **Test your changes**
   ```bash
   npm run build  # Ensure no build errors
   npm run lint   # Check for linting issues
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 Design Guidelines

### Visual Design
- Use the existing color system (primary, success, warning, danger)
- Maintain consistent spacing using Tailwind's spacing scale
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` preferences
- Ensure color contrast meets WCAG AA standards

### Component Design
- Components should be self-contained and reusable
- Use TypeScript for all new components
- Props should be well-typed with interfaces
- Keep components under 300 lines when possible

Example:
```typescript
interface TaskCardProps {
  title: string
  priority: TaskPriority
  onComplete: () => void
}

export function TaskCard({ title, priority, onComplete }: TaskCardProps) {
  // Component implementation
}
```

### ADHD-Specific Features
When adding new features, consider:
- **Is it overwhelming?** Can we hide complexity behind progressive disclosure?
- **Is there immediate feedback?** Does the user know their action succeeded?
- **Is it forgiving?** Can mistakes be easily corrected?
- **Does it reduce friction?** Are there unnecessary steps we can eliminate?

## 🧪 Testing

We value quality and reliability:

1. **Manual Testing**
   - Test your feature in the browser
   - Check responsive design (mobile, tablet, desktop)
   - Test with keyboard navigation
   - Verify screen reader compatibility

2. **Automated Testing** (coming soon)
   ```bash
   npm run test
   ```

## 📚 Documentation

- Update README.md if adding new features
- Add JSDoc comments to complex functions
- Update TypeScript types in `src/types/index.ts`
- Document new environment variables in `.env.example`

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: What happened vs. what you expected
2. **Steps to Reproduce**: Detailed steps to recreate the issue
3. **Environment**: Browser, OS, device type
4. **Screenshots**: If applicable
5. **Error Messages**: Console errors, if any

Use the bug report template when creating an issue.

## 💡 Feature Requests

We love new ideas! When suggesting features:

1. **Explain the problem**: What pain point does this solve?
2. **ADHD relevance**: How does this help ADHD users specifically?
3. **Proposed solution**: Your idea for implementation
4. **Alternatives**: Other approaches you've considered
5. **Examples**: Similar features in other apps

## 🔍 Code Review Process

All submissions require review. We'll look for:

- ADHD-friendly design principles
- Code quality and readability
- TypeScript type safety
- Accessibility compliance
- Performance considerations
- Security best practices

## 🌟 Areas Where We Need Help

Current priorities:
- [ ] Authentication implementation
- [ ] Real-time Supabase integration
- [ ] Pomodoro timer audio/notifications
- [ ] AI coaching integration
- [ ] Mobile responsiveness improvements
- [ ] Accessibility testing
- [ ] Documentation and guides
- [ ] Browser extension development

## 📞 Questions?

- Open a discussion on GitHub
- Check existing issues and PRs
- Review the IMPLEMENTATION_GUIDE.md
- Read through the codebase comments

## 🙏 Thank You!

Every contribution, no matter how small, helps make this tool better for the ADHD community. We appreciate your time and effort!

---

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of:
- Neurodiversity (ADHD, autism, etc.)
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Being respectful and inclusive
- Accepting constructive feedback gracefully
- Focusing on what's best for the community
- Showing empathy toward others
- Being patient with different communication styles

**Unacceptable behavior includes:**
- Harassment, trolling, or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

### Enforcement

Instances of unacceptable behavior can be reported by opening an issue or contacting the maintainers. All complaints will be reviewed and investigated promptly and fairly.

---

Built with ❤️ for the ADHD community
