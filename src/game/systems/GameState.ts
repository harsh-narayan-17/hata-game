import type { GameState } from '../../types/game'
import { allMagnetsCollected } from '../../data/collectibles'

export const STORAGE_KEY = 'hayati-little-world-v1'

export const DEFAULT_GAME_STATE: GameState = {
  visitedLocations: [],
  collectedItems: [],
  triggeredEvents: [],
  completedBowling: false,
  endingUnlocked: false,
  muted: false,
  hasEntered: false,
  endingChoice: null,
}

export function loadGameState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_GAME_STATE }
    const parsed = JSON.parse(raw) as Partial<GameState>
    return {
      ...DEFAULT_GAME_STATE,
      ...parsed,
      visitedLocations: parsed.visitedLocations ?? [],
      collectedItems: parsed.collectedItems ?? [],
      triggeredEvents: parsed.triggeredEvents ?? [],
    }
  } catch {
    return { ...DEFAULT_GAME_STATE }
  }
}

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode
  }
}

export function resetGameState(): GameState {
  const next = { ...DEFAULT_GAME_STATE }
  saveGameState(next)
  return next
}

const MAJOR_LOCATIONS = [
  'bean-theory',
  'brown-rituals',
  'viviana',
  'hiranandani',
  'cinema',
  'concert',
] as const

export function checkEndingUnlock(state: GameState): boolean {
  const visited = new Set(state.visitedLocations)
  const majorVisited = MAJOR_LOCATIONS.filter((id) => visited.has(id)).length
  return majorVisited >= 5 && allMagnetsCollected(state.collectedItems)
}
