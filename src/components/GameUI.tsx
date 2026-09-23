interface Props {
  onOpenCollection: () => void
  onOpenSettings: () => void
  muted: boolean
  onToggleMute: () => void
}

export function GameUI({ onOpenCollection, onOpenSettings, muted, onToggleMute }: Props) {
  return (
    <div className="game-ui">
      <button
        type="button"
        className="ui-icon-btn"
        aria-label={muted ? 'Unmute' : 'Mute'}
        onClick={onToggleMute}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
      <button
        type="button"
        className="ui-icon-btn"
        aria-label="Menu"
        onClick={onOpenSettings}
        title="Menu"
      >
        ☰
      </button>
      <button
        type="button"
        className="ui-icon-btn"
        aria-label="Collection"
        onClick={onOpenCollection}
        title="Collection"
      >
        🧲
      </button>
    </div>
  )
}
