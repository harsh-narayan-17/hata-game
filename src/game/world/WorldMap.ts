import { WORLD, ROADS } from '../../data/locations'
import type Phaser from 'phaser'

/**
 * Draw the placeholder city: grass, roads, sidewalks, decorations.
 * Returns collision rectangles for buildings (caller adds location rects).
 */
export function buildWorld(scene: Phaser.Scene): Phaser.GameObjects.Rectangle[] {
  const g = scene.add.graphics()

  // Grass base
  g.fillStyle(0x5a8f5a, 1)
  g.fillRect(0, 0, WORLD.width, WORLD.height)

  // Subtle grass patches
  g.fillStyle(0x4f824f, 1)
  for (let i = 0; i < 40; i++) {
    const x = (i * 317) % WORLD.width
    const y = (i * 523) % WORLD.height
    g.fillRect(x, y, 80 + (i % 5) * 10, 50 + (i % 3) * 10)
  }

  // Sidewalks (lighter strips beside roads)
  const paintRoad = (x: number, y: number, w: number, h: number) => {
    // sidewalk
    g.fillStyle(0xc5c0b5, 1)
    g.fillRect(x - 18, y - 18, w + 36, h + 36)
    // asphalt
    g.fillStyle(0x4a4a52, 1)
    g.fillRect(x, y, w, h)
    // center line
    g.fillStyle(0xe8d98a, 1)
    if (w > h) {
      for (let lx = x + 20; lx < x + w - 20; lx += 40) {
        g.fillRect(lx, y + h / 2 - 2, 22, 4)
      }
    } else {
      for (let ly = y + 20; ly < y + h - 20; ly += 40) {
        g.fillRect(x + w / 2 - 2, ly, 4, 22)
      }
    }
  }

  // Vertical main road
  paintRoad(ROADS.vertical.x - ROADS.vertical.width / 2, 0, ROADS.vertical.width, WORLD.height)
  // Horizontal roads
  paintRoad(0, ROADS.horizontalMid.y - ROADS.horizontalMid.height / 2, WORLD.width, ROADS.horizontalMid.height)
  paintRoad(200, ROADS.horizontalUpper.y - ROADS.horizontalUpper.height / 2, WORLD.width - 400, ROADS.horizontalUpper.height)
  paintRoad(400, ROADS.horizontalLower.y - ROADS.horizontalLower.height / 2, WORLD.width - 800, ROADS.horizontalLower.height)

  // Decorative trees
  for (let i = 0; i < 28; i++) {
    const tx = 150 + ((i * 411) % (WORLD.width - 300))
    const ty = 150 + ((i * 277) % (WORLD.height - 300))
    // keep off main roads roughly
    if (Math.abs(tx - 1200) < 80) continue
    const trunk = scene.add.rectangle(tx, ty + 8, 8, 16, 0x5c4033)
    const canopy = scene.add.circle(tx, ty - 6, 16, 0x2d6a2d)
    trunk.setDepth(1)
    canopy.setDepth(1)
  }

  // Street lamps
  for (let i = 0; i < 12; i++) {
    const side = i % 2 === 0 ? -70 : 70
    const ly = 200 + i * 180
    scene.add.rectangle(1200 + side, ly, 6, 28, 0x333333).setDepth(1)
    scene.add.circle(1200 + side, ly - 16, 6, 0xffe566).setDepth(1)
  }

  // Parked cars (decorative)
  const parked = [
    { x: 1080, y: 1700, c: 0xb85c38 },
    { x: 1320, y: 1680, c: 0x3a6ea5 },
    { x: 700, y: 1020, c: 0xd4d4d4 },
    { x: 1700, y: 1180, c: 0x2f2f2f },
  ]
  for (const p of parked) {
    scene.add.rectangle(p.x, p.y, 36, 20, p.c).setDepth(2)
  }

  // Flowers near start
  for (let i = 0; i < 8; i++) {
    scene.add.circle(1120 + i * 18, 2100, 4, 0xf0a0c0).setDepth(1)
  }

  // Benches
  scene.add.rectangle(1100, 500, 36, 12, 0x8b6914).setDepth(1)
  scene.add.rectangle(1300, 500, 36, 12, 0x8b6914).setDepth(1)

  return []
}
