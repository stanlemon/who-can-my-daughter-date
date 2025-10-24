import { Heart, Users, Calendar } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-icon">
          <Heart size={48} />
        </div>
        <h1>Who can my daughter date?</h1>
      </header>
      <main className="app-main">
        <div className="icon-demo">
          <div className="icon-item">
            <Users size={32} />
            <span>Dating Pool</span>
          </div>
          <div className="icon-item">
            <Calendar size={32} />
            <span>Age Calculator</span>
          </div>
          <div className="icon-item">
            <Heart size={32} />
            <span>Compatibility</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
