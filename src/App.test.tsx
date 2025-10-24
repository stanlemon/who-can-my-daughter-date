import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
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
    expect(screen.getByText('They root for ___ in football')).toBeInTheDocument()
    expect(screen.getByText('Pineapple belongs on pizza')).toBeInTheDocument()
  })

  it('renders main content area', () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
