import { useEffect } from 'react'
import { X } from 'lucide-react'
import './DisqualifiedOverlay.css'

interface DisqualifiedOverlayProps {
  message: string
  onDismiss: () => void
}

export function DisqualifiedOverlay({ message, onDismiss }: DisqualifiedOverlayProps) {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onDismiss])

  return (
    <div className="disqualified-overlay" role="alert" aria-live="assertive">
      <button
        className="disqualified-close"
        onClick={onDismiss}
        aria-label="Dismiss"
        type="button"
      >
        <X size={32} strokeWidth={2} />
      </button>
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
