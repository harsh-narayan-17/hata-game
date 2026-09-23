import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState, ModalType } from '../types/game'
import {
  loadGameState,
  resetGameState,
  saveGameState,
} from '../game/systems/GameState'
import { GameEvents, gameBus } from '../game/systems/EventBus'
import { playSfx } from '../game/systems/Audio'

interface OpenPayload {
  type: ModalType
  payload?: Record<string, unknown>
}

export function useGameBridge() {
  const [state, setState] = useState<GameState>(() => loadGameState())
  const [modal, setModal] = useState<OpenPayload | null>(null)
  const gameRef = useRef<{ scene: { pause: (k: string) => void; resume: (k: string) => void; getScene: (k: string) => unknown; isActive: (k: string) => boolean; launch: (k: string) => void; stop: (k: string) => void } } | null>(null)

  useEffect(() => {
    const unsubs = [
      gameBus.on<GameState>(GameEvents.STATE_CHANGED, (s) => setState({ ...s })),
      gameBus.on<OpenPayload>(GameEvents.OPEN_MODAL, (payload) => {
        setModal(payload)
        gameBus.emit(GameEvents.PAUSE, null)
        playSfx('open', state.muted)
      }),
      gameBus.on(GameEvents.CLOSE_MODAL, () => {
        setModal(null)
        gameBus.emit(GameEvents.RESUME, null)
      }),
      gameBus.on<string>(GameEvents.PLAY_SFX, (kind) => {
        playSfx(kind, state.muted)
      }),
    ]
    return () => unsubs.forEach((u) => u())
  }, [state.muted])

  const closeModal = useCallback(() => {
    setModal(null)
    gameBus.emit(GameEvents.RESUME, null)
    playSfx('close', state.muted)
  }, [state.muted])

  const patchState = useCallback((partial: Partial<GameState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial }
      saveGameState(next)
      gameBus.emit(GameEvents.STATE_CHANGED, next)
      return next
    })
  }, [])

  const enterGame = useCallback(() => {
    patchState({ hasEntered: true })
    playSfx('open', state.muted)
  }, [patchState, state.muted])

  const toggleMute = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, muted: !prev.muted }
      saveGameState(next)
      return next
    })
  }, [])

  const restart = useCallback(() => {
    const next = resetGameState()
    setState(next)
    setModal(null)
    window.location.reload()
  }, [])

  const startBowling = useCallback(() => {
    setModal(null)
    // Launch bowling via event — PhaserGame listens
    gameBus.emit(GameEvents.PAUSE, null)
    window.dispatchEvent(new CustomEvent('hayati-start-bowling'))
  }, [])

  return {
    state,
    modal,
    setModal,
    closeModal,
    patchState,
    enterGame,
    toggleMute,
    restart,
    startBowling,
    gameRef,
  }
}
