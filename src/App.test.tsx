import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Who can my daughter date?')
  })

  it('renders the header element', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders icon demo section', () => {
    render(<App />)
    expect(screen.getByText('Dating Pool')).toBeInTheDocument()
    expect(screen.getByText('Age Calculator')).toBeInTheDocument()
    expect(screen.getByText('Compatibility')).toBeInTheDocument()
  })

  it('renders main content area', () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
