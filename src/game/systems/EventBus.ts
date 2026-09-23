/**
 * Tiny typed bus between Phaser and React.
 */

type Handler<T> = (payload: T) => void

class EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners = new Map<string, Set<Handler<any>>>()

  on<T>(event: string, handler: Handler<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(handler)
    return () => this.off(event, handler)
  }

  off<T>(event: string, handler: Handler<T>): void {
    this.listeners.get(event)?.delete(handler)
  }

  emit<T>(event: string, payload: T): void {
    this.listeners.get(event)?.forEach((h) => h(payload))
  }
}

export const gameBus = new EventBus()

export const GameEvents = {
  OPEN_MODAL: 'open-modal',
  CLOSE_MODAL: 'close-modal',
  SHOW_PROMPT: 'show-prompt',
  HIDE_PROMPT: 'hide-prompt',
  PAUSE: 'pause',
  RESUME: 'resume',
  STATE_CHANGED: 'state-changed',
  COLLECT: 'collect',
  TRIGGER_EVENT: 'trigger-event',
  BOWLING_DONE: 'bowling-done',
  ENDING_UNLOCKED: 'ending-unlocked',
  PLAY_SFX: 'play-sfx',
} as const
