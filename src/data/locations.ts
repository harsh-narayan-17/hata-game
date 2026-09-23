import type { LocationDef } from '../types/game'

/** World dimensions */
export const WORLD = {
  width: 2400,
  height: 2400,
} as const

export const PLAYER_START = { x: 1200, y: 2000 }

/** Road centerline positions for the cross layout */
export const ROADS = {
  vertical: { x: 1200, width: 96 },
  horizontalMid: { y: 1100, height: 80 },
  horizontalUpper: { y: 650, height: 72 },
  horizontalLower: { y: 1550, height: 72 },
} as const

const SIDEWALK = 18
const CURB_GAP = 16

/** Place a building just outside the vertical road sidewalk (left curb). */
function curbLeft(width: number) {
  const roadLeft = ROADS.vertical.x - ROADS.vertical.width / 2
  return roadLeft - SIDEWALK - CURB_GAP - width / 2
}

/** Place a building just outside the vertical road sidewalk (right curb). */
function curbRight(width: number) {
  const roadRight = ROADS.vertical.x + ROADS.vertical.width / 2
  return roadRight + SIDEWALK + CURB_GAP + width / 2
}

/** North of a horizontal road (sitting on the curb). */
function curbNorth(roadY: number, roadH: number, height: number) {
  return roadY - roadH / 2 - SIDEWALK - CURB_GAP - height / 2
}

/**
 * Conceptual layout — buildings sit on curbs, not on asphalt:
 *           FINAL / PARK
 *              │
 *           CINEMA
 *              │
 *  BEAN THEORY ┼ CONCERT
 *              │
 *  HIRANANDANI ┼ BROWN RITUALS
 *              │
 *         VIVIANA MALL
 *              │
 *            START
 */
export const LOCATIONS: LocationDef[] = [
  {
    id: 'viviana',
    name: 'Viviana Mall',
    type: 'mall',
    x: curbLeft(220),
    y: curbNorth(ROADS.horizontalLower.y, ROADS.horizontalLower.height, 140),
    width: 220,
    height: 140,
    color: 0xc4a484,
    interactionRadius: 36,
    modalType: 'dialogue',
    contentKey: 'viviana',
  },
  {
    id: 'hiranandani',
    name: 'House of Hiranandani',
    type: 'office',
    x: curbLeft(200),
    y: curbNorth(ROADS.horizontalMid.y, ROADS.horizontalMid.height, 150),
    width: 200,
    height: 150,
    color: 0x6b8cae,
    interactionRadius: 36,
    modalType: 'certificate',
    contentKey: 'hiranandani',
  },
  {
    id: 'brown-rituals',
    name: 'Brown Rituals',
    type: 'cafe',
    x: curbRight(1260),
    y: curbNorth(ROADS.horizontalMid.y, ROADS.horizontalMid.height, 120),
    width: 160,
    height: 120,
    color: 0x8b5a2b,
    interactionRadius: 36,
    modalType: 'cafe',
    contentKey: 'brownRituals',
  },
  {
    id: 'bean-theory',
    name: 'Bean Theory',
    type: 'cafe',
    x: curbLeft(560),
    y: curbNorth(ROADS.horizontalUpper.y, ROADS.horizontalUpper.height, 120),
    width: 160,
    height: 120,
    color: 0x5c4033,
    interactionRadius: 36,
    modalType: 'cafe',
    contentKey: 'beanTheory',
  },
  {
    id: 'concert',
    name: 'Concert',
    type: 'concert',
    x: curbRight(1200),
    y: curbNorth(ROADS.horizontalUpper.y, ROADS.horizontalUpper.height, 140),
    width: 200,
    height: 140,
    color: 0x4a3060,
    interactionRadius: 36,
    modalType: 'concert',
    contentKey: 'concert',
  },
  {
    id: 'cinema',
    name: 'Cinema',
    type: 'cinema',
    x: curbLeft(200),
    y: 300,
    width: 200,
    height: 130,
    color: 0x3d3d5c,
    interactionRadius: 36,
    modalType: 'movie',
    contentKey: 'cinema',
  },
  {
    id: 'final',
    name: 'A Quiet Place',
    type: 'final',
    x: curbRight(180),
    y: 120,
    width: 180,
    height: 100,
    color: 0xe8a87c,
    interactionRadius: 36,
    modalType: 'ending',
    contentKey: 'ending',
  },
]
