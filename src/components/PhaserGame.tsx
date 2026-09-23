import { useEffect, useRef } from 'react'
import { createGame } from '../game/Game'
import type Phaser from 'phaser'
import { GameEvents, gameBus } from '../game/systems/EventBus'

/**
 * Mounts a Phaser game into a full-viewport container.
 * Destroys the game on unmount (React Strict Mode safe).
 */
export function PhaserGame({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!active) return

    const parent = containerRef.current
    if (!parent) return

    if (gameRef.current) {
      gameRef.current.destroy(true)
      gameRef.current = null
    }

    gameRef.current = createGame(parent)

    const onBowling = () => {
      const game = gameRef.current
      if (!game) return

      // Stop any previous bowling run (safe if not running)
      game.scene.stop('BowlingScene')

      const main = game.scene.getScene('MainScene') as Phaser.Scene | null
      if (!main) return

      // Pause world scene, then launch bowling immediately.
      // Do NOT use main.time.delayedCall after pause — paused clocks never fire.
      if (main.scene.isActive()) {
        main.scene.pause()
      }
      main.scene.launch('BowlingScene')
      main.input.keyboard?.resetKeys()

      gameBus.emit(GameEvents.PLAY_SFX, 'interact')
    }

    window.addEventListener('hayati-start-bowling', onBowling)

    return () => {
      window.removeEventListener('hayati-start-bowling', onBowling)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [active])

  return <div ref={containerRef} className="phaser-container" />
}
