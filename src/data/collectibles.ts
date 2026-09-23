import type { CollectibleDef } from '../types/game'
import { LOCATIONS } from './locations'

const cinema = LOCATIONS.find((l) => l.id === 'cinema')!
const bean = LOCATIONS.find((l) => l.id === 'bean-theory')!
const brown = LOCATIONS.find((l) => l.id === 'brown-rituals')!

export const collectibles: CollectibleDef[] = [
  {
    id: 'fridge-magnet-1',
    name: 'Fridge Magnet',
    description: "Obviously you're keeping this.",
    icon: '🧲',
    x: cinema.x - cinema.width / 2 - 28,
    y: cinema.y + 10,
  },
  {
    id: 'fridge-magnet-2',
    name: 'Fridge Magnet',
    description: 'Another one for the collection.',
    icon: '🧲',
    x: bean.x + bean.width / 2 + 30,
    y: bean.y + bean.height / 2 + 24,
  },
  {
    id: 'fridge-magnet-3',
    name: 'Fridge Magnet',
    description: 'Third time is the charm.',
    icon: '🧲',
    x: brown.x - brown.width / 2 - 30,
    y: brown.y + brown.height / 2 + 24,
  },
]

export const MAGNET_IDS = collectibles.map((c) => c.id)

export const collectionSlots = 3

export function isFridgeMagnetId(id: string): boolean {
  return id.startsWith('fridge-magnet')
}

export function allMagnetsCollected(collectedItems: string[]): boolean {
  return MAGNET_IDS.every((id) => collectedItems.includes(id))
}
