import Phaser from 'phaser'
import { LOCATIONS, PLAYER_START } from '../../data/locations'
import { collectibles, isFridgeMagnetId } from '../../data/collectibles'
import { events } from '../../data/events'
import { gameContent } from '../../data/events'
import { Car } from '../entities/Car'
import { InteractionSystem } from '../entities/Interactable'
import { buildWorld } from '../world/WorldMap'
import { getBuildingColliders, WORLD } from '../world/WorldConfig'
import { GameEvents, gameBus } from '../systems/EventBus'
import { checkEndingUnlock, loadGameState, saveGameState } from '../systems/GameState'
import type { GameState } from '../../types/game'

export class MainScene extends Phaser.Scene {
  private car!: Car
  private interactions!: InteractionSystem
  private walls!: Phaser.Physics.Arcade.StaticGroup
  private state!: GameState
  private controlsHint!: Phaser.GameObjects.Text
  private unlockBanner!: Phaser.GameObjects.Text
  private magnetSprites = new Map<string, Phaser.GameObjects.Arc>()
  private finalBuilding: Phaser.GameObjects.Rectangle | null = null
  private finalLabel: Phaser.GameObjects.Text | null = null
  private paused = false
  private matchaTimerStarted = false
  private tresTimerStarted = false
  private busBound = false

  constructor() {
    super('MainScene')
  }

  create() {
    this.state = loadGameState()
    this.paused = false
    this.matchaTimerStarted = false
    this.tresTimerStarted = false

    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height)
    this.cameras.main.setBounds(0, 0, WORLD.width, WORLD.height)
    this.cameras.main.setBackgroundColor('#5a8f5a')

    buildWorld(this)
    this.createBuildings()

    this.car = new Car(this, PLAYER_START.x, PLAYER_START.y)
    this.createColliders()
    this.cameras.main.startFollow(this.car.body, true, 0.12, 0.12)

    this.interactions = new InteractionSystem(this)
    this.interactions.registerFromLocations(LOCATIONS, {
      includeFinal: this.state.endingUnlocked,
    })

    this.setupCollectibles()
    this.setupFinalArea()
    this.restoreStickers()

    this.controlsHint = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 80,
        `${gameContent.controlsHint.move}\n\n${gameContent.controlsHint.interact}`,
        {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          color: '#f5e6d3',
          align: 'center',
          backgroundColor: '#00000088',
          padding: { x: 16, y: 12 },
        },
      )
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setDepth(200)

    this.unlockBanner = this.add
      .text(this.cameras.main.width / 2, 48, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#ff6b8a',
        backgroundColor: '#1a1a2ecc',
        padding: { x: 14, y: 8 },
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setDepth(200)
      .setVisible(false)

    this.bindBus()
    gameBus.emit(GameEvents.STATE_CHANGED, this.state)

    if (this.state.endingUnlocked) {
      this.revealFinal()
    }

    // If visits already satisfy thresholds (refresh mid-game), arm timers
    this.maybeArmVisitEvents()
  }

  private restoreStickers() {
    if (this.state.triggeredEvents.includes('matcha')) {
      this.car.showMatchaSticker(this)
    }
    if (this.state.triggeredEvents.includes('tres-leches')) {
      this.car.showTresSticker(this)
    }
  }

  private createBuildings() {
    for (const loc of LOCATIONS) {
      if (loc.id === 'final') continue

      this.add
        .rectangle(loc.x, loc.y, loc.width, loc.height, loc.color)
        .setDepth(3)
        .setStrokeStyle(2, 0x1a1a2e)

      this.add
        .rectangle(loc.x, loc.y - loc.height / 2 + 8, loc.width - 8, 12, 0x000000, 0.15)
        .setDepth(4)

      this.add
        .text(loc.x, loc.y, loc.name.toUpperCase(), {
          fontFamily: 'system-ui, sans-serif',
          fontSize: '11px',
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: loc.width - 16 },
        })
        .setOrigin(0.5)
        .setDepth(5)
    }

    const fillers = [
      { x: 780, y: 880, w: 100, h: 80, c: 0x7a8b6f },
      { x: 1620, y: 880, w: 100, h: 80, c: 0x8b7a6f },
      { x: 780, y: 1280, w: 90, h: 70, c: 0x6f7a8b },
      { x: 1620, y: 1280, w: 90, h: 70, c: 0x8b6f7a },
      { x: 400, y: 1800, w: 120, h: 90, c: 0x6a7560 },
      { x: 2000, y: 1800, w: 120, h: 90, c: 0x756a60 },
    ]
    for (const f of fillers) {
      this.add.rectangle(f.x, f.y, f.w, f.h, f.c).setDepth(3).setStrokeStyle(1, 0x1a1a2e)
    }

    const cinema = LOCATIONS.find((l) => l.id === 'cinema')!
    this.add
      .text(cinema.x, cinema.y - cinema.height / 2 - 18, '', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px',
        color: '#ffe566',
        backgroundColor: '#1a1a2e',
        padding: { x: 6, y: 3 },
      })
      .setOrigin(0.5)
      .setDepth(6)

    const concert = LOCATIONS.find((l) => l.id === 'concert')!
    this.add
      .text(concert.x, concert.y - 20, 'Seedhe Maut · LIVE', {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: '#f5c6ff',
      })
      .setOrigin(0.5)
      .setDepth(6)
  }

  private createColliders() {
    this.walls = this.physics.add.staticGroup()
    for (const b of getBuildingColliders()) {
      const wall = this.add.rectangle(b.x, b.y, b.w, b.h, 0x000000, 0)
      this.physics.add.existing(wall, true)
      const body = wall.body as Phaser.Physics.Arcade.StaticBody
      body.updateFromGameObject()
      this.walls.add(wall)
    }
    this.physics.add.collider(this.car.body, this.walls)
  }

  private setupCollectibles() {
    for (const magnet of collectibles) {
      if (this.state.collectedItems.includes(magnet.id)) continue

      const sprite = this.add.circle(magnet.x, magnet.y, 10, 0xffd700).setDepth(8)
      this.tweens.add({
        targets: sprite,
        scale: 1.25,
        alpha: 0.7,
        duration: 700,
        yoyo: true,
        repeat: -1,
      })
      this.magnetSprites.set(magnet.id, sprite)

      this.interactions.addZone({
        id: magnet.id,
        x: magnet.x,
        y: magnet.y,
        padding: 48,
        modalType: 'collectible',
        contentKey: magnet.id,
        label: magnet.name,
        enabled: true,
      })
    }
  }

  private setupFinalArea() {
    const loc = LOCATIONS.find((l) => l.id === 'final')!
    this.finalBuilding = this.add
      .rectangle(loc.x, loc.y, loc.width, loc.height, loc.color, this.state.endingUnlocked ? 1 : 0)
      .setDepth(3)
      .setStrokeStyle(2, 0xffffff)
      .setVisible(this.state.endingUnlocked)

    this.finalLabel = this.add
      .text(loc.x, loc.y, '❤️', {
        fontSize: '28px',
      })
      .setOrigin(0.5)
      .setDepth(5)
      .setVisible(this.state.endingUnlocked)

    if (this.state.endingUnlocked) {
      this.add.circle(loc.x, loc.y, 160, 0xffcc88, 0.25).setDepth(2)
    }
  }

  private revealFinal() {
    const loc = LOCATIONS.find((l) => l.id === 'final')!
    this.finalBuilding?.setVisible(true).setAlpha(1)
    this.finalLabel?.setVisible(true)
    this.add.circle(loc.x, loc.y, 160, 0xffcc88, 0.25).setDepth(2)
    if (!this.interactions) return
    // Avoid duplicate zone if already registered
    this.interactions.removeZone(loc.id)
    this.interactions.addZone({
      id: loc.id,
      x: loc.x,
      y: loc.y,
      width: loc.width,
      height: loc.height,
      padding: loc.interactionRadius,
      modalType: 'ending',
      contentKey: 'ending',
      label: loc.name,
      enabled: true,
    })
    this.unlockBanner.setText('❤️  Something is waiting for you...')
    this.unlockBanner.setVisible(true)
    // this.time.delayedCall(5000, () => this.unlockBanner.setVisible(false))
  }

  private bindBus() {
    if (this.busBound) return
    this.busBound = true

    gameBus.on(GameEvents.PAUSE, () => {
      this.paused = true
      this.car?.setEnabled(false)
      this.interactions?.setLocked(true)
    })

    gameBus.on(GameEvents.RESUME, () => {
      this.paused = false
      this.car?.setEnabled(true)
      this.interactions?.setLocked(false)
      this.input.keyboard?.resetKeys()
    })

    gameBus.on<{ id: string }>(GameEvents.COLLECT, ({ id }) => {
      if (!this.state.collectedItems.includes(id)) {
        this.state.collectedItems = [...this.state.collectedItems, id]
        this.persist()
      }
      if (isFridgeMagnetId(id)) {
        this.magnetSprites.get(id)?.destroy()
        this.magnetSprites.delete(id)
        this.interactions.removeZone(id)
        this.tryUnlockEnding()
      }
    })

    gameBus.on<{ id: string }>(GameEvents.TRIGGER_EVENT, ({ id }) => {
      if (!this.state.triggeredEvents.includes(id)) {
        this.state.triggeredEvents = [...this.state.triggeredEvents, id]
        this.persist()
      }
      if (id === 'matcha') this.car.showMatchaSticker(this)
      if (id === 'tres-leches') this.car.showTresSticker(this)
    })

    gameBus.on(GameEvents.BOWLING_DONE, () => {
      this.state.completedBowling = true
      this.persist()
      this.paused = false
      this.car?.setEnabled(true)
      this.interactions?.setLocked(false)
      this.input.keyboard?.resetKeys()
    })

    gameBus.on(GameEvents.OPEN_MODAL, (payload: unknown) => {
      const data = payload as { payload?: { id?: string } }
      const id = data.payload?.id
      if (id && LOCATIONS.some((l) => l.id === id)) {
        if (!this.state.visitedLocations.includes(id)) {
          this.state.visitedLocations = [...this.state.visitedLocations, id]
          this.persist()
          this.tryUnlockEnding()
          this.maybeArmVisitEvents()
        }
      }
      this.paused = true
      this.car?.setEnabled(false)
      this.interactions?.setLocked(true)
    })
  }

  private maybeArmVisitEvents() {
    const visits = this.state.visitedLocations.filter((id) =>
      LOCATIONS.some((l) => l.id === id && l.id !== 'final'),
    ).length

    if (
      !this.matchaTimerStarted &&
      !this.state.triggeredEvents.includes('matcha') &&
      visits >= events.matcha.afterVisits
    ) {
      this.matchaTimerStarted = true
      this.time.delayedCall(events.matcha.delayMs, () => {
        if (this.state.triggeredEvents.includes('matcha')) return
        gameBus.emit(GameEvents.OPEN_MODAL, {
          type: 'event',
          payload: { eventId: 'matcha' },
        })
      })
    }

    if (
      !this.tresTimerStarted &&
      !this.state.triggeredEvents.includes('tres-leches') &&
      visits >= events.tresLeches.afterVisits
    ) {
      this.tresTimerStarted = true
      this.time.delayedCall(events.tresLeches.delayMs, () => {
        if (this.state.triggeredEvents.includes('tres-leches')) return
        gameBus.emit(GameEvents.OPEN_MODAL, {
          type: 'event',
          payload: { eventId: 'tres-leches' },
        })
      })
    }
  }

  private tryUnlockEnding() {
    if (this.state.endingUnlocked) return
    if (checkEndingUnlock(this.state)) {
      this.state.endingUnlocked = true
      this.persist()
      gameBus.emit(GameEvents.ENDING_UNLOCKED, null)
      gameBus.emit(GameEvents.PLAY_SFX, 'unlock')
      this.revealFinal()
    }
  }

  private persist() {
    saveGameState(this.state)
    gameBus.emit(GameEvents.STATE_CHANGED, this.state)
  }

  update() {
    this.car?.syncOverlay()

    if (this.paused) return

    this.car.update()
    this.interactions.update(this.car.body.x, this.car.body.y)

    if (this.car.getDistanceTraveled() > 40) {
      this.controlsHint.setVisible(false)
    }
  }
}
