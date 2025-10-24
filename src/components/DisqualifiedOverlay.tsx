import { X } from 'lucide-react'
import './DisqualifiedOverlay.css'

interface DisqualifiedOverlayProps {
  message: string
}

export function DisqualifiedOverlay({ message }: DisqualifiedOverlayProps) {
  return (
    <div className="disqualified-overlay" role="alert" aria-live="assertive">
      <div className="disqualified-content">
        <div className="disqualified-icon">
          <X size={120} strokeWidth={3} />
        </div>
        <h2 className="disqualified-title">ABSOLUTELY NOT</h2>
        <p className="disqualified-message">{message}</p>
      </div>
    </div>
  )
}
