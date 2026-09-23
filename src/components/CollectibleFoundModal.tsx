import { Modal } from './Modal'
import { collectibles } from '../data/collectibles'

interface Props {
  open: boolean
  collectibleId: string
  onCollect: () => void
  onClose: () => void
}

export function CollectibleFoundModal({ open, collectibleId, onCollect, onClose }: Props) {
  const item = collectibles.find((c) => c.id === collectibleId)
  if (!item) return null

  return (
    <Modal open={open} onClose={onClose}>
      <p className="modal-eyebrow">COLLECTIBLE FOUND</p>
      <h2 className="modal-title">
        {item.icon} {item.name}
      </h2>
      <p className="dialogue-lines">"{item.description}"</p>
      <button
        type="button"
        className="btn"
        onClick={() => {
          onCollect()
          onClose()
        }}
      >
        Add to Collection
      </button>
    </Modal>
  )
}
