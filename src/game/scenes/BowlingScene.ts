import Phaser from 'phaser'
import { GameEvents, gameBus } from '../systems/EventBus'

/**
 * Tiny deterministic bowling mini-game — no heavy physics.
 * Aim with ← → / A D, throw with SPACE.
 */
export class BowlingScene extends Phaser.Scene {
  private aim = 0.5
  private aimBar!: Phaser.GameObjects.Rectangle
  private ball!: Phaser.GameObjects.Arc
  private pins: Phaser.GameObjects.Rectangle[] = []
  private thrown = false
  private finished = false
  private resultText!: Phaser.GameObjects.Text
  private leftKey!: Phaser.Input.Keyboard.Key
  private rightKey!: Phaser.Input.Keyboard.Key
  private aKey!: Phaser.Input.Keyboard.Key
  private dKey!: Phaser.Input.Keyboard.Key
  private space!: Phaser.Input.Keyboard.Key

  constructor() {
    super({ key: 'BowlingScene', active: false })
  }

  create() {
    this.aim = 0.5
    this.thrown = false
    this.finished = false
    this.pins = []

    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x1a2030)
    this.add.rectangle(width / 2, height / 2, 160, height - 40, 0xd4a574)
    this.add.rectangle(width / 2 - 70, height / 2, 8, height - 40, 0x8b6914)
    this.add.rectangle(width / 2 + 70, height / 2, 8, height - 40, 0x8b6914)

    this.add
      .text(width / 2, 28, 'VIVIANA BOWLING', {
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
        color: '#f5e6d3',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, 54, '← → aim · SPACE throw', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        color: '#ffd700',
      })
      .setOrigin(0.5)

    const pinStartY = 120
    const rows = [1, 2, 3]
    for (let r = 0; r < rows.length; r++) {
      const count = rows[r]
      for (let c = 0; c < count; c++) {
        const px = width / 2 - ((count - 1) * 22) / 2 + c * 22
        const py = pinStartY + r * 28
        this.pins.push(
          this.add.rectangle(px, py, 14, 28, 0xf5f5f5).setStrokeStyle(1, 0x333),
        )
      }
    }

    this.ball = this.add.circle(width / 2, height - 80, 14, 0x2c2c2c)
    this.add.rectangle(width / 2, height - 36, 200, 10, 0x333333)
    this.aimBar = this.add.rectangle(width / 2, height - 36, 6, 16, 0xff6b8a)

    this.resultText = this.add
      .text(width / 2, height / 2, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        color: '#ffe566',
      })
      .setOrigin(0.5)
      .setVisible(false)

    const kb = this.input.keyboard!
    this.leftKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, false)
    this.rightKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, false)
    this.aKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.A, false)
    this.dKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.D, false)
    this.space = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false)
    kb.resetKeys()

    const skip = this.add
      .text(width - 16, height - 16, 'Skip', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
        color: '#888',
      })
      .setOrigin(1)
      .setInteractive({ useHandCursor: true })

    skip.on('pointerdown', () => this.finish(false))
  }

  update(_t: number, dt: number) {
    if (this.thrown || this.finished) return

    const step = (dt / 1000) * 0.7
    if (this.leftKey.isDown || this.aKey.isDown) this.aim = Math.max(0, this.aim - step)
    if (this.rightKey.isDown || this.dKey.isDown) this.aim = Math.min(1, this.aim + step)

    this.aimBar.setX(this.scale.width / 2 - 100 + this.aim * 200)
    this.ball.setX(this.scale.width / 2 - 40 + this.aim * 80)

    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.throwBall()
    }
  }

  private throwBall() {
    this.thrown = true
    const accuracy = 1 - Math.abs(this.aim - 0.5) * 2
    const strike = accuracy > 0.72

    this.tweens.add({
      targets: this.ball,
      y: 140,
      x: this.scale.width / 2 + (this.aim - 0.5) * 50,
      duration: 700,
      ease: 'Quad.easeIn',
      onComplete: () => this.knockPins(strike, accuracy),
    })
  }

  private knockPins(strike: boolean, accuracy: number) {
    const knockCount = strike ? this.pins.length : Math.floor(accuracy * this.pins.length)

    this.pins.forEach((pin, i) => {
      if (i < knockCount) {
        this.tweens.add({
          targets: pin,
          x: pin.x + Phaser.Math.Between(-40, 40),
          y: pin.y + Phaser.Math.Between(10, 40),
          angle: Phaser.Math.Between(-90, 90),
          alpha: 0.4,
          duration: 400,
          delay: i * 40,
        })
      }
    })

    this.time.delayedCall(600, () => {
      this.resultText.setText(strike ? 'STRIKE! 🎳' : 'Nice try 😌')
      this.resultText.setVisible(true)
      gameBus.emit(GameEvents.PLAY_SFX, strike ? 'success' : 'interact')
      this.time.delayedCall(1400, () => this.finish(true))
    })
  }

  private finish(_played: boolean) {
    if (this.finished) return
    this.finished = true
    gameBus.emit(GameEvents.BOWLING_DONE, null)
    this.scene.stop()
    this.scene.resume('MainScene')
    gameBus.emit(GameEvents.RESUME, null)
  }
}
