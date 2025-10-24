import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import type { EvaluationResult } from '../types/questions'
import './ResultSummary.css'

interface ResultSummaryProps {
  result: EvaluationResult
}

export function ResultSummary({ result }: ResultSummaryProps) {
  // Don't show for immediate disqualifiers (they have the overlay)
  if (result.isImmediate) {
    return null
  }

  const getIcon = () => {
    switch (result.verdict) {
      case 'approved':
        return <CheckCircle size={48} />
      case 'conditional':
        return <AlertCircle size={48} />
      case 'rejected':
        return <XCircle size={48} />
      default:
        return null
    }
  }

  const getVerdictText = () => {
    switch (result.verdict) {
      case 'approved':
        return 'Approved'
      case 'conditional':
        return 'Conditional Approval'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className={`result-summary result-summary--${result.verdict}`} role="status">
      <div className="result-summary-content">
        <div className="result-summary-icon">{getIcon()}</div>
        <div className="result-summary-text">
          <h3 className="result-summary-title">
            {result.emoji && <span className="result-summary-emoji">{result.emoji}</span>}
            {getVerdictText()}
          </h3>
          <p className="result-summary-message">{result.message}</p>
        </div>
      </div>
    </div>
  )
}
