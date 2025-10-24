import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Questionnaire } from './components/Questionnaire'
import { DisqualifiedOverlay } from './components/DisqualifiedOverlay'
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

  const handleEvaluation = (evalResult: EvaluationResult | null) => {
    setResult(evalResult)
  }

  return (
    <div className="app">
      {result?.isImmediate && <DisqualifiedOverlay message={result.message} />}

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
    </div>
  )
}

export default App
