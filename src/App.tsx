import { useState } from 'react'
import { Heart } from 'lucide-react'
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
  const [lastDismissedMessage, setLastDismissedMessage] = useState<string | null>(null)

  const handleEvaluation = (evalResult: EvaluationResult | null) => {
    setResult(evalResult)
    // Show overlay again only if it's a NEW immediate disqualifier (different message)
    if (evalResult?.isImmediate && evalResult.message !== lastDismissedMessage) {
      setShowOverlay(true)
    }
  }

  const handleDismissOverlay = () => {
    setShowOverlay(false)
    // Remember this message so we don't show it again
    if (result?.message) {
      setLastDismissedMessage(result.message)
    }
  }

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
    </div>
  )
}

export default App
