import { Modal } from './Modal'
import { collectibles, collectionSlots } from '../data/collectibles'
import type { GameState } from '../types/game'

interface Props {
  open: boolean
  state: GameState
  onClose: () => void
}

export function CollectionModal({ open, state, onClose }: Props) {
  const slots = Array.from({ length: collectionSlots }, (_, i) => {
    const def = collectibles[i]
    if (!def) return { empty: true as const, key: `empty-${i}` }
    const owned = state.collectedItems.includes(def.id)
    return owned
      ? { empty: false as const, key: def.id, def }
      : { empty: true as const, key: `locked-${def.id}`, name: def.name }
  })

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="modal-title">Collection</h2>
      <ul className="collection-list">
        {slots.map((slot) =>
          !slot.empty && 'def' in slot ? (
            <li key={slot.key} className="collection-item">
              <span className="collection-icon">{slot.def.icon}</span>
              <div>
                <strong>{slot.def.name}</strong>
                <p>{slot.def.description}</p>
              </div>
            </li>
          ) : (
            <li key={slot.key} className="collection-item collection-item--empty">
              ???
            </li>
          ),
        )}
      </ul>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
