import { Modal } from './Modal'
import { concertContent } from '../data/dialogue'

interface Props {
  open: boolean
  onClose: () => void
}

export function ConcertModal({ open, onClose }: Props) {
  const c = concertContent
  return (
    <Modal open={open} onClose={onClose}>
      <p className="modal-eyebrow">🎤 {c.title}</p>
      <h2 className="modal-title">{c.artist}</h2>
      <div className="dialogue-lines">
        {c.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
