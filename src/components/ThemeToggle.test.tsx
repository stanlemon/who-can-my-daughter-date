import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  let matchMediaMock: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    matchMediaMock = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock))
  })

  it('renders a button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows moon icon in light mode', () => {
    matchMediaMock.matches = false
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('shows sun icon in dark mode', () => {
    matchMediaMock.matches = true
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup()
    matchMediaMock.matches = false
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')

    await user.click(button)

    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('updates document class when theme changes', async () => {
    const user = userEvent.setup()
    matchMediaMock.matches = false
    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
