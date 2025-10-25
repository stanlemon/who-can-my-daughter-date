# Contributing to Who Can My Daughter Date?

First off, thank you for considering contributing to this project! It's people like you that make this humorous questionnaire application even better.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots** if relevant
- **Include your environment details** (browser, OS, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any examples** of how the enhancement would be used

### Pull Requests

- Fill in the pull request template
- Follow the TypeScript and React coding style used throughout the project
- Include tests for your changes
- Update documentation as needed
- Ensure all tests pass before submitting
- Keep your pull request focused on a single feature or fix

## Development Setup

### Prerequisites

- Node.js 22.20.0 (see `.nvmrc`)
- npm (comes with Node.js)
- nvm (recommended for Node version management)

### Setup Steps

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/who-can-my-daughter-date.git
   cd who-can-my-daughter-date
   ```

3. Install Node.js version:
   ```bash
   nvm install
   nvm use
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Run the dev server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Write tests** for your changes following existing test patterns

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Check linting:**
   ```bash
   npm run lint
   ```

5. **Fix linting issues:**
   ```bash
   npm run lint:fix
   ```

6. **Format code:**
   ```bash
   npm run format
   ```

7. **Type check:**
   ```bash
   npm run type-check
   ```

8. **Build for production:**
   ```bash
   npm run build
   ```

### Before Submitting

Ensure all these pass:
```bash
npm run lint && npm run type-check && npm test && npm run build
```

### Commit Guidelines

- Use clear and meaningful commit messages
- Start the commit message with a capital letter
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 50 characters
- Reference issues and pull requests when relevant

Example:
```
Add pineapple pizza question validation

- Adds proper validation for pizza topping preferences
- Updates tests to cover new edge cases
- Fixes #123
```

## Code Style

This project uses:

- **TypeScript** in strict mode - no `any` types
- **ESLint** for code linting
- **Prettier** for code formatting
- **React 19** with functional components and hooks

### Key Guidelines

- Write tests for all new components and features
- Use TypeScript interfaces for all props and types
- Follow React hooks best practices
- Keep components small and focused
- Use semantic HTML and ARIA labels for accessibility
- Support both light and dark mode
- Ensure responsive design works on all devices

### Testing Standards

- Use Vitest and React Testing Library
- Test user interactions and rendered output
- Avoid testing implementation details
- Prefer `screen.getByRole()` for queries
- Each component should have a corresponding `.test.tsx` file

## Project Structure

```
src/
├── components/      # Reusable UI components
├── config/         # Question and rule configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── test/           # Test setup and utilities
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Questions?

Feel free to open an issue with the label "question" if you have any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
