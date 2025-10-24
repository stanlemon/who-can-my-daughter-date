import { useState, useEffect } from 'react'
import { Question } from './Question'
import { QuestionnaireEvaluator } from '../utils/evaluator'
import type { Question as QuestionType, UserAnswers, EvaluationResult } from '../types/questions'
import './Questionnaire.css'

interface QuestionnaireProps {
  questions: QuestionType[]
  evaluator: QuestionnaireEvaluator
  onEvaluation: (result: EvaluationResult | null) => void
}

export function Questionnaire({ questions, evaluator, onEvaluation }: QuestionnaireProps) {
  const [answers, setAnswers] = useState<UserAnswers>(new Map())

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const newAnswers = new Map(prev)
      newAnswers.set(questionId, value)
      return newAnswers
    })
  }

  // Evaluate whenever answers change
  useEffect(() => {
    // Always check for immediate disqualifiers first, even if incomplete
    if (answers.size > 0) {
      const result = evaluator.evaluate(answers)
      // Show immediate disqualifiers right away
      if (result.isImmediate) {
        onEvaluation(result)
        return
      }
    }

    // For non-immediate results, only evaluate when complete
    if (evaluator.isComplete(answers)) {
      const result = evaluator.evaluate(answers)
      onEvaluation(result)
    } else {
      onEvaluation(null)
    }
  }, [answers, evaluator, onEvaluation])

  return (
    <div className="questionnaire">
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          value={answers.get(question.id) || ''}
          onChange={handleAnswerChange}
        />
      ))}
    </div>
  )
}
