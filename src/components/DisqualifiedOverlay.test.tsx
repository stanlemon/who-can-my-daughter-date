import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DisqualifiedOverlay } from './DisqualifiedOverlay'

describe('DisqualifiedOverlay', () => {
  it('renders the overlay', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test message" onDismiss={onDismiss} />)

    const overlay = screen.getByRole('alert')
    expect(overlay).toBeInTheDocument()
  })

  it('displays ABSOLUTELY NOT title', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test message" onDismiss={onDismiss} />)

    expect(screen.getByText('ABSOLUTELY NOT')).toBeInTheDocument()
  })

  it('displays the provided message', () => {
    const message = 'Cleveland Browns is a deal-breaker.'
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message={message} onDismiss={onDismiss} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('has appropriate ARIA attributes for accessibility', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test" onDismiss={onDismiss} />)

    const overlay = screen.getByRole('alert')
    expect(overlay).toHaveAttribute('aria-live', 'assertive')
  })

  it('calls onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test message" onDismiss={onDismiss} />)

    const closeButton = screen.getByLabelText('Dismiss')
    fireEvent.click(closeButton)

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('calls onDismiss when ESC key is pressed', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test message" onDismiss={onDismiss} />)

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not call onDismiss when other keys are pressed', () => {
    const onDismiss = vi.fn()
    render(<DisqualifiedOverlay message="Test message" onDismiss={onDismiss} />)

    fireEvent.keyDown(document, { key: 'Enter' })
    fireEvent.keyDown(document, { key: 'a' })

    expect(onDismiss).not.toHaveBeenCalled()
  })
})
