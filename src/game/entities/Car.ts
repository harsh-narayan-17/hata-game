import Phaser from 'phaser'

export class Car {
  readonly body: Phaser.Physics.Arcade.Image
  readonly nameLabel: Phaser.GameObjects.Text
  private stickerRoot: Phaser.GameObjects.Container
  private matchaSticker: Phaser.GameObjects.Text | null = null
  private tresSticker: Phaser.GameObjects.Text | null = null
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd: {
    up: Phaser.Input.Keyboard.Key
    down: Phaser.Input.Keyboard.Key
    left: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
  }
  private speed = 220
  private enabled = true
  private distanceTraveled = 0
  private lastX: number
  private lastY: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // if (!scene.textures.exists('car')) {
    //   const g = scene.make.graphics({ x: 0, y: 0 })
    //   g.fillStyle(0xe85d4c, 1)
    //   g.fillRoundedRect(0, 4, 40, 24, 4)
    //   g.fillStyle(0x88c0d0, 1)
    //   g.fillRect(8, 8, 24, 12)
    //   g.fillStyle(0x222222, 1)
    //   g.fillRect(4, 0, 8, 6)
    //   g.fillRect(28, 0, 8, 6)
    //   g.fillRect(4, 26, 8, 6)
    //   g.fillRect(28, 26, 8, 6)
    //   g.generateTexture('car', 40, 32)
    //   g.destroy()
    // }

    if (!scene.textures.exists('car')) {
      const g = scene.make.graphics({ x: 0, y: 0 })
    
      // ============================================
      // DARK BLUE COMPACT SUV — KIA SONET INSPIRED
      // ============================================
    
      // Shadow underneath the car
      g.fillStyle(0x0b0f16, 0.25)
      g.fillRoundedRect(3, 4, 38, 58, 7)
    
      // Tires
      g.fillStyle(0x111318, 1)
    
      // Left tires
      g.fillRoundedRect(0, 13, 7, 14, 3)
      g.fillRoundedRect(0, 43, 7, 14, 3)
    
      // Right tires
      g.fillRoundedRect(33, 13, 7, 14, 3)
      g.fillRoundedRect(33, 43, 7, 14, 3)
    
      // Main dark-blue body
      g.fillStyle(0x172f52, 1)
      g.fillRoundedRect(5, 2, 30, 58, 8)
    
      // Blue body highlight
      g.fillStyle(0x23456f, 1)
      g.fillRoundedRect(7, 4, 26, 54, 7)
    
      // Hood
      g.fillStyle(0x1b395f, 1)
      g.fillRoundedRect(8, 5, 24, 15, 5)
    
      // Front windshield
      g.fillStyle(0x101923, 1)
      g.fillRoundedRect(9, 17, 22, 12, 4)
    
      // Windshield highlight
      g.fillStyle(0x314b64, 0.8)
      g.fillTriangle(
        10, 18,
        29, 18,
        10, 26
      )
    
      // Roof
      g.fillStyle(0x142b49, 1)
      g.fillRoundedRect(8, 28, 24, 19, 5)
    
      // Roof glass
      g.fillStyle(0x101923, 1)
      g.fillRoundedRect(10, 29, 20, 16, 4)
    
      // Rear window highlight
      g.fillStyle(0x2b4359, 0.7)
      g.fillTriangle(
        11, 31,
        29, 31,
        29, 43
      )
    
      // Rear section
      g.fillStyle(0x1a3558, 1)
      g.fillRoundedRect(7, 45, 26, 12, 5)
    
      // Front grille
      g.fillStyle(0x0c1118, 1)
      g.fillRoundedRect(12, 3, 16, 4, 2)
    
      // Front grille highlight
      g.fillStyle(0x5f7184, 0.7)
      g.fillRect(14, 4, 12, 1)
    
      // Headlights
      g.fillStyle(0xf8f1cf, 1)
      g.fillRoundedRect(8, 5, 6, 3, 1)
      g.fillRoundedRect(26, 5, 6, 3, 1)
    
      // Headlight glow
      g.fillStyle(0xfff4b8, 0.35)
      g.fillCircle(11, 7, 3)
      g.fillCircle(29, 7, 3)
    
      // Rear lights
      g.fillStyle(0x9e2635, 1)
      g.fillRoundedRect(8, 53, 6, 3, 1)
      g.fillRoundedRect(26, 53, 6, 3, 1)
    
      // Rear light highlight
      g.fillStyle(0xd94b55, 0.8)
      g.fillRect(9, 53, 4, 1)
      g.fillRect(27, 53, 4, 1)
    
      // Side mirrors
      g.fillStyle(0x101820, 1)
      g.fillRoundedRect(3, 19, 5, 7, 2)
      g.fillRoundedRect(32, 19, 5, 7, 2)
    
      // Subtle body highlight
      g.lineStyle(1, 0x45678f, 0.7)
      g.strokeRoundedRect(6, 3, 28, 56, 8)
    
      g.generateTexture('car', 40, 62)
      g.destroy()
    }

    this.body = scene.physics.add.image(x, y, 'car')

    this.body.setDisplaySize(40, 62)
    this.body.setOrigin(0.5, 0.5)

    this.body.setCollideWorldBounds(true)
    this.body.setDepth(10)
    this.body.setDrag(800)
    this.body.setMaxVelocity(this.speed)

    this.nameLabel = scene.add
      .text(x, y - 42, 'Hayati', {
        fontFamily: 'Georgia, serif',
        fontSize: '13px',
        color: '#1a1a2e',
        backgroundColor: '#f5e6d3',
        padding: { x: 6, y: 2 },
      })
      .setOrigin(0.5)
      .setDepth(12)

    this.stickerRoot = scene.add.container(x, y).setDepth(13)

    const keyboard = scene.input.keyboard!
    this.cursors = keyboard.createCursorKeys()
    this.wasd = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }

    this.lastX = x
    this.lastY = y
  }

  setEnabled(value: boolean) {
    this.enabled = value
    if (!value) {
      this.body.setVelocity(0, 0)
    }
  }

  getDistanceTraveled() {
    return this.distanceTraveled
  }

  showMatchaSticker(scene: Phaser.Scene) {
    if (this.matchaSticker) return
    this.matchaSticker = scene.add
      .text(-18, -22, '🍵', { fontSize: '18px' })
      .setOrigin(0.5)
    this.stickerRoot.add(this.matchaSticker)
    scene.tweens.add({
      targets: this.matchaSticker,
      y: -28,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  showTresSticker(scene: Phaser.Scene) {
    if (this.tresSticker) return
    this.tresSticker = scene.add
      .text(18, -22, '🍰', { fontSize: '18px' })
      .setOrigin(0.5)
    this.stickerRoot.add(this.tresSticker)
    scene.tweens.add({
      targets: this.tresSticker,
      y: -28,
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  /** Keep name + stickers locked to the car (works even while movement is paused). */
  syncOverlay() {
    this.nameLabel.setPosition(this.body.x, this.body.y - 42)
    this.stickerRoot.setPosition(this.body.x, this.body.y)
  }

  update() {
    this.syncOverlay()

    if (!this.enabled) {
      this.body.setVelocity(0, 0)
      return
    }

    let vx = 0
    let vy = 0

    if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -1
    else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = 1

    if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1
    else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1

    if (vx !== 0 && vy !== 0) {
      const inv = Math.SQRT1_2
      vx *= inv
      vy *= inv
    }

    this.body.setVelocity(vx * this.speed, vy * this.speed)

    if (vx !== 0 || vy !== 0) {
      this.body.setAngle(Phaser.Math.RadToDeg(Math.atan2(vy, vx)) + 90)
    }

    const dx = this.body.x - this.lastX
    const dy = this.body.y - this.lastY
    this.distanceTraveled += Math.hypot(dx, dy)
    this.lastX = this.body.x
    this.lastY = this.body.y
  }
}
