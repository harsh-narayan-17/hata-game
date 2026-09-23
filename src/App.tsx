import { useState } from 'react'
import { PhaserGame } from './components/PhaserGame'
import { IntroScreen } from './components/IntroScreen'
import { GameUI } from './components/GameUI'
import { CafeMenuModal } from './components/CafeMenuModal'
import { DialogueModal } from './components/DialogueModal'
import { CertificateModal } from './components/CertificateModal'
import { MovieModal } from './components/MovieModal'
import { ConcertModal } from './components/ConcertModal'
import { CollectionModal } from './components/CollectionModal'
import { CollectibleFoundModal } from './components/CollectibleFoundModal'
import { EventModal } from './components/EventModal'
import { EndingModal } from './components/EndingModal'
import { SettingsModal } from './components/SettingsModal'
import { useGameBridge } from './hooks/useGameState'
import { GameEvents, gameBus } from './game/systems/EventBus'
import { playSfx } from './game/systems/Audio'
import { saveGameState } from './game/systems/GameState'

function App() {
  const {
    state,
    modal,
    closeModal,
    enterGame,
    toggleMute,
    restart,
    startBowling,
    patchState,
  } = useGameBridge()

  const [menuOpen, setMenuOpen] = useState<'collection' | 'settings' | null>(null)

  const playing = state.hasEntered

  const modalType = modal?.type
  const payload = modal?.payload ?? {}

  return (
    <div className="app">
      {!playing && <IntroScreen onEnter={enterGame} />}

      {playing && (
        <>
          <PhaserGame active={playing} />
          <GameUI
            muted={state.muted}
            onToggleMute={toggleMute}
            onOpenCollection={() => {
              gameBus.emit(GameEvents.PAUSE, null)
              setMenuOpen('collection')
            }}
            onOpenSettings={() => {
              gameBus.emit(GameEvents.PAUSE, null)
              setMenuOpen('settings')
            }}
          />
        </>
      )}

      <CafeMenuModal
        open={modalType === 'cafe'}
        cafeKey={String(payload.contentKey ?? '')}
        onClose={closeModal}
      />

      <DialogueModal
        open={modalType === 'dialogue'}
        dialogueKey={String(payload.contentKey ?? 'viviana')}
        onClose={closeModal}
        onContinue={startBowling}
      />

      <CertificateModal open={modalType === 'certificate'} onClose={closeModal} />

      <MovieModal open={modalType === 'movie'} onClose={closeModal} />

      <ConcertModal open={modalType === 'concert'} onClose={closeModal} />

      <CollectibleFoundModal
        open={modalType === 'collectible'}
        collectibleId={String(payload.id ?? payload.contentKey ?? 'fridge-magnet-1')}
        onCollect={() => {
          const id = String(payload.id ?? payload.contentKey ?? 'fridge-magnet-1')
          gameBus.emit(GameEvents.COLLECT, { id })
          playSfx('success', state.muted)
        }}
        onClose={closeModal}
      />

      <EventModal
        open={modalType === 'event'}
        eventId={(payload.eventId as 'matcha' | 'tres-leches') ?? 'matcha'}
        onClose={() => {
          const id = String(payload.eventId ?? 'matcha')
          gameBus.emit(GameEvents.TRIGGER_EVENT, { id })
          closeModal()
        }}
      />

      <EndingModal
        key={modalType === 'ending' ? 'ending-open' : 'ending-closed'}
        open={modalType === 'ending'}
        onClose={closeModal}
        onChoice={(choice) => {
          const next = { ...state, endingChoice: choice }
          saveGameState(next)
          patchState({ endingChoice: choice })
          playSfx(choice === 'yes' ? 'yes' : 'close', state.muted)
        }}
      />

      <CollectionModal
        open={menuOpen === 'collection'}
        state={state}
        onClose={() => {
          setMenuOpen(null)
          gameBus.emit(GameEvents.RESUME, null)
        }}
      />

      <SettingsModal
        open={menuOpen === 'settings'}
        state={state}
        onClose={() => {
          setMenuOpen(null)
          gameBus.emit(GameEvents.RESUME, null)
        }}
        onToggleMute={toggleMute}
        onRestart={restart}
      />
    </div>
  )
}

export default App
