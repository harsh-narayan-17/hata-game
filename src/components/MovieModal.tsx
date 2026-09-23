import { Modal } from './Modal'
import { cinemaContent } from '../data/dialogue'

interface Props {
  open: boolean
  onClose: () => void
}

export function MovieModal({ open, onClose }: Props) {
  const c = cinemaContent
  return (
    <Modal open={open} onClose={onClose}>
      <p className="modal-eyebrow">{c.title}</p>
      <h2 className="modal-title">{c.movie}</h2>
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
