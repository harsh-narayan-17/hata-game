import { Modal } from './Modal'
import { cafes } from '../data/cafes'

interface Props {
  open: boolean
  cafeKey: string
  onClose: () => void
}

export function CafeMenuModal({ open, cafeKey, onClose }: Props) {
  const cafe = cafes[cafeKey]
  if (!cafe) return null

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="modal-title">{cafe.name}</h2>
      {cafe.tagline && <p className="modal-tagline">{cafe.tagline}</p>}
      <h3 className="modal-subtitle">MENU</h3>
      <ul className="menu-list">
        {cafe.menu.map((item) => (
          <li key={item.name}>
            <span className="menu-item-name">{item.name}</span>
            {item.note && <span className="menu-item-note">{item.note}</span>}
          </li>
        ))}
      </ul>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
