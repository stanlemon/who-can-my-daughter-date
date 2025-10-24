import { Heart } from 'lucide-react'
import { Questionnaire } from './components/Questionnaire'
import { QuestionnaireEvaluator } from './utils/evaluator'
import { questionnaireConfig } from './config/questionnaire'
import './App.css'

const evaluator = new QuestionnaireEvaluator(
  questionnaireConfig.questions,
  questionnaireConfig.rules
)

function App() {
  // Evaluation result handler - will be used in Phase 3 and 5
  const handleEvaluation = () => {
    // TODO: Handle evaluation result in next phases
  }

  return (
    <div className="app">
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
