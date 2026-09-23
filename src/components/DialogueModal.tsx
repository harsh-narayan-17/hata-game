import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { dialogue } from '../data/dialogue'

interface Props {
  open: boolean
  dialogueKey: string
  onClose: () => void
  onContinue?: () => void
}

type Phase = 'main' | 'bowling-invite'

export function DialogueModal({ open, dialogueKey, onClose, onContinue }: Props) {
  const [phase, setPhase] = useState<Phase>('main')
  const content = dialogue[dialogueKey]
  const invite = dialogue.bowlingInvite

  useEffect(() => {
    if (open) setPhase('main')
  }, [open, dialogueKey])

  if (!content || !open) return null

  if (phase === 'bowling-invite') {
    return (
      <Modal open onClose={onClose}>
        {invite.title && <h2 className="modal-title">{invite.title}</h2>}
        <div className="dialogue-lines">
          {invite.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="ending-actions">
          <button
            type="button"
            className="btn btn--yes"
            onClick={() => {
              onContinue?.()
            }}
          >
            Yes
          </button>
          <button type="button" className="btn btn--no" onClick={onClose}>
            No thanks
          </button>
        </div>
      </Modal>
    )
  }

  const handle = () => {
    if (content.followUp === 'bowling' && onContinue) {
      setPhase('bowling-invite')
    } else {
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      {content.title && <h2 className="modal-title">{content.title}</h2>}
      <div className="dialogue-lines">
        {content.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <button type="button" className="btn" onClick={handle}>
        {content.continueLabel ?? 'Close'}
      </button>
    </Modal>
  )
}
