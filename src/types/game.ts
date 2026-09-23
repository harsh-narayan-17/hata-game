/**
 * Shared game types for Hayati — A Little World
 */

export type LocationId =
  | 'bean-theory'
  | 'brown-rituals'
  | 'viviana'
  | 'hiranandani'
  | 'cinema'
  | 'concert'
  | 'final'

export type InteractableId =
  | LocationId
  | 'fridge-magnet'
  | 'matcha'
  | 'tres-leches'

export type ModalType =
  | 'cafe'
  | 'dialogue'
  | 'certificate'
  | 'movie'
  | 'concert'
  | 'collection'
  | 'collectible'
  | 'event'
  | 'bowling'
  | 'ending'
  | 'settings'
  | null

export interface GameState {
  visitedLocations: string[]
  collectedItems: string[]
  triggeredEvents: string[]
  completedBowling: boolean
  endingUnlocked: boolean
  muted: boolean
  hasEntered: boolean
  endingChoice: 'yes' | 'no' | null
}

export interface LocationDef {
  id: LocationId
  name: string
  type: 'cafe' | 'mall' | 'office' | 'cinema' | 'concert' | 'final'
  x: number
  y: number
  width: number
  height: number
  color: number
  labelColor?: string
  interactionRadius: number
  modalType: ModalType
  /** Data key for content lookup */
  contentKey: string
}

export interface CollectibleDef {
  id: string
  name: string
  description: string
  icon: string
  x: number
  y: number
}

export interface CafeMenuItem {
  name: string
  note?: string
}

export interface CafeContent {
  id: string
  name: string
  tagline?: string
  menu: CafeMenuItem[]
}

export interface DialogueContent {
  title: string
  lines: string[]
  continueLabel?: string
  /** After dialogue, optionally open bowling */
  followUp?: 'bowling'
}

export interface ActiveModal {
  type: ModalType
  payload?: Record<string, unknown>
}
