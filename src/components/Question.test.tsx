import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Question } from './Question'
import type { Question as QuestionType } from '../types/questions'

describe('Question', () => {
  const mockOnChange = vi.fn()

  afterEach(() => {
    mockOnChange.mockClear()
  })

  describe('Select type', () => {
    const selectQuestion: QuestionType = {
      id: 'team',
      text: 'Choose your team',
      type: 'select',
      options: [
        { value: '', label: 'Select...' },
        { value: 'red', label: 'Red Team' },
        { value: 'blue', label: 'Blue Team' },
      ],
    }

    it('renders a select dropdown', () => {
      render(<Question question={selectQuestion} value="" onChange={mockOnChange} />)

      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      expect(screen.getByText('Choose your team')).toBeInTheDocument()
    })

    it('renders all options', () => {
      render(<Question question={selectQuestion} value="" onChange={mockOnChange} />)

      expect(screen.getByText('Select...')).toBeInTheDocument()
      expect(screen.getByText('Red Team')).toBeInTheDocument()
      expect(screen.getByText('Blue Team')).toBeInTheDocument()
    })

    it('calls onChange when selection changes', async () => {
      const user = userEvent.setup()
      render(<Question question={selectQuestion} value="" onChange={mockOnChange} />)

      const select = screen.getByRole('combobox')
      await user.selectOptions(select, 'red')

      expect(mockOnChange).toHaveBeenCalledWith('team', 'red')
    })

    it('displays current value', () => {
      render(<Question question={selectQuestion} value="blue" onChange={mockOnChange} />)

      const select = screen.getByRole('combobox') as HTMLSelectElement
      expect(select.value).toBe('blue')
    })
  })

  describe('Radio type', () => {
    const radioQuestion: QuestionType = {
      id: 'preference',
      text: 'What do you prefer?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' },
      ],
    }

    it('renders radio buttons', () => {
      render(<Question question={radioQuestion} value="" onChange={mockOnChange} />)

      const radioButtons = screen.getAllByRole('radio')
      expect(radioButtons).toHaveLength(3)
      expect(screen.getByText('What do you prefer?')).toBeInTheDocument()
    })

    it('renders all options as labels', () => {
      render(<Question question={radioQuestion} value="" onChange={mockOnChange} />)

      expect(screen.getByText('Yes')).toBeInTheDocument()
      expect(screen.getByText('No')).toBeInTheDocument()
      expect(screen.getByText('Maybe')).toBeInTheDocument()
    })

    it('calls onChange when radio is selected', async () => {
      const user = userEvent.setup()
      render(<Question question={radioQuestion} value="" onChange={mockOnChange} />)

      const yesRadio = screen.getByLabelText('Yes')
      await user.click(yesRadio)

      expect(mockOnChange).toHaveBeenCalledWith('preference', 'yes')
    })

    it('displays current value as checked', () => {
      render(<Question question={radioQuestion} value="no" onChange={mockOnChange} />)

      const noRadio = screen.getByLabelText('No') as HTMLInputElement
      expect(noRadio.checked).toBe(true)

      const yesRadio = screen.getByLabelText('Yes') as HTMLInputElement
      expect(yesRadio.checked).toBe(false)
    })
  })
})
