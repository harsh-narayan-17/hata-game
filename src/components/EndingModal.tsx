import { useState, type CSSProperties } from 'react'
import { Modal } from './Modal'
import { dialogue, endingContent } from '../data/dialogue'

interface Props {
  open: boolean
  onClose: () => void
  onChoice: (choice: 'yes' | 'no') => void
}

type Phase = 'intro' | 'ask' | 'yes' | 'no'

export function EndingModal({ open, onClose, onChoice }: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const intro = dialogue.endingIntro

  if (!open) return null

  if (phase === 'intro') {
    return (
      <Modal open onClose={onClose}>
        <div className="dialogue-lines">
          {intro.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <button type="button" className="btn" onClick={() => setPhase('ask')}>
          {intro.continueLabel}
        </button>
      </Modal>
    )
  }

  if (phase === 'ask') {
    return (
      <Modal open onClose={() => {}} className="ending-ask">
        <h2 className="modal-title ending-question">{endingContent.ask}</h2>
        <div className="ending-actions">
          <button
            type="button"
            className="btn btn--yes"
            onClick={() => {
              setPhase('yes')
              onChoice('yes')
            }}
          >
            YES ❤️
          </button>
          <button
            type="button"
            className="btn btn--no"
            onClick={() => {
              setPhase('no')
              onChoice('no')
            }}
          >
            NO
          </button>
        </div>
      </Modal>
    )
  }

  if (phase === 'yes') {
    const y = endingContent.yes
    return (
      <Modal open onClose={onClose} className="ending-yes">
        <div className="confetti-layer" aria-hidden>
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="confetti" style={{ '--i': i } as CSSProperties}>
              {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '💕'}
            </span>
          ))}
        </div>
        <p className="modal-eyebrow">❤️</p>
        <h2 className="modal-title">{y.title}</h2>
        <div className="dialogue-lines">
          {y.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="epilogue">{y.epilogue}</p>
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
      </Modal>
    )
  }

  const n = endingContent.no
  return (
    <Modal open onClose={onClose}>
      <h2 className="modal-title">
        {n.title} ❤️
      </h2>
      <div className="dialogue-lines">
        {n.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
