import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DisqualifiedOverlay } from './DisqualifiedOverlay'

describe('DisqualifiedOverlay', () => {
  it('renders the overlay', () => {
    render(<DisqualifiedOverlay message="Test message" />)

    const overlay = screen.getByRole('alert')
    expect(overlay).toBeInTheDocument()
  })

  it('displays ABSOLUTELY NOT title', () => {
    render(<DisqualifiedOverlay message="Test message" />)

    expect(screen.getByText('ABSOLUTELY NOT')).toBeInTheDocument()
  })

  it('displays the provided message', () => {
    const message = 'Cleveland Browns is a deal-breaker.'
    render(<DisqualifiedOverlay message={message} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('has appropriate ARIA attributes for accessibility', () => {
    render(<DisqualifiedOverlay message="Test" />)

    const overlay = screen.getByRole('alert')
    expect(overlay).toHaveAttribute('aria-live', 'assertive')
  })
})
