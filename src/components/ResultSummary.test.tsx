import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ResultSummary } from './ResultSummary'
import type { EvaluationResult } from '../types/questions'

describe('ResultSummary', () => {
  describe('Approved verdict', () => {
    const approvedResult: EvaluationResult = {
      verdict: 'approved',
      message: 'They stand a chance at approval.',
      isImmediate: false,
      score: 15,
    }

    it('renders approved status', () => {
      render(<ResultSummary result={approvedResult} />)

      expect(screen.getByText('Approved')).toBeInTheDocument()
      expect(screen.getByText('They stand a chance at approval.')).toBeInTheDocument()
    })

    it('has approved CSS class', () => {
      render(<ResultSummary result={approvedResult} />)

      const summary = screen.getByRole('status')
      expect(summary).toHaveClass('result-summary--approved')
    })
  })

  describe('Conditional verdict', () => {
    const conditionalResult: EvaluationResult = {
      verdict: 'conditional',
      message: 'They need to make major changes.',
      isImmediate: false,
      score: 5,
    }

    it('renders conditional status', () => {
      render(<ResultSummary result={conditionalResult} />)

      expect(screen.getByText('Conditional Approval')).toBeInTheDocument()
      expect(screen.getByText('They need to make major changes.')).toBeInTheDocument()
    })

    it('has conditional CSS class', () => {
      render(<ResultSummary result={conditionalResult} />)

      const summary = screen.getByRole('status')
      expect(summary).toHaveClass('result-summary--conditional')
    })
  })

  describe('Rejected verdict', () => {
    const rejectedResult: EvaluationResult = {
      verdict: 'rejected',
      message: 'This is unforgivable.',
      isImmediate: false,
      score: -5,
    }

    it('renders rejected status', () => {
      render(<ResultSummary result={rejectedResult} />)

      expect(screen.getByText('Rejected')).toBeInTheDocument()
      expect(screen.getByText('This is unforgivable.')).toBeInTheDocument()
    })

    it('has rejected CSS class', () => {
      render(<ResultSummary result={rejectedResult} />)

      const summary = screen.getByRole('status')
      expect(summary).toHaveClass('result-summary--rejected')
    })
  })

  describe('Immediate disqualifier', () => {
    const immediateResult: EvaluationResult = {
      verdict: 'immediate_no',
      message: 'Deal-breaker',
      isImmediate: true,
      score: -Infinity,
    }

    it('does not render for immediate disqualifiers', () => {
      const { container } = render(<ResultSummary result={immediateResult} />)

      expect(container.firstChild).toBeNull()
    })
  })
})
