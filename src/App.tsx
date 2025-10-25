import { useState, useCallback, useRef } from 'react'
import { Heart, Github } from 'lucide-react'
import { Questionnaire } from './components/Questionnaire'
import { DisqualifiedOverlay } from './components/DisqualifiedOverlay'
import { ResultSummary } from './components/ResultSummary'
import { QuestionnaireEvaluator } from './utils/evaluator'
import { questionnaireConfig } from './config/questionnaire'
import type { EvaluationResult } from './types/questions'
import './App.css'

const evaluator = new QuestionnaireEvaluator(
  questionnaireConfig.questions,
  questionnaireConfig.rules
)

function App() {
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [showOverlay, setShowOverlay] = useState(true)
  const lastDismissedMessageRef = useRef<string | null>(null)

  const handleEvaluation = useCallback((evalResult: EvaluationResult | null) => {
    setResult(evalResult)
    // Show overlay again only if it's a NEW immediate disqualifier (different message)
    if (evalResult?.isImmediate && evalResult.message !== lastDismissedMessageRef.current) {
      setShowOverlay(true)
    }
  }, [])

  const handleDismissOverlay = useCallback(() => {
    setShowOverlay(false)
    // Remember this message so we don't show it again
    if (result?.message) {
      lastDismissedMessageRef.current = result.message
    }
  }, [result])

  return (
    <div className="app">
      {result?.isImmediate && showOverlay && (
        <DisqualifiedOverlay message={result.message} onDismiss={handleDismissOverlay} />
      )}

      <header className="app-header">
        <div className="header-icon">
          <Heart size={48} />
        </div>
        <h1>Who can my daughter date?</h1>
        <p className="app-subtitle">Answer these questions to find out...</p>
      </header>
      <main className="app-main">
        <Questionnaire
          questions={questionnaireConfig.questions}
          evaluator={evaluator}
          onEvaluation={handleEvaluation}
        />
      </main>

      {result && !result.isImmediate && <ResultSummary result={result} />}

      <footer className="app-footer">
        <p className="footer-credit">
          Built by{' '}
          <a
            href="https://stanlemon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Stan Lemon
          </a>
        </p>
        <p className="footer-source">
          <a
            href="https://github.com/stanlemon/who-can-my-daughter-date"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link--github"
          >
            <Github size={16} />
            <span>View Source Code</span>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
