import type { Question as QuestionType } from '../types/questions'
import './Question.css'

interface QuestionProps {
  question: QuestionType
  value: string
  onChange: (questionId: string, value: string) => void
}

export function Question({ question, value, onChange }: QuestionProps) {
  const handleChange = (newValue: string) => {
    onChange(question.id, newValue)
  }

  if (question.type === 'select') {
    return (
      <div className="question">
        <label htmlFor={question.id} className="question-label">
          {question.emoji && <span className="question-emoji">{question.emoji}</span>}
          {question.text}
        </label>
        <select
          id={question.id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="question-select"
        >
          {question.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Radio type
  return (
    <div className="question">
      <fieldset className="question-fieldset">
        <legend className="question-label">
          {question.emoji && <span className="question-emoji">{question.emoji}</span>}
          {question.text}
        </legend>
        <div className="question-options">
          {question.options.map((option) => {
            const isChecked = value === option.value
            const colorClass = option.color ? `radio-label--${option.color}` : ''
            const checkedClass = isChecked ? 'radio-label--checked' : ''

            return (
              <label
                key={option.value}
                className={`radio-label ${colorClass} ${checkedClass}`.trim()}
                data-color={option.color}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={isChecked}
                  onChange={(e) => handleChange(e.target.value)}
                  className="radio-input"
                />
                <span>{option.label}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
