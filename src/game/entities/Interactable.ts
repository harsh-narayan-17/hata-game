import Phaser from 'phaser'
import type { LocationDef, ModalType } from '../../types/game'
import { GameEvents, gameBus } from '../systems/EventBus'

export interface InteractableZone {
  id: string
  /** Center X */
  x: number
  /** Center Y */
  y: number
  /** Footprint width — with height, uses expanded AABB from any side */
  width?: number
  /** Footprint height */
  height?: number
  /** Extra reach beyond the box edges (or circle radius if no width/height) */
  padding: number
  modalType: ModalType
  contentKey: string
  label: string
  enabled: boolean
}

/** Distance from point to axis-aligned rect (0 if inside). */
function distanceToRect(
  px: number,
  py: number,
  cx: number,
  cy: number,
  halfW: number,
  halfH: number,
): number {
  const dx = Math.max(Math.abs(px - cx) - halfW, 0)
  const dy = Math.max(Math.abs(py - cy) - halfH, 0)
  return Math.hypot(dx, dy)
}

/**
 * Data-driven proximity interaction — reusable for locations, collectibles, events.
 */
export class InteractionSystem {
  private zones: InteractableZone[] = []
  private active: InteractableZone | null = null
  private promptText: Phaser.GameObjects.Text
  private spaceKey: Phaser.Input.Keyboard.Key
  private locked = false

  constructor(scene: Phaser.Scene) {
    this.promptText = scene.add
      .text(0, 0, '[ SPACE ] Interact', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        color: '#1a1a2e',
        backgroundColor: '#f5e6d3',
        padding: { x: 10, y: 6 },
      })
      .setOrigin(0.5)
      .setDepth(100)
      .setScrollFactor(1)
      .setVisible(false)

    this.spaceKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  setLocked(locked: boolean) {
    this.locked = locked
    if (locked) {
      this.promptText.setVisible(false)
      this.active = null
      gameBus.emit(GameEvents.HIDE_PROMPT, null)
    }
  }

  registerFromLocations(locations: LocationDef[], opts?: { includeFinal?: boolean }) {
    for (const loc of locations) {
      if (loc.id === 'final' && !opts?.includeFinal) continue
      this.zones.push({
        id: loc.id,
        x: loc.x,
        y: loc.y,
        width: loc.width,
        height: loc.height,
        padding: loc.interactionRadius,
        modalType: loc.modalType,
        contentKey: loc.contentKey,
        label: loc.name,
        enabled: true,
      })
    }
  }

  addZone(zone: InteractableZone) {
    this.zones.push(zone)
  }

  removeZone(id: string) {
    this.zones = this.zones.filter((z) => z.id !== id)
    if (this.active?.id === id) {
      this.active = null
      this.promptText.setVisible(false)
    }
  }

  setZoneEnabled(id: string, enabled: boolean) {
    const z = this.zones.find((z) => z.id === id)
    if (z) z.enabled = enabled
  }

  private distanceToZone(playerX: number, playerY: number, zone: InteractableZone): number {
    if (zone.width != null && zone.height != null) {
      return distanceToRect(
        playerX,
        playerY,
        zone.x,
        zone.y,
        zone.width / 2 + zone.padding,
        zone.height / 2 + zone.padding,
      )
    }
    return Phaser.Math.Distance.Between(playerX, playerY, zone.x, zone.y) - zone.padding
  }

  update(playerX: number, playerY: number) {
    if (this.locked) return

    let nearest: InteractableZone | null = null
    let nearestDist = Infinity

    for (const zone of this.zones) {
      if (!zone.enabled) continue
      const d = this.distanceToZone(playerX, playerY, zone)
      // Inside or touching the expanded footprint
      if (d <= 0 && d < nearestDist) {
        nearest = zone
        nearestDist = d
      }
    }

    if (nearest) {
      this.active = nearest
      const promptY =
        nearest.height != null ? nearest.y - nearest.height / 2 - 28 : nearest.y - 40
      this.promptText.setPosition(nearest.x, promptY)
      this.promptText.setVisible(true)
      gameBus.emit(GameEvents.SHOW_PROMPT, { id: nearest.id, label: nearest.label })

      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.trigger(nearest)
      }
    } else {
      if (this.active) {
        gameBus.emit(GameEvents.HIDE_PROMPT, null)
      }
      this.active = null
      this.promptText.setVisible(false)
    }
  }

  private trigger(zone: InteractableZone) {
    gameBus.emit(GameEvents.PLAY_SFX, 'interact')
    gameBus.emit(GameEvents.OPEN_MODAL, {
      type: zone.modalType,
      payload: {
        id: zone.id,
        contentKey: zone.contentKey,
        label: zone.label,
      },
    })
  }
}
