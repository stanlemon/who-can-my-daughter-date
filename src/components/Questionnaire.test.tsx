import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Questionnaire } from './Questionnaire'
import { QuestionnaireEvaluator } from '../utils/evaluator'
import type { Question, EvaluationRule } from '../types/questions'

describe('Questionnaire', () => {
  const mockQuestions: Question[] = [
    {
      id: 'q1',
      text: 'Question 1',
      type: 'select',
      options: [
        { value: '', label: 'Select...' },
        { value: 'good', label: 'Good', weight: 10 },
        { value: 'bad', label: 'Bad', immediateDisqualifier: true, weight: -100 },
      ],
    },
    {
      id: 'q2',
      text: 'Question 2',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes', weight: 5 },
        { value: 'no', label: 'No', weight: 0 },
      ],
    },
  ]

  const mockRules: EvaluationRule[] = [
    {
      id: 'good-rule',
      description: 'Good answers',
      minScore: 10,
      verdict: 'approved',
      message: 'Great!',
      priority: 10,
    },
    {
      id: 'fallback',
      description: 'Fallback',
      verdict: 'conditional',
      message: 'Okay',
      priority: 1,
    },
  ]

  it('should render all questions', () => {
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Question 2')).toBeInTheDocument()
  })

  it('should call onEvaluation with null when no answers', () => {
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    expect(mockOnEvaluation).toHaveBeenCalledWith(null)
  })

  it('should update answers when user selects options', async () => {
    const user = userEvent.setup()
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'good')

    // Should have called onEvaluation but not yet complete
    expect(mockOnEvaluation).toHaveBeenCalled()
  })

  it('should call onEvaluation with result when all questions answered', async () => {
    const user = userEvent.setup()
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    mockOnEvaluation.mockClear()

    // Answer first question
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'good')

    // Answer second question
    const yesRadio = screen.getByLabelText('Yes')
    await user.click(yesRadio)

    // Should have called onEvaluation with a result
    expect(mockOnEvaluation).toHaveBeenCalledWith(
      expect.objectContaining({
        verdict: 'approved',
        message: 'Great!',
        score: 15,
      })
    )
  })

  it('should call onEvaluation immediately for immediate disqualifiers', async () => {
    const user = userEvent.setup()
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    mockOnEvaluation.mockClear()

    // Select an immediate disqualifier
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'bad')

    // Should have called onEvaluation immediately with isImmediate: true
    expect(mockOnEvaluation).toHaveBeenCalledWith(
      expect.objectContaining({
        verdict: 'immediate_no',
        isImmediate: true,
      })
    )
  })

  it('should handle changing answers', async () => {
    const user = userEvent.setup()
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    // Answer both questions
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'good')

    const yesRadio = screen.getByLabelText('Yes')
    await user.click(yesRadio)

    mockOnEvaluation.mockClear()

    // Change first answer
    await user.selectOptions(select, 'bad')

    // Should trigger re-evaluation with immediate disqualifier
    expect(mockOnEvaluation).toHaveBeenCalledWith(
      expect.objectContaining({
        verdict: 'immediate_no',
        isImmediate: true,
      })
    )
  })

  it('should handle incomplete questionnaire', async () => {
    const user = userEvent.setup()
    const evaluator = new QuestionnaireEvaluator(mockQuestions, mockRules)
    const mockOnEvaluation = vi.fn()

    render(
      <Questionnaire
        questions={mockQuestions}
        evaluator={evaluator}
        onEvaluation={mockOnEvaluation}
      />
    )

    mockOnEvaluation.mockClear()

    // Answer only one question
    const yesRadio = screen.getByLabelText('Yes')
    await user.click(yesRadio)

    // Should call onEvaluation with null (incomplete)
    expect(mockOnEvaluation).toHaveBeenCalledWith(null)
  })
})
