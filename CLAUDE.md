# Claude Code Instructions - Who Can My Daughter Date?

## Project Overview

A frontend-only web application built with Vite, React 19, and TypeScript that evaluates dating compatibility through a humorous questionnaire system. Users answer questions about football team preferences, food opinions, and religious affiliation, and the app determines approval status based on configurable rules. This project uses modern best practices and is deployed to Cloudflare Pages.

### Application Purpose

Answer a series of questions to determine if someone is an acceptable dating candidate. The system supports:
- Immediate disqualifications (e.g., Cleveland Browns fans, pineapple pizza enthusiasts)
- Combination rules (e.g., Steelers fans get conditional approval, but pineapple + ketchup together is unforgivable)
- Config-driven questions and evaluation logic
- Visual feedback (red X overlay for hard nos, color-coded summary for other verdicts)

## Tech Stack

- **Build Tool**: Vite 7.x
- **Framework**: React 19.x
- **Language**: TypeScript (strict mode enabled)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint (flat config) + Prettier
- **Icons**: Lucide React (tree-shakeable)
- **Runtime**: Node.js 22.20.0 (see .nvmrc)
- **Deployment**: Cloudflare Pages

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run lint         # Check linting
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## Architecture & Patterns

### Frontend-Only Application
- No backend server required
- All logic runs in the browser
- Static deployment to Cloudflare Pages
- State management using React hooks (useState, useEffect, etc.)

### Questionnaire System Architecture

The app is built around a config-driven questionnaire evaluation system:

#### Data Model (src/types/questions.ts)
- **Question**: Defines question text, type (select/radio), and answer options
- **AnswerOption**: Each option can be marked as immediate disqualifier or have tags
- **EvaluationRule**: Rules that match answer combinations to verdicts
- **EvaluationResult**: Final verdict with message and display type

#### Configuration (src/config/questionnaire.ts)
- **Questions Array**: Defines all questions (currently 4):
  1. NFL team preference (dropdown)
  2. Pineapple on pizza opinion (radio)
  3. Ketchup on hot dog opinion (radio)
  4. Lutheran affiliation (radio)
- **Rules Array**: Priority-ordered rules that evaluate answer combinations
  - Higher priority rules checked first
  - Rules can match specific values or tags
  - Support for complex combinations (AND logic)

#### Evaluation Engine (src/utils/evaluator.ts)
- **QuestionnaireEvaluator class**: Processes answers against rules
- **Immediate Disqualifier Check**: First pass - any answer marked immediate stops evaluation
- **Rule Matching**: Evaluates rules in priority order, returns first match
- **Verdict Types**:
  - `immediate_no` - Shows red X overlay
  - `rejected` - Shows red summary banner
  - `conditional` - Shows yellow/orange summary
  - `approved` - Shows green summary

#### Component Architecture
- **App**: Main container, manages evaluation result state
- **Questionnaire**: Manages answer collection, triggers evaluation on change
- **Question**: Renders individual questions (select or radio)
- **DisqualifiedOverlay**: Full-screen red X for immediate rejections
- **ResultSummary**: Sticky bottom banner for final verdicts

#### Data Flow
1. User selects answer → Question component calls onChange
2. Questionnaire updates answer map in state
3. useEffect triggers evaluation when all questions answered
4. Evaluator checks immediate disqualifiers first
5. If none, evaluates rules in priority order
6. Result passed to App via callback
7. App renders overlay (immediate) OR summary banner (other)

### Component Structure (General Guidelines)
- Functional components with TypeScript
- Props typed with TypeScript interfaces
- Keep components small and focused
- Use composition over inheritance

### Styling Approach
- CSS Modules or plain CSS files co-located with components
- Support both light and dark mode
- Mobile-first responsive design
- Use CSS custom properties for theming

### Icon Usage
- Use Lucide React for all icons
- Import only the icons you need (tree-shaking)
- Example: `import { Heart, Users } from 'lucide-react'`
- Browse icons at: https://lucide.dev/icons/

## Testing Standards

### Write Tests for Everything
- Every component should have a test file (e.g., `App.tsx` → `App.test.tsx`)
- Use React Testing Library for component tests
- Test user interactions and rendered output
- Avoid testing implementation details

### Testing Best Practices
- **Avoid mocks when possible** - Test real implementations
- Use `screen.getByRole()` for accessibility and better tests
- Test what users see and interact with
- Integration tests preferred over unit tests
- Keep tests simple and readable

### Example Test Pattern
```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders expected content', () => {
    render(<MyComponent />)
    expect(screen.getByRole('heading')).toHaveTextContent('Expected Text')
  })
})
```

## Code Quality Requirements

### TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Explicit return types for functions
- Interface over type for object shapes

### Linting & Formatting
- ESLint must pass before committing
- Prettier for consistent formatting
- Run `npm run lint:fix` to auto-fix issues
- VSCode auto-formats on save

### File Organization
```
src/
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── test/           # Test setup and utilities
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Git Workflow

### Commits
- Write clear, descriptive commit messages
- Run tests and linting before committing
- Keep commits focused and atomic

### CI/CD
- GitHub Actions runs on all pushes to main and PRs
- Pipeline checks: lint → type-check → test → build
- All checks must pass before merging

## Cloudflare Pages Deployment

### Build Configuration
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 22.20.0 (set via NODE_VERSION env var)

### Deployment Methods
1. **GitHub Integration** (recommended): Auto-deploy on push to main
2. **Wrangler CLI**: Manual deployment with `wrangler pages deploy dist`

### Configuration File
- `wrangler.toml` contains Cloudflare Pages settings
- Output directory is set to `dist`

## Important Notes

### Node Version Management
- **Always use Node 22.20.0** specified in `.nvmrc`
- GitHub Actions reads from `.nvmrc` automatically
- Use `nvm use` locally to switch versions

### Dependencies
- Keep dependencies up to date with latest stable versions
- Use exact versions in package.json for consistency
- Prefer packages with TypeScript support

### Documentation
- Update README when adding major features
- Document complex logic with comments
- Keep CLAUDE.md (this file) current with architectural decisions

### Performance
- Vite provides fast HMR and optimized builds
- Lucide React icons are tree-shaken automatically
- Code splitting happens automatically with dynamic imports

## Common Tasks

### Adding a New Component
1. Create component file: `src/components/MyComponent.tsx`
2. Create test file: `src/components/MyComponent.test.tsx`
3. Create styles: `src/components/MyComponent.css` (if needed)
4. Write comprehensive tests
5. Import and use in parent component

### Adding New Icons
1. Browse available icons: https://lucide.dev/icons/
2. Import from lucide-react: `import { IconName } from 'lucide-react'`
3. Use in JSX: `<IconName size={24} />`
4. Tree-shaking handles the rest automatically

### Debugging
- Use browser DevTools and React DevTools
- Vitest UI for debugging tests: `npm run test:ui`
- TypeScript errors show in IDE and `npm run type-check`

## Code Style

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`)
- Functions/variables: camelCase (`calculateAge`)
- Constants: UPPER_SNAKE_CASE (`MAX_AGE`)
- CSS classes: kebab-case (`my-component`)

### Formatting Rules
- 2 spaces for indentation
- Single quotes for strings
- No semicolons
- Trailing commas in ES5
- Max line length: 100 characters
- See `.prettierrc` for full configuration

## Project-Specific Context

### Application Purpose
A humorous questionnaire that evaluates dating compatibility based on personal preferences and opinions. Users answer questions about:
- Sports team allegiance (NFL teams)
- Food opinions (pineapple on pizza, ketchup on hot dogs)
- Religious affiliation (Lutheran)

The system provides immediate feedback for deal-breakers and nuanced evaluations for complex combinations of answers.

### Current Features
- 4 configurable questions with immediate disqualifier support
- Priority-based rule engine for combination logic
- Immediate visual feedback (red X overlay for hard nos)
- Color-coded verdict summaries (green/yellow/red)
- Fully responsive design with dark mode support
- Accessibility features (ARIA labels, reduced motion support)

### Future Features (Potential)
- Additional questions and answer types
- More complex rule combinations
- Share results functionality
- Custom questionnaire builder
- Multiple questionnaire themes
- Results history/tracking

### Non-Goals
- No user accounts or authentication
- No backend/database
- No personal data collection
- No complex state management (Redux, etc.) - use React hooks

## Getting Help

- Vite docs: https://vite.dev/
- React docs: https://react.dev/
- Vitest docs: https://vitest.dev/
- Lucide icons: https://lucide.dev/
- TypeScript docs: https://www.typescriptlang.org/
- Cloudflare Pages: https://pages.cloudflare.com/

## Development Workflow Summary

1. Create feature branch
2. Write tests first (TDD encouraged)
3. Implement feature
4. Ensure all tests pass: `npm test`
5. Check linting: `npm run lint`
6. Check types: `npm run type-check`
7. Build locally: `npm run build`
8. Commit changes
9. Push to GitHub (CI runs automatically)
10. Merge when CI passes
