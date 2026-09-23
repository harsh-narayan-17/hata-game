import Phaser from 'phaser'

/**
 * Boot scene — generates placeholder textures then starts MainScene.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create() {
    this.scene.start('MainScene')
  }
}
