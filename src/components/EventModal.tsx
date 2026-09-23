import { Modal } from './Modal'
import { events } from '../data/events'

interface Props {
  open: boolean
  eventId: 'matcha' | 'tres-leches'
  onClose: () => void
}

export function EventModal({ open, eventId, onClose }: Props) {
  const event = eventId === 'matcha' ? events.matcha : events.tresLeches

  return (
    <Modal open={open} onClose={onClose} className="event-modal">
      <p className="event-title">{event.title}</p>
      <p className="event-body">{event.body}</p>
      <p className="event-item">
        {event.icon} {event.item}
      </p>
      <button type="button" className="btn" onClick={onClose}>
        Thank you
      </button>
    </Modal>
  )
}
