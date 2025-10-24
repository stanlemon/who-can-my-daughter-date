# Who Can My Daughter Date?

A modern web application built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 22.20.0 (see `.nvmrc`)
- npm (comes with Node.js)
- nvm (recommended for Node version management)

## Getting Started

### Install Node.js version

Using nvm:

```bash
nvm install
nvm use
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Testing

Tests are written using Vitest and React Testing Library. All components should have comprehensive test coverage.

Run tests:
```bash
npm test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Cloudflare Pages

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to a GitHub repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project" and connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
   - **Node version**: Set environment variable `NODE_VERSION=22.20.0`
5. Click "Save and Deploy"

Cloudflare Pages will automatically deploy on every push to your main branch.

### Option 2: Deploy via Wrangler CLI

Install Wrangler:
```bash
npm install -g wrangler
```

Login to Cloudflare:
```bash
wrangler login
```

Deploy:
```bash
npm run build
wrangler pages deploy dist --project-name=who-can-my-daughter-date
```

## CI/CD

GitHub Actions workflow is configured to:
- Run linting
- Run type checking
- Run tests
- Build the application
- Upload build artifacts

The workflow runs on every push to `main` and on pull requests.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── public/                 # Static assets
├── src/
│   ├── test/
│   │   └── setup.ts       # Test setup and configuration
│   ├── App.tsx            # Main App component
│   ├── App.css            # App component styles
│   ├── App.test.tsx       # App component tests
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .nvmrc                 # Node version specification
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite and Vitest configuration
├── wrangler.toml          # Cloudflare Pages configuration
└── package.json           # Project dependencies and scripts
```

## Code Quality

The project is configured with:
- **TypeScript strict mode** for maximum type safety
- **ESLint** with recommended rules for React and TypeScript
- **Prettier** for consistent code formatting
- **Vitest** for fast unit testing
- **React Testing Library** for component testing best practices

## Development Guidelines

- Write tests for all new components and features
- Run `npm run lint` before committing
- Use `npm run format` to format code
- Ensure `npm run type-check` passes
- Follow React best practices and hooks guidelines
