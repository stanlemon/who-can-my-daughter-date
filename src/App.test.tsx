import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    const matchMediaMock = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock))
  })

  it('renders the theme toggle button', () => {
    render(<App />)
    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Who can my daughter date?')
  })

  it('renders the subtitle', () => {
    render(<App />)
    expect(screen.getByText('Answer these questions to find out...')).toBeInTheDocument()
  })

  it('renders the header element', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders the questionnaire', () => {
    render(<App />)
    // Check for one of the questions
    expect(screen.getByText('Their football team is')).toBeInTheDocument()
    expect(screen.getByText('They think pineapple belongs on pizza')).toBeInTheDocument()
  })

  it('renders main content area', () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  describe('Overlay behavior', () => {
    it('should show overlay when immediate disqualifier is selected', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Select Browns (immediate disqualifier)
      const teamSelect = screen.getByLabelText(/Their football team is/i)
      await user.selectOptions(teamSelect, 'browns')

      // Overlay should appear with the disqualification message
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByText(/fundamental character flaw/i)).toBeInTheDocument()
      })
    })

    it('should hide overlay when dismissed', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Select Browns (immediate disqualifier)
      const teamSelect = screen.getByLabelText(/Their football team is/i)
      await user.selectOptions(teamSelect, 'browns')

      // Wait for overlay to appear
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Click dismiss button
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      await user.click(dismissButton)

      // Overlay should be hidden
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })

    it('should not re-show same overlay after dismissal', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Select Browns (immediate disqualifier)
      const teamSelect = screen.getByLabelText(/Their football team is/i)
      await user.selectOptions(teamSelect, 'browns')

      // Wait for overlay
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Dismiss overlay
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      await user.click(dismissButton)

      // Wait for overlay to disappear
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      // Answer another question
      const pineappleNo = screen.getByLabelText('No', { selector: 'input[name="pineapple_pizza"]' })
      await user.click(pineappleNo)

      // Overlay should NOT reappear (same disqualifier message)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should show new overlay for different disqualifier', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Select Browns (immediate disqualifier)
      const teamSelect = screen.getByLabelText(/Their football team is/i)
      await user.selectOptions(teamSelect, 'browns')

      // Wait for overlay
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByText(/fundamental character flaw/i)).toBeInTheDocument()
      })

      // Dismiss overlay
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      await user.click(dismissButton)

      // Wait for overlay to disappear
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      // Change to a different immediate disqualifier
      await user.selectOptions(teamSelect, 'ravens')

      // New overlay should appear
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
        expect(screen.getByText(/Being a Baltimore Ravens fan/i)).toBeInTheDocument()
      })
    })

    it('should dismiss overlay with Escape key', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Select Browns (immediate disqualifier)
      const teamSelect = screen.getByLabelText(/Their football team is/i)
      await user.selectOptions(teamSelect, 'browns')

      // Wait for overlay
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Press Escape key
      await user.keyboard('{Escape}')

      // Overlay should be hidden
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })
})
