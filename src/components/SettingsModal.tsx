import { Modal } from './Modal'
import type { GameState } from '../types/game'

interface Props {
  open: boolean
  state: GameState
  onClose: () => void
  onToggleMute: () => void
  onRestart: () => void
}

export function SettingsModal({ open, state, onClose, onToggleMute, onRestart }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="modal-title">Settings</h2>
      <div className="settings-rows">
        <button type="button" className="btn btn--ghost" onClick={onToggleMute}>
          Sound: {state.muted ? 'Off' : 'On'}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            if (window.confirm('Restart the game? Progress will be cleared.')) {
              onRestart()
            }
          }}
        >
          Restart
        </button>
      </div>
      <button type="button" className="btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}
