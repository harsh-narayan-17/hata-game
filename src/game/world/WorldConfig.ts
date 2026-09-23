import { LOCATIONS, WORLD } from '../../data/locations'

/** Static building collision boxes derived from location footprints (+ a few fillers) */
export function getBuildingColliders(): { x: number; y: number; w: number; h: number }[] {
  const fromLocations = LOCATIONS.filter((l) => l.id !== 'final').map((l) => ({
    x: l.x,
    y: l.y,
    w: l.width,
    h: l.height,
  }))

  // Extra decorative buildings that block (kept off the roads)
  const fillers = [
    { x: 780, y: 880, w: 100, h: 80 },
    { x: 1620, y: 880, w: 100, h: 80 },
    { x: 780, y: 1280, w: 90, h: 70 },
    { x: 1620, y: 1280, w: 90, h: 70 },
    { x: 400, y: 1800, w: 120, h: 90 },
    { x: 2000, y: 1800, w: 120, h: 90 },
  ]

  return [...fromLocations, ...fillers]
}

export { WORLD }
