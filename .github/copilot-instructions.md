# GitHub Copilot Instructions - Who Can My Daughter Date?

## Project Overview

A frontend-only web application built with Vite, React 19, and TypeScript that evaluates dating compatibility through a humorous questionnaire system. Users answer questions about football team preferences, food opinions, and religious affiliation, and the app determines approval status based on configurable rules.

**Tech Stack:** Vite 7.x, React 19.x, TypeScript (strict), Vitest, ESLint, Prettier, Lucide React icons, Cloudflare Pages deployment

**Node Version:** 22.20.0 (see .nvmrc)

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run lint         # Check linting
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## Code Guidelines

### TypeScript Standards
- Strict mode enabled - no `any` types (use `unknown` if needed)
- Explicit return types for functions
- Use interfaces for object shapes

### Component Guidelines
- Functional components with hooks (useState, useEffect, etc.)
- Props typed with TypeScript interfaces
- Keep components small and focused
- CSS Modules or plain CSS co-located with components

### Testing Requirements
- Every component must have tests (Component.tsx → Component.test.tsx)
- Use React Testing Library with Vitest
- Test user interactions and rendered output
- Avoid testing implementation details
- Prefer `screen.getByRole()` for accessibility

### Code Style
- Components: PascalCase (`MyComponent.tsx`)
- Functions/variables: camelCase (`calculateAge`)
- Constants: UPPER_SNAKE_CASE (`MAX_AGE`)
- CSS classes: kebab-case (`my-component`)
- 2 spaces indentation, single quotes, no semicolons
- Max line length: 100 characters

### Icons
- Use Lucide React for all icons (tree-shakeable)
- Import only needed icons: `import { Heart } from 'lucide-react'`
- Browse: https://lucide.dev/icons/

## Architecture

### Questionnaire System
The app uses a config-driven questionnaire evaluation system:

- **Configuration** (`src/config/questionnaire.ts`): Questions and evaluation rules
- **Evaluator** (`src/utils/evaluator.ts`): QuestionnaireEvaluator class processes answers
- **Components**:
  - `App`: Main container, manages evaluation result state
  - `Questionnaire`: Manages answer collection, triggers evaluation
  - `Question`: Renders individual questions (select or radio)
  - `DisqualifiedOverlay`: Full-screen red X for immediate rejections
  - `ResultSummary`: Sticky bottom banner for verdicts

### File Structure
```
src/
├── components/      # Reusable UI components
├── config/         # Question and rule configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (evaluator)
├── test/           # Test setup and utilities
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Important Rules

### What to Do
✅ Write tests for all new components and features
✅ Run `npm run lint` and `npm test` before committing
✅ Use existing ecosystem tools (npm install, scaffolding tools)
✅ Keep changes minimal and focused
✅ Support both light and dark mode
✅ Ensure accessibility (ARIA labels, semantic HTML)

### What Not to Do
❌ Don't add new linting/testing tools unless necessary
❌ Don't remove or modify working tests
❌ Don't use `any` types in TypeScript
❌ Don't add comments unless matching existing style
❌ Don't add new libraries unless absolutely necessary
❌ Don't add backend functionality (frontend-only app)

## Deployment

**Platform:** Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Auto-deploy on push to main (GitHub integration)

## Quick Reference

- **React docs:** https://react.dev/
- **Vite docs:** https://vite.dev/
- **Vitest docs:** https://vitest.dev/
- **TypeScript docs:** https://www.typescriptlang.org/
- **Lucide icons:** https://lucide.dev/

## Example Patterns

### Adding a New Component

1. Create `src/components/MyComponent.tsx`
2. Create `src/components/MyComponent.test.tsx`
3. Create `src/components/MyComponent.css` (if needed)
4. Write comprehensive tests
5. Import and use in parent component

### Test Pattern Example

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

### Component Pattern Example

```typescript
interface MyComponentProps {
  title: string
  onAction: () => void
}

export default function MyComponent({ title, onAction }: MyComponentProps): JSX.Element {
  return (
    <div className="my-component">
      <h1>{title}</h1>
      <button onClick={onAction}>Click Me</button>
    </div>
  )
}
```

## Workflow

1. Make changes in a feature branch
2. Write tests (TDD encouraged)
3. Implement feature
4. Run: `npm test && npm run lint && npm run type-check && npm run build`
5. Commit and push
6. CI validates: lint → type-check → test → build
7. Merge when CI passes
